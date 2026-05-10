import { useEffect, useRef, useState, useCallback } from "react";
import { GameCanvas } from "./game/GameCanvas";
import { StartScreen } from "./game/StartScreen";
import { GameOverScreen } from "./game/GameOverScreen";
import { WinScreen } from "./game/WinScreen";
import { HowToPlay } from "./game/HowToPlay";
import { HUD } from "./game/HUD";
import { TouchControls } from "./game/TouchControls";
import type { GameStatus, TacticId, GameInputs } from "./game/types";
import { TACTICS } from "./game/data";

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
    setWave(1);
    setTactic(TACTICS[0].id);
    setStatus("playing");
  }, []);

  const handleGameOver = useCallback((finalScoreValue: number, advocatesWon: number) => {
    setFinalScore(finalScoreValue);
    setAdvocates(advocatesWon);
    setStatus("gameover");
    setHighScore((prev) => {
      const next = Math.max(prev, finalScoreValue);
      try { localStorage.setItem(HIGH_SCORE_KEY, String(next)); } catch {}
      return next;
    });
  }, []);

  const handleWin = useCallback((finalScoreValue: number, advocatesWon: number) => {
    setFinalScore(finalScoreValue);
    setAdvocates(advocatesWon);
    setStatus("win");
    setHighScore((prev) => {
      const next = Math.max(prev, finalScoreValue);
      try { localStorage.setItem(HIGH_SCORE_KEY, String(next)); } catch {}
      return next;
    });
  }, []);

  const cycleTactic = useCallback(() => {
    setTactic((t) => {
      const idx = TACTICS.findIndex((x) => x.id === t);
      return TACTICS[(idx + 1) % TACTICS.length].id;
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-2 sm:p-6"
      style={{ background: "radial-gradient(ellipse at top, #0B0A0E 0%, #08080A 70%)" }}>

      <a
        href="/"
        className="fixed top-3 left-3 sm:top-4 sm:left-4 z-50 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-cyan-300/30 bg-black/60 backdrop-blur text-cyan-200 hover:text-white hover:border-cyan-200/70 hover:bg-cyan-400/10 transition-colors text-xs sm:text-sm font-sans"
        data-testid="link-back-to-portfolio"
        aria-label="Back to portfolio"
      >
        <span aria-hidden="true">←</span>
        <span>Back to portfolio</span>
      </a>

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
          onWave={setWave}
          onGameOver={handleGameOver}
          onWin={handleWin}
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
            wave={wave}
            highScore={highScore}
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
