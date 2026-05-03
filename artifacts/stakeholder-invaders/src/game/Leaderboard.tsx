import { useGetTopScores } from "@workspace/api-client-react";

export function Leaderboard() {
  const { data, isLoading, isError } = useGetTopScores();

  return (
    <div className="w-full max-w-xs mx-auto mt-6">
      <div className="font-arcade text-[10px] sm:text-xs text-cyan-300 mb-2 tracking-widest text-center">
        TOP ADVOCATES
      </div>
      <div className="border border-cyan-300/30 bg-black/40 p-3 rounded">
        {isLoading && (
          <div className="font-arcade text-[10px] text-white/50 text-center py-2 blink">
            LOADING…
          </div>
        )}
        {isError && (
          <div className="font-arcade text-[10px] text-[#d4546c] text-center py-2">
            LEADERBOARD OFFLINE
          </div>
        )}
        {!isLoading && !isError && (!data || data.length === 0) && (
          <div className="font-arcade text-[10px] text-white/50 text-center py-2">
            NO SCORES YET — BE FIRST
          </div>
        )}
        {data && data.length > 0 && (
          <ol className="space-y-1">
            {data.map((entry, idx) => (
              <li
                key={entry.id}
                className="grid grid-cols-[1.5rem_2.5rem_1fr_auto] gap-2 items-baseline font-arcade text-[10px] sm:text-xs"
              >
                <span className="text-white/40">
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
                <span className="text-[#F3E8B9]">{entry.handle}</span>
                <span className="text-cyan-300/80 text-[8px] sm:text-[9px]">
                  W{entry.wave} · ×{entry.advocates}
                </span>
                <span className="text-white">
                  {entry.score.toString().padStart(6, "0")}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
