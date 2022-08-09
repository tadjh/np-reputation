import clsx from "clsx";
import { useState } from "react";
import { trpc } from "../utils/trpc";

type NewFactionProps = { isOpen: boolean } & React.HTMLAttributes<HTMLElement>;

export default function NewFactionModal({
  isOpen,
  onClick: handleClick,
}: NewFactionProps) {
  const faction = trpc.useMutation(["faction.create"]);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [color, setColor] = useState("#ffffff");

  const handleCreateFaction: React.FormEventHandler<HTMLFormElement> = async (
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
        "absolute z-40 flex h-full w-full items-center justify-center bg-black/80 font-mono text-sm text-white/90"
      )}
      onClick={handleClick}
    >
      <div className="w-11/12 rounded border border-slate-700 bg-slate-800 md:max-w-md">
        <div className="flex items-end justify-between border-b border-b-slate-700 bg-slate-900 p-2 text-base">
          New Faction
        </div>
        <form
          className="flex flex-col items-end gap-12 p-4"
          onSubmit={handleCreateFaction}
        >
          <label htmlFor="name" className="flex w-full flex-col">
            Name
            <input
              id="name"
              className="border-b bg-transparent"
              onChange={handleName}
              value={name}
            />
          </label>
          <label htmlFor="nickname" className="flex w-full flex-col">
            Nickname
            <input
              id="nickname"
              className="border-b bg-transparent"
              onChange={handleNickname}
              value={nickname}
            />
          </label>
          <label htmlFor="color" className="flex w-full flex-col">
            Color
            <input
              id="color"
              className="border-b bg-transparent"
              onChange={handleColor}
              value={color}
            />
          </label>
          <label htmlFor="image" className="flex w-full flex-col">
            Image (Optional)
            <input id="image" className="border-b bg-transparent" />
          </label>
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
