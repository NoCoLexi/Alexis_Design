import { useEffect, useRef, useState } from "react";
import {
  useSubmitScore,
  useGetTopScores,
  getGetTopScoresQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  score: number;
  advocates: number;
  wave: number;
  highScore: number;
  onRestart: () => void;
  onMenu: () => void;
}

const HANDLE_LENGTH = 3;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const HANDLE_KEY = "stakeholderInvaders.handle";

function loadInitialHandle(): string[] {
  try {
    const stored = localStorage.getItem(HANDLE_KEY);
    if (stored && /^[A-Z0-9]{3}$/.test(stored)) {
      return stored.split("");
    }
  } catch {}
  return ["A", "A", "A"];
}

export function GameOverScreen({
  score,
  advocates,
  wave,
  highScore,
  onRestart,
  onMenu,
}: Props) {
  const newRecord = score >= highScore && score > 0;
  const queryClient = useQueryClient();
  const submitScore = useSubmitScore();
  const { data: topScores } = useGetTopScores();

  const [handle, setHandle] = useState<string[]>(loadInitialHandle);
  const [submitted, setSubmitted] = useState(false);
  const submittingRef = useRef(false);

  // Eligible to submit if score > 0 and would make top 10 (or fewer than 10 entries)
  const qualifies =
    score > 0 &&
    (!topScores ||
      topScores.length < 10 ||
      score > topScores[topScores.length - 1].score);

  const handleString = handle.join("");

  const handleSubmit = () => {
    if (submitted || submittingRef.current) return;
    if (!/^[A-Z0-9]{3}$/.test(handleString)) return;
    submittingRef.current = true;
    submitScore.mutate(
      { data: { handle: handleString, score, advocates, wave } },
      {
        onSuccess: () => {
          setSubmitted(true);
          try { localStorage.setItem(HANDLE_KEY, handleString); } catch {}
          queryClient.invalidateQueries({ queryKey: getGetTopScoresQueryKey() });
        },
        onSettled: () => {
          submittingRef.current = false;
        },
      },
    );
  };

  // Arrow keys to change letters
  useEffect(() => {
    if (!qualifies || submitted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const cycleLetter = (idx: number, dir: 1 | -1) => {
    setHandle((prev) => {
      const next = [...prev];
      const cur = ALPHABET.indexOf(next[idx]);
      const nextIdx = (cur + dir + ALPHABET.length) % ALPHABET.length;
      next[idx] = ALPHABET[nextIdx];
      return next;
    });
  };

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center overflow-y-auto px-6 py-6 text-center"
      style={{ background: "radial-gradient(ellipse at center, rgba(212,84,108,0.18) 0%, rgba(8,8,10,0.96) 70%)" }}>
      <div className="font-arcade text-xs sm:text-sm text-[#d4546c] mb-2 flicker">INITIATIVE STALLED</div>
      <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-wide uppercase">GAME OVER</h2>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-left">
        <div className="font-arcade text-[10px] text-white/60">SCORE</div>
        <div className="font-arcade text-base text-[#F3E8B9]">{score.toString().padStart(6, "0")}</div>
        <div className="font-arcade text-[10px] text-white/60">ADVOCATES</div>
        <div className="font-arcade text-base text-cyan-300">×{advocates}</div>
        <div className="font-arcade text-[10px] text-white/60">HIGH SCORE</div>
        <div className="font-arcade text-base text-white">{highScore.toString().padStart(6, "0")}</div>
      </div>

      {newRecord && (
        <div className="mt-3 font-arcade text-[10px] text-[#F3E8B9] blink">NEW RECORD</div>
      )}

      {qualifies && !submitted && (
        <div className="mt-5 flex flex-col items-center">
          <div className="font-arcade text-[10px] text-cyan-300 mb-2 tracking-widest">
            ENTER YOUR INITIALS
          </div>
          <div className="flex gap-2">
            {handle.map((ch, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => cycleLetter(idx, 1)}
                  aria-label={`Increment letter ${idx + 1}`}
                  className="font-arcade text-cyan-300 hover:text-cyan-200 text-xs leading-none"
                >
                  ▲
                </button>
                <div
                  className="font-arcade text-2xl sm:text-3xl text-[#F3E8B9] w-9 sm:w-10 h-10 sm:h-12 flex items-center justify-center border-2 border-cyan-300/60 my-1"
                  style={{ textShadow: "0 0 8px rgba(243,232,185,0.6)" }}
                >
                  {ch}
                </div>
                <button
                  type="button"
                  onClick={() => cycleLetter(idx, -1)}
                  aria-label={`Decrement letter ${idx + 1}`}
                  className="font-arcade text-cyan-300 hover:text-cyan-200 text-xs leading-none"
                >
                  ▼
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitScore.isPending}
            className="mt-3 font-arcade text-[10px] sm:text-xs px-4 py-2 text-[#08080A] disabled:opacity-50"
            style={{ background: "#F3E8B9", boxShadow: "0 0 12px rgba(243,232,185,0.4)" }}
          >
            {submitScore.isPending ? "SUBMITTING…" : "SUBMIT SCORE"}
          </button>
          {submitScore.isError && (
            <div className="mt-2 font-arcade text-[9px] text-[#d4546c]">
              SUBMISSION FAILED — TRY AGAIN
            </div>
          )}
        </div>
      )}

      {submitted && (
        <div className="mt-4 font-arcade text-[10px] text-cyan-300 blink">
          SCORE RECORDED — {handleString}
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <button onClick={onRestart}
          className="font-arcade text-xs sm:text-sm px-5 py-2 text-[#08080A]"
          style={{ background: "#5fc5f8", boxShadow: "0 0 16px rgba(95,197,248,0.5)" }}>
          ▶ PLAY AGAIN
        </button>
        <button onClick={onMenu}
          className="font-arcade text-[10px] sm:text-xs px-4 py-2 text-cyan-300 border-2 border-cyan-300/60">
          MENU
        </button>
      </div>
    </div>
  );
}
