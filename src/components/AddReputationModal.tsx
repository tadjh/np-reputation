import clsx from "clsx";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { composeKey } from "../utils";
import { trpc } from "../utils/trpc";

type AddReputationModalProps = {
  isOpen: boolean;
  forceClose: () => void;
  userId: string;
} & React.HTMLAttributes<HTMLElement>;

export default function AddReputationModal({
  isOpen,
  onClick: handleClose,
  forceClose,
  userId,
}: AddReputationModalProps) {
  const toastRef = useRef<string>("");
  const utils = trpc.useContext();
  const unalignedFactions = trpc.useQuery(["factions.unaligned", { userId }]);
  const reputation = trpc.useMutation(["reputation.create"], {
    onMutate() {
      toastRef.current = toast.loading("Adding reputation...");
    },
    onError() {
      toast.error("Failed to add reputation", { id: toastRef.current });
    },
    onSuccess() {
      toast.success("Reputation added!", {
        id: toastRef.current,
      });
      utils.invalidateQueries(["reputation.byId", { userId }]);
      utils.invalidateQueries(["factions.unaligned", { userId }]);
      forceClose();
    },
  });
  const [factionId, setFactionId] = useState<string>("");

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) =>
    setFactionId(event.target.value);

  const handleAddReputation: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    reputation.mutate({ factionId, userId });
  };

  if (!isOpen) return null;
  return (
    <div
      className={clsx(
        "absolute top-0 z-40 flex h-full w-full items-center justify-center bg-black/80 font-mono text-sm text-white/90"
      )}
      onMouseDown={handleClose}
    >
      <div className="w-11/12 rounded border border-slate-700 bg-slate-800 md:max-w-md">
        <div className="flex items-end justify-between border-b border-b-slate-700 bg-slate-900 p-2 text-base">
          Add Reputation
        </div>
        <form
          className="flex flex-col items-end gap-12 p-4"
          autoComplete="off"
          onSubmit={handleAddReputation}
        >
          <select
            className="w-full bg-transparent"
            value={factionId || undefined}
            onChange={handleChange}
            required
          >
            <option>Select an unaligned faction</option>
            {unalignedFactions.data?.map(({ name, nickname, id }, index) => (
              <option
                key={composeKey("option", index + 1)}
                value={id}
              >{`${nickname} (${name})`}</option>
            ))}
          </select>
          <div className="flex gap-4">
            <button
              type="button"
              className="px-2 py-1 hover:underline"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded border px-2 py-1 transition-colors hover:bg-slate-700"
              disabled={unalignedFactions.data?.length === 0}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
