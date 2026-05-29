import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { GameCanvas } from "./game/GameCanvas";
import { StartScreen } from "./game/StartScreen";
import { GameOverScreen } from "./game/GameOverScreen";
import { WinScreen } from "./game/WinScreen";
import { HowToPlay } from "./game/HowToPlay";
import { HUD } from "./game/HUD";
import { TouchControls } from "./game/TouchControls";
import type { GameStatus, TacticId, GameInputs, StakeholderId } from "./game/types";
import { TACTICS } from "./game/data";
import { useStartGameSession, useRecordWaveCheckpoint } from "@workspace/api-client-react";
import type { GameEvent } from "@workspace/api-client-react";

const HIGH_SCORE_KEY = "stakeholderInvaders.highScore";
const MUTE_KEY = "stakeholderInvaders.muted";

function App() {
  const [status, setStatus] = useState<GameStatus>("start");
  const [showHowTo, setShowHowTo] = useState(false);
  const [score, setScore] = useState(0);
  const [credibility, setCredibility] = useState(3);
  const [wave, setWave] = useState(1);
  const [tactic, setTactic] = useState<TacticId>(TACTICS[0].id);
  const [highScore, setHighScore] = useState<number>(() => {
    try { return parseInt(localStorage.getItem(HIGH_SCORE_KEY) || "0", 10) || 0; }
    catch { return 0; }
  });
  const [muted, setMuted] = useState<boolean>(() => {
    try { return localStorage.getItem(MUTE_KEY) === "1"; }
    catch { return false; }
  });
  const [finalScore, setFinalScore] = useState(0);
  const [advocates, setAdvocates] = useState(0);

  // Attestation state: token + checkpoint promise both start null and are
  // set once server round-trips complete. GameOverScreen disables Submit
  // until the checkpoint promise resolves.
  const gameTokenRef = useRef<string | null>(null);
  const [gameToken, setGameToken] = useState<string | null>(null);
  const [checkpointPromise, setCheckpointPromise] = useState<Promise<string> | null>(null);

  // Mirrors the wave state so callbacks always have the latest wave number
  // without stale-closure issues. Updated in lockstep with setWave.
  const waveRef = useRef(1);

  // Accumulates kill events for the current wave only. Flushed when the wave
  // ends (via checkpoint call), or on game-over/win.
  const waveEventsRef = useRef<GameEvent[]>([]);

  // Server-issued nonce for the NEXT checkpoint call. Set from session
  // creation response (wave-1 nonce) and updated after each checkpoint.
  // Must be rotated with each successful checkpoint to enforce sequential play.
  const gameNonceRef = useRef<string | null>(null);

  const startSession = useStartGameSession();
  const recordCheckpoint = useRecordWaveCheckpoint();

  const inputsRef = useRef<GameInputs>({
    left: false,
    right: false,
    fire: false,
  });

  // Keyboard input
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.code === "ArrowLeft" || e.code === "KeyA") inputsRef.current.left = true;
      if (e.code === "ArrowRight" || e.code === "KeyD") inputsRef.current.right = true;
      if (e.code === "Space") {
        e.preventDefault();
        inputsRef.current.fire = true;
      }
      if (e.code === "KeyM") setMuted((m) => !m);
      const num = parseInt(e.key, 10);
      if (!Number.isNaN(num) && num >= 1 && num <= TACTICS.length) {
        setTactic(TACTICS[num - 1].id);
      }
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft" || e.code === "KeyA") inputsRef.current.left = false;
      if (e.code === "ArrowRight" || e.code === "KeyD") inputsRef.current.right = false;
      if (e.code === "Space") inputsRef.current.fire = false;
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  useEffect(() => {
    try { localStorage.setItem(MUTE_KEY, muted ? "1" : "0"); } catch {}
  }, [muted]);

  const startGame = useCallback(() => {
    setScore(0);
    setAdvocates(0);
    setCredibility(3);
    waveRef.current = 1;
    setWave(1);
    setTactic(TACTICS[0].id);
    gameTokenRef.current = null;
    gameNonceRef.current = null;
    setGameToken(null);
    setCheckpointPromise(null);
    waveEventsRef.current = [];
    setStatus("playing");
    // Request a server-issued game session token and wave-1 nonce.
    startSession.mutate(undefined, {
      onSuccess: (data) => {
        gameTokenRef.current = data.token;
        gameNonceRef.current = data.nonce;
        setGameToken(data.token);
      },
    });
  }, [startSession]);

  const handleKill = useCallback(
    (stakeholder: StakeholderId, tactic: TacticId, waveNum: number) => {
      waveEventsRef.current.push({ type: "kill", stakeholder, tactic, wave: waveNum });
    },
    [],
  );

  /**
   * Called by GameCanvas when a wave is cleared (waves 1-5).
   * Submits this wave's events to the server for validation and gets a
   * checkpoint HMAC back. The promise is stored so GameOverScreen can wait
   * for it before enabling Submit.
   */
  const handleWaveClear = useCallback(
    (clearedWave: number) => {
      const token = gameTokenRef.current;
      const nonce = gameNonceRef.current;
      if (!token || !nonce) {
        // Token/nonce not yet issued (very fast clear on session delay): clear buffer and continue.
        waveEventsRef.current = [];
        return;
      }
      const events: GameEvent[] = [
        ...waveEventsRef.current,
        { type: "wave_clear", wave: clearedWave },
      ];
      waveEventsRef.current = [];
      const promise = new Promise<string>((resolve, reject) => {
        recordCheckpoint.mutate(
          { data: { token, nonce, events } },
          {
            onSuccess: (data) => {
              // Rotate to the next wave's nonce so the next checkpoint call
              // is gated on this server-issued value.
              if (data.nextNonce) {
                gameNonceRef.current = data.nextNonce;
              }
              resolve(data.checkpoint);
            },
            onError: (err) => reject(err),
          },
        );
      });
      setCheckpointPromise(promise);
    },
    [recordCheckpoint],
  );

  /**
   * Sends the terminal event batch (wave kills + game_over or win) to the
   * checkpoint endpoint and returns a promise that resolves to the checkpoint
   * string. Used by both handleGameOver and handleWin.
   */
  const submitTerminalCheckpoint = useCallback(
    (terminalEvent: GameEvent): Promise<string> => {
      const token = gameTokenRef.current;
      const nonce = gameNonceRef.current;
      if (!token || !nonce) {
        return Promise.reject(new Error("No session token or nonce"));
      }
      const events: GameEvent[] = [...waveEventsRef.current, terminalEvent];
      waveEventsRef.current = [];
      return new Promise<string>((resolve, reject) => {
        recordCheckpoint.mutate(
          { data: { token, nonce, events } },
          {
            // On terminal events the server returns no nextNonce (game over).
            onSuccess: (data) => resolve(data.checkpoint),
            onError: (err) => reject(err),
          },
        );
      });
    },
    [recordCheckpoint],
  );

  const handleGameOver = useCallback(
    (finalScoreValue: number, advocatesWon: number) => {
      // Use waveRef (mirrors wave state) so this is correct even when the
      // player dies on a new wave without having recorded any kills yet.
      const promise = submitTerminalCheckpoint({ type: "game_over", wave: waveRef.current });
      setCheckpointPromise(promise);
      setFinalScore(finalScoreValue);
      setAdvocates(advocatesWon);
      setStatus("gameover");
      setHighScore((prev) => {
        const next = Math.max(prev, finalScoreValue);
        try { localStorage.setItem(HIGH_SCORE_KEY, String(next)); } catch {}
        return next;
      });
    },
    [submitTerminalCheckpoint],
  );

  const handleWin = useCallback(
    (finalScoreValue: number, advocatesWon: number) => {
      const promise = submitTerminalCheckpoint({ type: "win" });
      setCheckpointPromise(promise);
      setFinalScore(finalScoreValue);
      setAdvocates(advocatesWon);
      setStatus("win");
      setHighScore((prev) => {
        const next = Math.max(prev, finalScoreValue);
        try { localStorage.setItem(HIGH_SCORE_KEY, String(next)); } catch {}
        return next;
      });
    },
    [submitTerminalCheckpoint],
  );

  const cycleTactic = useCallback(() => {
    setTactic((t) => {
      const idx = TACTICS.findIndex((x) => x.id === t);
      return TACTICS[(idx + 1) % TACTICS.length].id;
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-2 sm:p-6 pt-24 sm:pt-28"
      style={{ background: "radial-gradient(ellipse at top, #0B0A0E 0%, #08080A 70%)" }}>

      <nav
        className="fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-lg border-b shadow-lg"
        style={{
          background:
            "linear-gradient(to right, rgba(8,8,10,0.95) 0%, rgba(109,85,146,0.20) 50%, rgba(8,8,10,0.95) 100%)",
          borderColor: "rgba(109,85,146,0.30)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a
              href="/"
              className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
              data-testid="link-back-to-portfolio"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium font-sans">Back to Portfolio</span>
            </a>
            <div className="flex items-center font-sans">
              <span className="text-white font-bold text-xl">Alexis</span>
              <span className="text-purple-400 font-bold text-xl">Brochu</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative w-full max-w-[960px] aspect-[4/3] rounded-md overflow-hidden border border-white/10 shadow-2xl crt"
        style={{ boxShadow: "0 0 60px rgba(95,197,248,0.08), inset 0 0 80px rgba(0,0,0,0.6)" }}>

        <GameCanvas
          status={status}
          inputsRef={inputsRef}
          tactic={tactic}
          muted={muted}
          onScore={setScore}
          onAdvocates={setAdvocates}
          onCredibility={setCredibility}
          onWave={(w) => { waveRef.current = w; setWave(w); }}
          onGameOver={handleGameOver}
          onWin={handleWin}
          onKill={handleKill}
          onWaveClear={handleWaveClear}
        />

        {status === "playing" && (
          <HUD
            score={score}
            credibility={credibility}
            wave={wave}
            tactic={tactic}
            muted={muted}
            advocates={advocates}
            onToggleMute={() => setMuted((m) => !m)}
            onSelectTactic={setTactic}
          />
        )}

        {status === "start" && !showHowTo && (
          <StartScreen
            highScore={highScore}
            onStart={startGame}
            onHowTo={() => setShowHowTo(true)}
            muted={muted}
            onToggleMute={() => setMuted((m) => !m)}
          />
        )}

        {status === "start" && showHowTo && (
          <HowToPlay onClose={() => setShowHowTo(false)} />
        )}

        {status === "gameover" && (
          <GameOverScreen
            score={finalScore}
            advocates={advocates}
            highScore={highScore}
            gameToken={gameToken}
            checkpointPromise={checkpointPromise}
            onRestart={startGame}
            onMenu={() => setStatus("start")}
          />
        )}

        {status === "win" && (
          <WinScreen
            score={finalScore}
            advocates={advocates}
            highScore={highScore}
            onRestart={startGame}
            onMenu={() => setStatus("start")}
          />
        )}

        {status === "playing" && (
          <TouchControls
            inputsRef={inputsRef}
            onCycleTactic={cycleTactic}
          />
        )}
      </div>

      <p className="mt-4 text-xs text-white/40 font-sans text-center px-2">
        Built by Alexis Brochu {" "}
        <a
          href="https://alexisbrochu.com"
          className="text-cyan-300/80 hover:text-cyan-300 underline-offset-2 hover:underline"
        >
          alexisbrochu.com
        </a>
        . <span className="text-white/60">Convert skeptics. Don't destroy them.</span>
      </p>
    </div>
  );
}

export default App;
