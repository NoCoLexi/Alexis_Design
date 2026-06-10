import { Router, type IRouter } from "express";
import { randomUUID, randomBytes, createHmac, timingSafeEqual } from "crypto";
import { desc, eq, sql } from "drizzle-orm";
import rateLimit from "express-rate-limit";
import { db, scoresTable } from "@workspace/db";
import { PgRateLimitStore } from "../lib/pg-rate-limit-store";
import {
  RecordWaveCheckpointBody,
  SubmitScoreBody,
  GetTopScoresResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

// ---------------------------------------------------------------------------
// Server-side game knowledge — mirrors GameCanvas.tsx and data.ts exactly.
// These tables are the source of truth for event validation.
// ---------------------------------------------------------------------------

const GAME_MAX_WAVE = 6;

const VALID_STAKEHOLDERS = new Set([
  "skepticEng",
  "budget",
  "customer",
  "director",
  "process",
  "vp",
]);

const VALID_TACTICS = new Set(["demo", "pilot", "interview", "data", "quickwin"]);

const STAKEHOLDER_POINTS: Record<string, number> = {
  skepticEng: 100,
  budget: 150,
  customer: 120,
  director: 180,
  process: 130,
  vp: 400,
};

// Which tactics deal 1.5x damage against which stakeholders (from data.ts)
const STRONG_AGAINST: Record<string, string[]> = {
  demo: ["skepticEng", "director"],
  pilot: ["budget", "process"],
  interview: ["customer", "director"],
  data: ["budget", "vp"],
  quickwin: ["process", "skepticEng"],
};

// Exact enemy roster per wave, derived from buildWave() in GameCanvas.tsx.
const ENEMIES_PER_WAVE: Record<number, Record<string, number>> = {
  1: { director: 5, budget: 5, process: 5, customer: 5 },
  2: { director: 5, budget: 5, process: 5, customer: 5 },
  3: { vp: 1, director: 6, budget: 6, process: 6, customer: 6 },
  4: { director: 6, budget: 6, process: 6, customer: 6 },
  5: { director: 7, budget: 7, process: 7, customer: 7 },
  6: { vp: 1, director: 7, budget: 7, process: 7, customer: 7 },
};

// Physics-accurate ceilings as secondary defence-in-depth.
const MAX_SCORE_BY_WAVE: Record<number, number> = {
  1: 4_350,
  2: 8_950,
  3: 15_020,
  4: 20_490,
  5: 26_830,
  6: 35_020,
};

const MAX_ADVOCATES_BY_WAVE: Record<number, number> = {
  1: 20,
  2: 40,
  3: 65,
  4: 89,
  5: 117,
  6: 146,
};

// ---------------------------------------------------------------------------
// Server-side game session store
//
// Each session holds:
//  - signingKey: random bytes known only to the server, used to HMAC checkpoints
//  - accumulated game state (score, advocates, killCounts, currentWave)
//  - lastCheckpoint: the most recent HMAC the server produced for this session
//  - checkpointCount: number of checkpoint calls; included in the HMAC payload
//    so replaying an old checkpoint against a newer session state is caught
//  - terminated: true once a game_over or win event has been seen
//  - consumed: true once POST /scores has used the session
//
// POST /scores/checkpoint validates each wave's events incrementally during
// gameplay and returns an HMAC checkpoint. The client cannot produce a valid
// checkpoint without making a real round-trip to the server.
//
// POST /scores verifies that the supplied checkpoint matches the server's own
// most-recent HMAC for the session, then derives score/advocates/wave from its
// own stored state.
//
// Pruning happens lazily on each new session issuance.
// ---------------------------------------------------------------------------

const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes

/**
 * Hard cap on the number of live sessions this instance will retain.
 * After eager pruning, if the store is still at or above this limit the
 * session-creation endpoint returns 503 rather than growing without bound.
 * The per-IP rate limiter (10 req/min) is a per-instance soft control;
 * this cap is the absolute ceiling that applies regardless of source IP
 * distribution across instances.
 */
const MAX_SESSION_STORE_SIZE = 500;

interface SessionState {
  signingKey: Buffer;
  currentWave: number;
  score: number;
  advocates: number;
  killCounts: Record<number, Record<string, number>>;
  lastCheckpoint: string | null;
  checkpointCount: number;
  terminated: boolean;
  consumed: boolean;
  issuedAt: number;
  expiresAt: number;
  /** Timestamp of the last successful checkpoint call (ms). Used to enforce minimum per-wave elapsed time. */
  lastCheckpointAt: number;
  /**
   * Server-issued challenge nonce for the NEXT checkpoint call.
   * The client must present this nonce in the next POST /scores/checkpoint request.
   * After each successful checkpoint the server rotates to a new random nonce.
   * Because the nonce is only issued after the previous wave is validated,
   * waves cannot be batched or parallelised — each requires a real sequential
   * round-trip in the correct order.
   */
  currentNonce: string;
}

const sessionStore = new Map<string, SessionState>();

function pruneSessionStore() {
  const now = Date.now();
  for (const [token, s] of sessionStore) {
    if (s.consumed || s.expiresAt <= now) {
      sessionStore.delete(token);
    }
  }
}

/**
 * Returns a new session token, or null if the store is at capacity.
 * Pruning runs first so that expired/consumed sessions free up slots
 * before the cap is evaluated.
 */
function createSession(): string | null {
  pruneSessionStore();
  if (sessionStore.size >= MAX_SESSION_STORE_SIZE) {
    return null;
  }
  const token = randomUUID();
  const killCounts: Record<number, Record<string, number>> = {};
  for (let w = 1; w <= GAME_MAX_WAVE; w++) {
    killCounts[w] = {};
  }
  const now = Date.now();
  sessionStore.set(token, {
    signingKey: randomBytes(32),
    currentWave: 1,
    score: 0,
    advocates: 0,
    killCounts,
    lastCheckpoint: null,
    checkpointCount: 0,
    terminated: false,
    consumed: false,
    issuedAt: now,
    expiresAt: now + SESSION_TTL_MS,
    lastCheckpointAt: now,
    currentNonce: randomUUID(),
  });
  return token;
}

function getActiveSession(token: string): SessionState | null {
  const s = sessionStore.get(token);
  if (!s) return null;
  if (s.consumed) return null;
  if (Date.now() > s.expiresAt) {
    sessionStore.delete(token);
    return null;
  }
  return s;
}

// ---------------------------------------------------------------------------
// HMAC checkpoint generation
//
// checkpoint = HMAC-SHA256(signingKey,
//   `<token>:<checkpointCount>:<score>:<advocates>:<wave>:<terminated>`)
//
// The signingKey is a 32-byte random secret generated on session creation and
// never transmitted to the client. Any checkpoint returned to the client can
// only have been produced by this server, which means presenting a valid
// checkpoint proves that the client made at least one real round-trip call to
// POST /scores/checkpoint during gameplay.
// ---------------------------------------------------------------------------

function makeCheckpoint(token: string, s: SessionState): string {
  const payload = [
    token,
    s.checkpointCount,
    s.score,
    s.advocates,
    s.currentWave,
    s.terminated ? "1" : "0",
  ].join(":");
  return createHmac("sha256", s.signingKey).update(payload).digest("hex");
}

function verifyCheckpoint(token: string, s: SessionState, candidate: string): boolean {
  const expected = makeCheckpoint(token, s);
  try {
    return timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(candidate, "hex"));
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Event validation
// ---------------------------------------------------------------------------

class EventValidationError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "EventValidationError";
  }
}

interface GameEvent {
  type: string;
  stakeholder?: string;
  tactic?: string;
  wave?: number;
}

// Minimum milliseconds per kill (shot cooldown floor from GameCanvas: 320ms).
// Used to derive a minimum elapsed-time floor per checkpoint call so that
// a full wave's events cannot be submitted faster than physics allows.
const MIN_MS_PER_KILL = 300;

// Minimum elapsed time for a checkpoint with no kills (e.g. player dies
// immediately on wave start with nothing already in the wave buffer).
const MIN_MS_NO_KILLS = 1_000;

/**
 * Validates a slice of events against a COPY of the session state and, only
 * on full success, commits the changes back to the live session.
 *
 * Working on a copy ensures that a rejected checkpoint call leaves the
 * session state completely unchanged — no partial mutations accumulate.
 *
 * The minimum-elapsed-time check uses the server's own clock: the server
 * tracks when each checkpoint was issued and requires at least
 * (killCount × MIN_MS_PER_KILL) ms to have elapsed since the previous one.
 * This makes it significantly harder to fabricate a high-score run by
 * scripting many checkpoint calls in rapid succession.
 */
function applyEventsAtomic(events: GameEvent[], session: SessionState): void {
  if (session.terminated) {
    throw new EventValidationError("Session already terminated");
  }

  // ---- Work on a deep copy of mutable session fields ----
  const kc: Record<number, Record<string, number>> = {};
  for (const [w, counts] of Object.entries(session.killCounts)) {
    kc[Number(w)] = { ...counts };
  }
  let score = session.score;
  let advocates = session.advocates;
  let currentWave = session.currentWave;
  let terminated = false;
  let seenTerminal = false;
  let killsInBatch = 0;

  for (const event of events) {
    if (seenTerminal) {
      throw new EventValidationError("Events submitted after terminal event");
    }

    if (event.type === "kill") {
      const { stakeholder, tactic, wave } = event;
      if (!stakeholder || !tactic || !wave) {
        throw new EventValidationError("Kill event missing required fields");
      }
      if (!VALID_STAKEHOLDERS.has(stakeholder)) {
        throw new EventValidationError(`Unknown stakeholder: ${stakeholder}`);
      }
      if (!VALID_TACTICS.has(tactic)) {
        throw new EventValidationError(`Unknown tactic: ${tactic}`);
      }
      if (wave !== currentWave) {
        throw new EventValidationError(
          `Kill event wave ${wave} does not match session wave ${currentWave}`,
        );
      }

      const rosterCount = ENEMIES_PER_WAVE[wave]?.[stakeholder] ?? 0;
      kc[wave][stakeholder] = (kc[wave][stakeholder] ?? 0) + 1;
      if (kc[wave][stakeholder] > rosterCount) {
        throw new EventValidationError(
          `Kill count for ${stakeholder} in wave ${wave} exceeds roster (max ${rosterCount})`,
        );
      }

      const basePoints = STAKEHOLDER_POINTS[stakeholder];
      const isStrong = STRONG_AGAINST[tactic]?.includes(stakeholder) ?? false;
      score += isStrong ? Math.round(basePoints * 1.5) : basePoints;
      advocates += 1;
      killsInBatch += 1;

    } else if (event.type === "wave_clear") {
      const { wave } = event;
      if (!wave) {
        throw new EventValidationError("wave_clear event missing wave field");
      }
      if (wave !== currentWave) {
        throw new EventValidationError(
          `wave_clear wave ${wave} does not match session wave ${currentWave}`,
        );
      }
      if (currentWave === GAME_MAX_WAVE) {
        throw new EventValidationError(
          "Use 'win' event for the final wave, not wave_clear",
        );
      }

      const roster = ENEMIES_PER_WAVE[currentWave];
      for (const [type, count] of Object.entries(roster)) {
        if ((kc[currentWave][type] ?? 0) !== count) {
          throw new EventValidationError(
            `wave_clear for wave ${currentWave} before all ${type} enemies killed`,
          );
        }
      }

      score += 250;
      currentWave += 1;
      // wave_clear is a batch-terminal: reject any events that follow it in
      // this call. Each wave must be submitted in a separate checkpoint call,
      // gated by the server-issued nonce for that wave. This prevents the
      // attacker from batching multiple waves into a single request.
      seenTerminal = true;

    } else if (event.type === "win") {
      if (currentWave !== GAME_MAX_WAVE) {
        throw new EventValidationError(
          `win event on wave ${currentWave}, expected wave ${GAME_MAX_WAVE}`,
        );
      }

      const roster = ENEMIES_PER_WAVE[GAME_MAX_WAVE];
      for (const [type, count] of Object.entries(roster)) {
        if ((kc[GAME_MAX_WAVE][type] ?? 0) !== count) {
          throw new EventValidationError(
            `win before all wave-${GAME_MAX_WAVE} ${type} enemies killed`,
          );
        }
      }

      score += 1250; // wave-6 clear + coalition bonus
      terminated = true;
      seenTerminal = true;

    } else if (event.type === "game_over") {
      const { wave } = event;
      if (!wave) {
        throw new EventValidationError("game_over event missing wave field");
      }
      if (wave !== currentWave) {
        throw new EventValidationError(
          `game_over wave ${wave} does not match session wave ${currentWave}`,
        );
      }
      terminated = true;
      seenTerminal = true;

    } else {
      throw new EventValidationError(`Unknown event type: ${event.type}`);
    }
  }

  // ---- Timing floor: server-clock elapsed time since last checkpoint ----
  // Each kill requires at least MIN_MS_PER_KILL ms of real time to execute
  // (shot-cooldown lower bound). Submitting a full wave's kills faster than
  // physics allows is a strong signal of scripted forgery.
  const minRequired =
    killsInBatch > 0
      ? killsInBatch * MIN_MS_PER_KILL
      : MIN_MS_NO_KILLS;
  const elapsed = Date.now() - session.lastCheckpointAt;
  if (elapsed < minRequired) {
    throw new EventValidationError(
      `Checkpoint submitted too quickly (${elapsed}ms elapsed, minimum ${minRequired}ms required for ${killsInBatch} kills)`,
    );
  }

  // ---- Secondary physics ceiling check (defence in depth) ----
  const ceilingWave = Math.max(1, Math.min(terminated ? currentWave : currentWave - 1, GAME_MAX_WAVE));
  if (
    score > MAX_SCORE_BY_WAVE[ceilingWave] ||
    advocates > MAX_ADVOCATES_BY_WAVE[ceilingWave]
  ) {
    throw new EventValidationError(
      "Computed score exceeds physics-accurate maximum for this stage",
    );
  }

  // ---- All checks passed: commit to the live session ----
  session.killCounts = kc;
  session.score = score;
  session.advocates = advocates;
  session.currentWave = currentWave;
  session.terminated = terminated;
}

// ---------------------------------------------------------------------------
// Rate limiters
// ---------------------------------------------------------------------------

const sessionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  store: new PgRateLimitStore("scores-session"),
  message: { error: "Too many session requests, please slow down." },
});

const checkpointLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  store: new PgRateLimitStore("scores-checkpoint"),
  message: { error: "Too many checkpoint requests, please slow down." },
});

const submitLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  store: new PgRateLimitStore("scores-submit"),
  message: { error: "Too many score submissions, please slow down." },
});

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

router.get("/scores/top", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(scoresTable)
    .orderBy(desc(scoresTable.score), desc(scoresTable.createdAt))
    .limit(10);
  res.json(GetTopScoresResponse.parse(rows));
});

router.post("/scores/session", sessionLimiter, (req, res): void => {
  const token = createSession();
  if (token === null) {
    req.log.warn("Session store at capacity, rejecting new session request");
    res.status(503).json({ error: "Service temporarily unavailable, please try again later." });
    return;
  }
  const session = sessionStore.get(token)!;
  res.status(201).json({ token, nonce: session.currentNonce });
});

/**
 * POST /scores/checkpoint
 *
 * The client calls this once per wave (or once on game-over mid-wave). It
 * submits the gameplay events for that wave segment. The server validates
 * them against its own tracked session state, updates the state, and returns
 * an HMAC checkpoint signed with the per-session secret key.
 *
 * The checkpoint is the only proof the client can present to POST /scores.
 * Because the secret key never leaves the server, a valid checkpoint can only
 * be obtained by making this round-trip with events the server accepted.
 */
router.post(
  "/scores/checkpoint",
  checkpointLimiter,
  (req, res): void => {
    const parsed = RecordWaveCheckpointBody.safeParse(req.body);
    if (!parsed.success) {
      req.log.warn({ errors: parsed.error.message }, "Invalid checkpoint request");
      res.status(400).json({ error: "Invalid checkpoint request" });
      return;
    }

    const { token, nonce, events } = parsed.data;

    const session = getActiveSession(token);
    if (!session) {
      req.log.warn({ token: token.slice(0, 8) }, "Invalid or expired game session");
      res.status(400).json({ error: "Invalid or expired game session" });
      return;
    }

    // Verify the nonce matches the one issued for the current wave.
    // The nonce is only known after the previous checkpoint round-trip, so a
    // client cannot submit multiple waves in parallel or out of order.
    if (nonce !== session.currentNonce) {
      req.log.warn({ token: token.slice(0, 8) }, "Checkpoint nonce mismatch");
      res.status(400).json({ error: "Invalid checkpoint nonce — ensure checkpoints are submitted in order" });
      return;
    }

    try {
      applyEventsAtomic(events as GameEvent[], session);
    } catch (err) {
      req.log.warn(
        { reason: (err as Error).message, token: token.slice(0, 8) },
        "Checkpoint event validation failed",
      );
      res.status(400).json({ error: "Invalid events: " + (err as Error).message });
      return;
    }

    session.checkpointCount += 1;
    session.lastCheckpointAt = Date.now();
    const checkpoint = makeCheckpoint(token, session);
    session.lastCheckpoint = checkpoint;

    // Rotate to a fresh nonce for the next wave. Only include nextNonce in the
    // response if the game is still running — after termination there is no
    // next wave, so the client submits the final score with no further nonce.
    const nextNonce = session.terminated ? undefined : randomUUID();
    if (nextNonce) {
      session.currentNonce = nextNonce;
    }

    res.json({ checkpoint, ...(nextNonce ? { nextNonce } : {}) });
  },
);

/**
 * POST /scores
 *
 * The client presents the handle, session token, and the most recent
 * checkpoint from POST /scores/checkpoint. The server:
 *   1. Looks up the session and verifies it has not been consumed.
 *   2. Verifies the checkpoint using timingSafeEqual against the HMAC it
 *      computed itself — no client-supplied value can match without the
 *      server-only signing key.
 *   3. Checks the session is in a terminated state (game must have ended).
 *   4. Records the score using values derived entirely from the server's own
 *      session state — no client-submitted score is accepted.
 */
router.post("/scores", submitLimiter, async (req, res): Promise<void> => {
  const parsed = SubmitScoreBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid score submission");
    res.status(400).json({ error: "Invalid score submission" });
    return;
  }

  const { handle, token, checkpoint } = parsed.data;

  const session = getActiveSession(token);
  if (!session) {
    req.log.warn({ token: token.slice(0, 8) }, "Invalid or expired game session");
    res.status(400).json({ error: "Invalid or expired game session" });
    return;
  }

  // The session must have been through at least one checkpoint round-trip.
  if (!session.lastCheckpoint) {
    req.log.warn({ token: token.slice(0, 8) }, "No checkpoint on file for session");
    res.status(400).json({ error: "No checkpoint on file — play through at least one wave first" });
    return;
  }

  // Verify the checkpoint using constant-time comparison.
  // Only the server can produce a valid HMAC for this session's signing key.
  if (!verifyCheckpoint(token, session, checkpoint)) {
    req.log.warn({ token: token.slice(0, 8) }, "Checkpoint verification failed");
    res.status(400).json({ error: "Checkpoint verification failed" });
    return;
  }

  // The game must have ended (game_over or win event seen).
  if (!session.terminated) {
    req.log.warn({ token: token.slice(0, 8) }, "Score submitted before game ended");
    res.status(400).json({ error: "Score submitted before game ended" });
    return;
  }

  const cleanHandle = handle
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 3);
  if (cleanHandle.length === 0) {
    res.status(400).json({ error: "Handle must contain letters or digits" });
    return;
  }

  // Score, advocates, and wave come entirely from the server's own session
  // state, not from anything the client submitted.

  // Reject zero-point games unconditionally — they can never appear on the
  // leaderboard and would only accumulate junk rows.
  if (session.score === 0) {
    req.log.info({ token: token.slice(0, 8) }, "Score submission rejected: zero score");
    res.status(400).json({ error: "Score must be greater than zero to qualify" });
    return;
  }

  // Mark consumed before the DB write to prevent concurrent double-submission
  // for the same session. The session is already validated above.
  session.consumed = true;

  // Atomically insert the new score and trim the table to the top 10.
  // This single transaction prevents the TOCTOU race that would arise from a
  // separate SELECT-then-INSERT in application code: concurrent submissions
  // could both read the same pre-insert leaderboard state, both qualify, and
  // both persist rows, allowing unbounded table growth under parallelism.
  //
  // Instead:
  //   1. Insert the candidate row unconditionally.
  //   2. Delete every row that does not rank in the top 10 (score DESC,
  //      created_at DESC). This includes the just-inserted row if it did not
  //      make the cut.
  //   3. Check whether the inserted row survived. If it was pruned, the score
  //      did not qualify and we return 400.
  //
  // Acquire an exclusive table lock before inserting so the insert+trim is
  // linearized across concurrent writers. Without this, two transactions
  // running under the default READ COMMITTED isolation could each compute
  // the trim against a view that excludes the other's uncommitted insert,
  // preserve their own row, and allow the table to grow beyond the cap.
  //
  // LOCK TABLE ... IN EXCLUSIVE MODE blocks any concurrent transaction that
  // reaches the same lock until the current one commits or rolls back.
  // The lock is automatically released at transaction end — no explicit
  // unlock or retry logic is required.
  const qualifyingRow = await db.transaction(async (tx) => {
    await tx.execute(sql`LOCK TABLE scores IN EXCLUSIVE MODE`);

    const [inserted] = await tx
      .insert(scoresTable)
      .values({
        handle: cleanHandle,
        score: session.score,
        advocates: session.advocates,
        wave: session.currentWave,
      })
      .returning();

    // Trim to top 10: delete any row (including the newly inserted one) that
    // does not rank in the top 10 by score DESC, created_at DESC.
    await tx.execute(
      sql`DELETE FROM scores WHERE id NOT IN (
        SELECT id FROM scores ORDER BY score DESC, created_at DESC LIMIT 10
      )`,
    );

    // Return the inserted row only if it survived the trim.
    const [survived] = await tx
      .select()
      .from(scoresTable)
      .where(eq(scoresTable.id, inserted.id));
    return survived ?? null;
  });

  if (!qualifyingRow) {
    req.log.info(
      { token: token.slice(0, 8), score: session.score },
      "Score submission rejected: does not qualify for top 10",
    );
    res.status(400).json({ error: "Score does not qualify for the top 10 leaderboard" });
    return;
  }

  res.status(201).json(qualifyingRow);
});

export default router;
