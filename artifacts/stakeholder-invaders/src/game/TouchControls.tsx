import { type RefObject } from "react";
import type { GameInputs } from "./types";

interface Props {
  inputsRef: RefObject<GameInputs>;
  onCycleTactic: () => void;
}

export function TouchControls({ inputsRef, onCycleTactic }: Props) {
  // Detect touch capability — only render on touch devices
  const hasTouch = typeof window !== "undefined" && ("ontouchstart" in window || (navigator.maxTouchPoints ?? 0) > 0);
  if (!hasTouch) return null;

  const press = (key: keyof GameInputs, on: boolean) => {
    inputsRef.current[key] = on;
  };

  const handlers = (key: keyof GameInputs) => ({
    onTouchStart: (e: React.TouchEvent) => { e.preventDefault(); press(key, true); },
    onTouchEnd: (e: React.TouchEvent) => { e.preventDefault(); press(key, false); },
    onTouchCancel: (e: React.TouchEvent) => { e.preventDefault(); press(key, false); },
  });

  const btn = "font-arcade text-base text-white border-2 border-white/40 bg-black/50 w-14 h-14 flex items-center justify-center select-none";

  return (
    <div className="absolute bottom-12 left-0 right-0 z-15 flex justify-between items-end px-3 pointer-events-none">
      <div className="flex gap-2 pointer-events-auto">
        <button {...handlers("left")} className={btn} aria-label="left">◀</button>
        <button {...handlers("right")} className={btn} aria-label="right">▶</button>
      </div>
      <div className="flex gap-2 pointer-events-auto">
        <button onClick={onCycleTactic} className={btn} aria-label="cycle tactic">⟳</button>
        <button {...handlers("fire")} className={`${btn}`} style={{ borderColor: "#5fc5f8", color: "#5fc5f8" }} aria-label="fire">●</button>
      </div>
    </div>
  );
}
