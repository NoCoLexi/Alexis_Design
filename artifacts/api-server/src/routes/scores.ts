import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import rateLimit from "express-rate-limit";
import { db, scoresTable } from "@workspace/db";
import { SubmitScoreBody, GetTopScoresResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const MAX_SCORE = 1_000_000;
const MAX_ADVOCATES = 1_000;
const MAX_WAVE = 6;

const submitLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many score submissions, please slow down." },
});

router.get("/scores/top", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(scoresTable)
    .orderBy(desc(scoresTable.score), desc(scoresTable.createdAt))
    .limit(10);
  res.json(GetTopScoresResponse.parse(rows));
});

router.post("/scores", submitLimiter, async (req, res): Promise<void> => {
  const parsed = SubmitScoreBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid score submission");
    res.status(400).json({ error: "Invalid score submission" });
    return;
  }

  const { handle, score, advocates, wave } = parsed.data;

  if (
    score > MAX_SCORE ||
    advocates > MAX_ADVOCATES ||
    wave > MAX_WAVE ||
    !Number.isInteger(score) ||
    !Number.isInteger(advocates) ||
    !Number.isInteger(wave)
  ) {
    res.status(400).json({ error: "Score values out of range" });
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

  const [row] = await db
    .insert(scoresTable)
    .values({
      handle: cleanHandle,
      score,
      advocates,
      wave,
    })
    .returning();

  res.status(201).json(row);
});

export default router;
