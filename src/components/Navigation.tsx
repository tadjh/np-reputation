import { Faction } from "@prisma/client";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useState, useCallback } from "react";
import AddReputationModal from "./AddReputationModal";
import NewFactionModal from "./NewFactionModal";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

type NavigationProps = { factions?: Faction[] };

export default function Navigation({ factions }: NavigationProps) {
  const { data: session, status } = useSession();

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

  const closeIsNewOpen = useCallback(() => setIsNewOpen(false), []);

  const handleAddClick: React.MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        setIsAddOpen((prevState) => !prevState);
      }
    },
    []
  );

  const closeIsAddOpen = useCallback(() => setIsAddOpen(false), []);

  return (
    <>
      <nav
        className={clsx(
          "flex justify-end gap-4 p-2 font-mono text-xs text-white/90 transition-opacity",
          status === "loading" ? "opacity-0" : "opacity-100"
        )}
      >
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
      {session && session.user && (
        <>
          <NewFactionModal
            isOpen={isNewOpen}
            onClick={handleNewClick}
            forceClose={closeIsNewOpen}
          />
          <AddReputationModal
            isOpen={isAddOpen}
            onClick={handleAddClick}
            forceClose={closeIsAddOpen}
            factions={factions}
            userId={session.user.id}
          />
        </>
      )}
    </>
  );
}
