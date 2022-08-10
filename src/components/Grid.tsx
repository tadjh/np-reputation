import clsx from "clsx";
import React from "react";
import { reputation } from "../config";
import { composeKey } from "../utils";

const Grid = React.forwardRef<
  HTMLDivElement | null,
  React.HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="relative grid gap-1 font-mono text-xs text-white/70 md:gap-2"
      style={{
        gridTemplateColumns: "16px repeat(4, minmax(0, 1fr))",
        gridTemplateRows: "16px repeat(4, minmax(0, 1fr))",
      }}
    >
      {Array.from(reputation).map(([rep, color], index) => (
        <div
          key={composeKey("alignment", index + 1)}
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
      {children}
    </div>
  );
});

Grid.displayName = "Grid";

export default Grid;
