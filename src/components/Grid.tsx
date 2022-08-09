import clsx from "clsx";
import { composeKey } from "../utils";

export const reputation: Readonly<string[][]> = [
  [" ", ""],
  ["Rank 1", ""],
  ["Rank 2", ""],
  ["Rank 3", ""],
  ["Rank 4", ""],
  ["Rank 1", ""],
  ["Neutral", "hover:bg-slate-100/5"],
  ["Accepted", "bg-emerald-900/20 hover:bg-emerald-900/30"],
  ["Liked", "bg-emerald-900/40 hover:bg-emerald-900/50"],
  ["Idolized", "bg-emerald-900/60 hover:bg-emerald-900/70"],
  ["Rank 2", ""],
  ["Shunned", "bg-red-900/20 hover:bg-red-900/30"],
  ["Mixed", "hover:bg-slate-100/5"],
  ["Smiling Troublemaker", "bg-emerald-900/20 hover:bg-emerald-900/30"],
  ["Good-Natued Rascal", "bg-emerald-900/40 hover:bg-emerald-900/50"],
  ["Rank 3", ""],
  ["Hated", "bg-red-900/40 hover:bg-red-900/50"],
  ["Sneering Punk", "bg-red-900/20 bg-red-900/30"],
  ["Unpredictable", "hover:bg-slate-100/5"],
  ["Dark Hero", "bg-emerald-900/20 hover:bg-emerald-900/30"],
  ["Rank 4", ""],
  ["Vilified", "bg-red-900/60 hover:bg-red-900/70"],
  ["Merciful Thug", "bg-red-900/40 hover:bg-red-900/50"],
  ["Soft-Hearted Devil", "bg-red-900/20 hover:bg-red-900/30"],
  ["Wild Child", "hover:bg-slate-100/5"],
];

type GridProps = {
  gridRefs: React.RefObject<HTMLDivElement>[];
};

export default function Grid({ gridRefs }: GridProps) {
  return (
    <div
      className="grid gap-1 font-mono text-xs text-white/70 md:gap-2"
      style={{
        gridTemplateColumns: "16px repeat(4, minmax(0, 1fr))",
        gridTemplateRows: "16px repeat(4, minmax(0, 1fr))",
      }}
    >
      {Array.from(reputation).map(([rep, color], index) => (
        <div
          key={composeKey("alignment", index + 1)}
          ref={gridRefs[index]}
          className={clsx(
            "flex items-center justify-center rounded shadow",
            index > 4 && index % 5 !== 0
              ? "border border-slate-700 p-2 text-slate-400 transition-colors hover:text-slate-300"
              : "",
            color
          )}
        >
          <span
            className={clsx(
              index > 4 && index % 5 !== 0
                ? "whitespace-normal break-all"
                : "whitespace-nowrap",
              index % 5 === 0 && "-rotate-90"
            )}
          >
            {rep}
          </span>
        </div>
      ))}
    </div>
  );
}
