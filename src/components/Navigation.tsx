import { Faction } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState, useCallback } from "react";
import AddReputationModal from "./AddReputationModal";
import NewFactionModal from "./NewFactionModal";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

type NavigationProps = { factions?: Faction[] };

export default function Navigation({ factions }: NavigationProps) {
  const { data: session } = useSession();

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
        {session && session.user ? (
          <>
            <button className="hover:underline" onClick={handleNewClick}>
              New Faction
            </button>
            <button className="hover:underline" onClick={handleAddClick}>
              Add Rep
            </button>
            <SignOut />
          </>
        ) : (
          <SignIn />
        )}
      </nav>
      <NewFactionModal isOpen={isNewOpen} onClick={handleNewClick} />
      <AddReputationModal
        isOpen={isAddOpen}
        onClick={handleAddClick}
        factions={factions}
      />
    </>
  );
}
