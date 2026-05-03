interface Props {
  score: number;
  advocates: number;
  highScore: number;
  onRestart: () => void;
  onMenu: () => void;
}

export function WinScreen({ score, advocates, highScore, onRestart, onMenu }: Props) {
  const newRecord = score >= highScore && score > 0;
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "radial-gradient(ellipse at center, rgba(243,232,185,0.18) 0%, rgba(8,8,10,0.96) 70%)" }}>
      <div className="font-arcade text-xs sm:text-sm text-cyan-300 mb-2 flicker">CHANGE ADOPTED</div>
      <h2 className="font-arcade text-2xl sm:text-4xl text-[#F3E8B9] tracking-widest"
        style={{ textShadow: "0 0 16px rgba(243,232,185,0.5)" }}>
        COALITION BUILT
      </h2>
      <p className="mt-3 max-w-md text-xs sm:text-sm text-white/75 font-sans leading-relaxed">
        Every skeptic converted. The org tipped. You shipped the change —
        and the change <span className="text-[#F3E8B9]">stuck</span>.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-left">
        <div className="font-arcade text-[10px] text-white/60">FINAL SCORE</div>
        <div className="font-arcade text-base text-[#F3E8B9]">{score.toString().padStart(6, "0")}</div>
        <div className="font-arcade text-[10px] text-white/60">ADVOCATES</div>
        <div className="font-arcade text-base text-cyan-300">×{advocates}</div>
        <div className="font-arcade text-[10px] text-white/60">HIGH SCORE</div>
        <div className="font-arcade text-base text-white">{highScore.toString().padStart(6, "0")}</div>
      </div>

      {newRecord && (
        <div className="mt-3 font-arcade text-[10px] text-[#F3E8B9] blink">NEW RECORD</div>
      )}

      <div className="mt-6 flex gap-3">
        <button onClick={onRestart}
          className="font-arcade text-xs sm:text-sm px-5 py-2 text-[#08080A]"
          style={{ background: "#F3E8B9", boxShadow: "0 0 16px rgba(243,232,185,0.5)" }}>
          ▶ NEW INITIATIVE
        </button>
        <button onClick={onMenu}
          className="font-arcade text-[10px] sm:text-xs px-4 py-2 text-cyan-300 border-2 border-cyan-300/60">
          MENU
        </button>
      </div>
    </div>
  );
}
