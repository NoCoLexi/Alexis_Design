import { TACTICS, STAKEHOLDERS } from "./data";

interface Props {
  onClose: () => void;
}

export function HowToPlay({ onClose }: Props) {
  return (
    <div className="absolute inset-0 z-20 overflow-y-auto"
      style={{ background: "rgba(8,8,10,0.96)" }}>
      <div className="max-w-2xl mx-auto px-5 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-arcade text-sm sm:text-base text-[#F3E8B9]">HOW TO PLAY</h2>
          <button onClick={onClose}
            className="font-arcade text-[10px] px-3 py-1 border-2 border-cyan-300/60 text-cyan-300 hover:border-cyan-300">
            ◀ BACK
          </button>
        </div>

        <p className="text-xs sm:text-sm text-white/75 font-sans leading-relaxed">
          You are a product manager in the middle of a change initiative. Skeptical
          stakeholders are descending. Your shots are <em>tactics</em>, not weapons —
          when an enemy's resistance breaks, they <span className="text-[#F3E8B9]">convert into an advocate</span>{" "}
          and you bank the points. Inspired by ADKAR & Kotter: awareness first, conversion follows.
        </p>

        <div className="mt-5">
          <div className="font-arcade text-[10px] text-cyan-300 mb-2">CONTROLS</div>
          <ul className="text-xs sm:text-sm text-white/70 font-sans space-y-1">
            <li><span className="font-arcade text-[10px] text-white">← →</span> or <span className="font-arcade text-[10px] text-white">A D</span> — move</li>
            <li><span className="font-arcade text-[10px] text-white">SPACE</span> — fire current tactic</li>
            <li><span className="font-arcade text-[10px] text-white">1–5</span> — switch tactic</li>
            <li><span className="font-arcade text-[10px] text-white">M</span> — mute</li>
            <li className="text-white/50">Mobile: tap arrows + FIRE; tap the tactic icon to cycle.</li>
          </ul>
        </div>

        <div className="mt-5">
          <div className="font-arcade text-[10px] text-cyan-300 mb-2">YOUR TACTICS</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {TACTICS.map((t) => (
              <div key={t.id} className="border border-white/10 p-2"
                style={{ background: "rgba(11,10,14,0.7)" }}>
                <div className="flex items-center gap-2">
                  <span className="font-arcade text-[10px] px-2 py-1"
                    style={{ background: t.color, color: "#08080A" }}>{t.short}</span>
                  <span className="font-sans text-xs text-white">{t.label}</span>
                </div>
                <div className="mt-1 text-[11px] text-white/60 font-sans">{t.blurb}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="font-arcade text-[10px] text-cyan-300 mb-2">THE STAKEHOLDERS</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {Object.values(STAKEHOLDERS).map((s) => (
              <div key={s.id} className="border border-white/10 p-2"
                style={{ background: "rgba(11,10,14,0.7)" }}>
                <div className="flex items-center gap-2">
                  <span className="font-arcade text-[10px] px-2 py-1"
                    style={{ background: s.color, color: "#08080A" }}>{s.short}</span>
                  <span className="font-sans text-xs text-white">{s.label}</span>
                  <span className="ml-auto font-arcade text-[9px] text-white/50">{s.points}pt</span>
                </div>
                <div className="mt-1 text-[11px] text-white/60 font-sans italic">{s.blurb}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 border-l-2 border-[#F3E8B9] pl-3 text-xs text-white/65 font-sans">
          <span className="text-[#F3E8B9]">Tip:</span> Match the right tactic to the right stakeholder
          for a <span className="text-cyan-300">RESONATES!</span> bonus and 1.5× points. Wrong tactics still chip away — just slower.
        </div>

        <div className="mt-5 text-center">
          <button onClick={onClose}
            className="font-arcade text-xs px-5 py-2 text-[#08080A]"
            style={{ background: "#5fc5f8" }}>
            I'M READY
          </button>
        </div>
      </div>
    </div>
  );
}
