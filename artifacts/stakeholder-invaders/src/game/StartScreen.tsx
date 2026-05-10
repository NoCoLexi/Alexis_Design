import { Leaderboard } from "./Leaderboard";

interface Props {
  highScore: number;
  onStart: () => void;
  onHowTo: () => void;
  muted: boolean;
  onToggleMute: () => void;
}

export function StartScreen({ highScore, onStart, onHowTo, muted, onToggleMute }: Props) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-start overflow-y-auto px-6 py-6 text-center"
      style={{ background: "radial-gradient(ellipse at center, rgba(0,129,188,0.18) 0%, rgba(8,8,10,0.94) 70%)" }}>
      <div className="font-arcade text-[10px] sm:text-xs text-cyan-300 mb-3 flicker">A CHANGE-MANAGEMENT ARCADE</div>
      <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#F3E8B9] leading-tight tracking-wide uppercase"
        style={{ textShadow: "0 0 18px rgba(243,232,185,0.45), 0 0 6px rgba(95,197,248,0.5)" }}>
        STAKEHOLDER<br />INVADERS
      </h1>
      <p className="mt-4 max-w-md text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
        Skeptics descend. You are the change agent. Your tactics don't destroy them
        they <span className="text-[#F3E8B9]">convert them into advocates</span>.
      </p>

      <div className="mt-6 font-arcade text-[10px] sm:text-xs text-white/50">
        HIGH SCORE <span className="text-cyan-300 ml-2">{highScore.toString().padStart(6, "0")}</span>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center">
        <button
          onClick={onStart}
          className="font-arcade text-xs sm:text-sm px-6 py-3 text-[#08080A] border-2"
          style={{
            background: "#5fc5f8",
            borderColor: "#5fc5f8",
            boxShadow: "0 0 18px rgba(95,197,248,0.5)",
          }}
        >
          ▶ PRESS START
        </button>
        <button
          onClick={onHowTo}
          className="font-arcade text-[10px] sm:text-xs px-4 py-2 text-cyan-300 border-2 border-cyan-300/60 hover:border-cyan-300"
        >
          HOW TO PLAY
        </button>
        <button
          onClick={onToggleMute}
          className="font-arcade text-[10px] sm:text-xs px-4 py-2 text-white/70 border-2 border-white/30 hover:border-white/60"
        >
          {muted ? "SND OFF" : "SND ON"}
        </button>
      </div>

      <Leaderboard />

      <div className="mt-6 font-arcade text-[8px] sm:text-[9px] text-white/40 tracking-widest blink">
        INSERT COURAGE TO CONTINUE
      </div>
    </div>
  );
}
