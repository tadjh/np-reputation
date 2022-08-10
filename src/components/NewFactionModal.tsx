import clsx from "clsx";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { trpc } from "../utils/trpc";

type NewFactionProps = {
  isOpen: boolean;
  userId: string;
  forceClose: () => void;
} & React.HTMLAttributes<HTMLElement>;

export default function NewFactionModal({
  isOpen,
  userId,
  onClick: handleClose,
  forceClose,
}: NewFactionProps) {
  const toastRef = useRef<string>("");
  const utils = trpc.useContext();
  const faction = trpc.useMutation(["faction.create"], {
    onMutate() {
      toastRef.current = toast.loading("Creating new faction...");
    },
    onError() {
      toast.error("Failed to create new faction", { id: toastRef.current });
    },
    onSuccess(input) {
      toast.success(`Faction "${input.name}" created!`, {
        id: toastRef.current,
      });
      utils.invalidateQueries(["factions.all"]);
      utils.invalidateQueries(["factions.unaligned", { userId }]);
      forceClose();
    },
  });
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [color, setColor] = useState("#ffffff");

  const handleCreateFaction: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();

    faction.mutate({ name, nickname, color });
  };

  const handleName: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setName(event.target.value);

  const handleNickname: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setNickname(event.target.value);

  const handleColor: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setColor(event.target.value);

  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        "absolute top-0 z-40 flex h-full w-full items-center justify-center bg-black/80 font-mono text-sm text-white/90"
      )}
      onMouseDown={handleClose}
    >
      <div className="relative z-50 w-11/12 rounded border border-slate-700 bg-slate-800 md:max-w-md">
        <div className="flex items-end justify-between border-b border-b-slate-700 bg-slate-900 p-2 text-base">
          New Faction
        </div>
        <form
          className="flex flex-col items-end gap-12 p-4"
          autoComplete="off"
          onSubmit={handleCreateFaction}
        >
          <label htmlFor="name" className="flex w-full flex-col">
            Name
            <input
              id="name"
              className="border-b bg-transparent"
              onChange={handleName}
              value={name}
              required
            />
          </label>
          <label htmlFor="nickname" className="flex w-full flex-col">
            {"Nickname (max 4 Characters)"}
            <input
              id="nickname"
              className="border-b bg-transparent"
              onChange={handleNickname}
              value={nickname}
              maxLength={4}
              required
            />
          </label>
          <label htmlFor="color" className="flex w-full flex-col">
            Color
            <input
              id="color"
              className="border-b bg-transparent"
              onChange={handleColor}
              value={color}
              required
            />
          </label>
          <label htmlFor="image" className="flex w-full flex-col">
            Image (Optional)
            <input id="image" className="border-b bg-transparent" />
          </label>
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
              disabled={faction.isLoading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
