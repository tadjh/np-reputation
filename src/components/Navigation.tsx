import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useState, useCallback } from "react";
import { env } from "../env/client.mjs";
import AddReputationModal from "./AddReputationModal";
import NewFactionModal from "./NewFactionModal";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

export default function Navigation() {
  const { data: session, status } = useSession();

  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleNewClick: React.MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        setIsNewOpen((prevState) => !prevState);
      }
    },
    []
  );

  const closeIsNewOpen = useCallback(() => setIsNewOpen(false), []);

  const handleAddClick: React.MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
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
            {session.user.id === env.NEXT_PUBLIC_FEATURED_USER && (
              <button className="hover:underline" onClick={handleNewClick}>
                + Faction
              </button>
            )}
            <button className="hover:underline" onClick={handleAddClick}>
              + Reputation
            </button>
            <SignOut />
          </>
        ) : (
          <SignIn />
        )}
      </nav>
      {session && session.user && (
        <>
          {session.user.id === env.NEXT_PUBLIC_FEATURED_USER && (
            <NewFactionModal
              isOpen={isNewOpen}
              onClick={handleNewClick}
              forceClose={closeIsNewOpen}
              userId={session.user.id}
            />
          )}
          <AddReputationModal
            isOpen={isAddOpen}
            onClick={handleAddClick}
            forceClose={closeIsAddOpen}
            userId={session.user.id}
          />
        </>
      )}
    </>
  );
}
