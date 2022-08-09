import { Faction } from "@prisma/client";
import clsx from "clsx";
import { composeKey } from "../utils";

type AddFactionProps = {
  isOpen: boolean;
  factions?: Faction[];
} & React.HTMLAttributes<HTMLElement>;

export default function AddFactionModal({
  isOpen,
  onClick: handleClick,
  factions,
}: AddFactionProps) {
  if (!isOpen) return null;
  return (
    <div
      className={clsx(
        "absolute z-40 flex h-full w-full items-center justify-center bg-black/80 font-mono text-sm text-white/90"
      )}
      onClick={handleClick}
    >
      <div className="w-11/12 rounded border border-slate-700 bg-slate-800 md:max-w-md">
        <div className="flex items-end justify-between border-b border-b-slate-700 bg-slate-900 p-2 text-base">
          Add Reputation
        </div>
        <form className="flex flex-col items-end gap-12 p-4">
          <select className="w-full bg-transparent">
            <option>Select a faction</option>
            {factions?.map(({ nickname }, index) => (
              <option key={composeKey("option", index + 1)}>{nickname}</option>
            ))}
          </select>
          <div className="flex gap-4">
            <button className="px-2 py-1 hover:underline" onClick={handleClick}>
              Cancel
            </button>
            <button className="rounded border px-2 py-1 transition-colors hover:bg-slate-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
