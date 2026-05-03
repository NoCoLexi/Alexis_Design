import type { TacticId } from "./types";
import { TACTICS } from "./data";

interface Props {
  score: number;
  credibility: number;
  wave: number;
  tactic: TacticId;
  muted: boolean;
  advocates: number;
  onToggleMute: () => void;
  onSelectTactic: (t: TacticId) => void;
}

export function HUD({ score, credibility, wave, tactic, muted, advocates, onToggleMute, onSelectTactic }: Props) {
  return (
    <>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 px-3 py-2 flex items-start justify-between text-white pointer-events-none">
        <div className="flex flex-col gap-1">
          <div className="font-arcade text-[10px] sm:text-xs text-cyan-300/90">ADVOCATES WON</div>
          <div className="font-arcade text-base sm:text-xl text-white">{score.toString().padStart(6, "0")}</div>
          <div className="font-arcade text-[8px] sm:text-[10px] text-white/50">×{advocates}</div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="font-arcade text-[10px] sm:text-xs text-[#F3E8B9]">WAVE {wave}</div>
          <div className="flex gap-1" aria-label="credibility">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="w-3 h-3 sm:w-4 sm:h-4 inline-block"
                style={{
                  background: i < credibility ? "#5fc5f8" : "transparent",
                  border: "2px solid #5fc5f8",
                  boxShadow: i < credibility ? "0 0 6px #5fc5f8" : "none",
                }}
              />
            ))}
          </div>
          <div className="font-arcade text-[8px] sm:text-[10px] text-white/50">CREDIBILITY</div>
        </div>

        <div className="flex flex-col items-end gap-1 pointer-events-auto">
          <button
            onClick={onToggleMute}
            className="font-arcade text-[9px] sm:text-[10px] text-white/80 border border-white/30 px-2 py-1 hover:text-white hover:border-white/60"
            aria-label="toggle audio"
          >
            {muted ? "SND OFF" : "SND ON"}
          </button>
          <span className="font-arcade text-[7px] sm:text-[8px] text-white/40">M</span>
        </div>
      </div>

      {/* Bottom tactic picker */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-2 pb-2 pointer-events-none">
        <div className="flex justify-center gap-1 sm:gap-2 pointer-events-auto">
          {TACTICS.map((t) => {
            const active = t.id === tactic;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTactic(t.id)}
                className="font-arcade text-[8px] sm:text-[10px] px-2 py-1 sm:px-3 sm:py-2 transition"
                style={{
                  color: active ? "#08080A" : t.color,
                  background: active ? t.color : "rgba(8,8,10,0.6)",
                  border: `2px solid ${t.color}`,
                  boxShadow: active ? `0 0 12px ${t.color}80` : "none",
                }}
                aria-label={`select ${t.label}`}
              >
                <span className="opacity-50 mr-1">{t.hotkey}</span>
                {t.short}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
