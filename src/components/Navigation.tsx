import { Faction } from "@prisma/client";
import { useState, useCallback } from "react";
import AddFactionModal from "./AddFactionModal";
import NewFactionModal from "./NewFactionModal";
import SignIn from "./Signin";

type NavigationProps = { factions?: Faction[] };

export default function Navigation({ factions }: NavigationProps) {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleNewClick: React.MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        setIsNewOpen((prevState) => !prevState);
      }
    },
    []
  );

  const handleAddClick: React.MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        setIsAddOpen((prevState) => !prevState);
      }
    },
    []
  );

  return (
    <>
      <nav className="absolute top-0 right-0 flex gap-4 p-2 font-mono text-xs text-white/90">
        <button className="hover:underline" onClick={handleNewClick}>
          New Faction
        </button>
        <button className="hover:underline" onClick={handleAddClick}>
          Add Rep
        </button>
        <SignIn />
      </nav>
      <NewFactionModal isOpen={isNewOpen} onClick={handleNewClick} />
      <AddFactionModal
        isOpen={isAddOpen}
        onClick={handleAddClick}
        factions={factions}
      />
    </>
  );
}
