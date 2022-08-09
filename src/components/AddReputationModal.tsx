import { Faction } from "@prisma/client";
import clsx from "clsx";
import { useState } from "react";
import { composeKey } from "../utils";
import { trpc } from "../utils/trpc";

type AddReputationModalProps = {
  isOpen: boolean;
  forceClose: () => void;
  factions?: Faction[];
  userId: string;
} & React.HTMLAttributes<HTMLElement>;

export default function AddReputationModal({
  isOpen,
  onClick: handleClose,
  forceClose,
  factions,
  userId,
}: AddReputationModalProps) {
  const utils = trpc.useContext();
  const reputation = trpc.useMutation(["reputation.create"], {
    onSuccess() {
      utils.invalidateQueries(["reputations.all"]);
      forceClose();
    },
  });
  const [factionId, setFactionId] = useState<string>("");

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) =>
    setFactionId(event.target.value);

  const handleAddReputation: React.MouseEventHandler<
    HTMLButtonElement
  > = async (event) => {
    event.preventDefault();
    reputation.mutate({ factionId, userId });
  };

  if (!isOpen) return null;
  return (
    <div
      className={clsx(
        "absolute top-0 z-40 flex h-full w-full items-center justify-center bg-black/80 font-mono text-sm text-white/90"
      )}
      onClick={handleClose}
    >
      <div className="w-11/12 rounded border border-slate-700 bg-slate-800 md:max-w-md">
        <div className="flex items-end justify-between border-b border-b-slate-700 bg-slate-900 p-2 text-base">
          Add Reputation
        </div>
        <form className="flex flex-col items-end gap-12 p-4" autoComplete="off">
          <select
            className="w-full bg-transparent"
            value={factionId || undefined}
            onChange={handleChange}
          >
            <option>Select a faction</option>
            {factions?.map(({ name, nickname, id }, index) => (
              <option
                key={composeKey("option", index + 1)}
                value={id}
              >{`${nickname} (${name})`}</option>
            ))}
          </select>
          <div className="flex gap-4">
            <button className="px-2 py-1 hover:underline" onClick={handleClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="rounded border px-2 py-1 transition-colors hover:bg-slate-700"
              onClick={handleAddReputation}
              disabled={factions?.length === 0}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
