import { Faction } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { env } from "../env/client.mjs";
import { composeKey } from "../utils";
import { trpc } from "../utils/trpc";
import ReputationItem from "./ReputationItem";

type ReputationProps = {
  gridEl: HTMLDivElement;
  userId?: string;
};

const headerHeight = 16;
const gap = 8;
const size = 40;

export default function Reputation({
  gridEl,
  userId = env.NEXT_PUBLIC_FEATURED_USER,
}: ReputationProps) {
  const { status } = useSession();

  const toastRef = React.useRef<string>("");
  const utils = trpc.useContext();

  const factionsMap = React.useRef<Map<string, Faction>>(new Map());

  trpc.useQuery(["factions.all"], {
    onSuccess: (result) => {
      factionsMap.current = new Map(result.map((res) => [res.id, res]));
    },
  });
  const reputations = trpc.useQuery(["reputation.byId", { userId }]);
  const updateRep = trpc.useMutation(["reputation.update"], {
    onMutate() {
      toastRef.current = toast.loading("Updating reputation...");
    },
    onError() {
      toast.error("Reputation failed to update", { id: toastRef.current });
    },
    onSuccess(input) {
      toast.success(
        `${
          factionsMap.current.get(input.id)?.name || "faction"
        } reputation updated`,
        { id: toastRef.current }
      );
      utils.invalidateQueries(["reputation.byId", { userId }]);
    },
  });

  const grid = gridEl.getBoundingClientRect();

  return (
    <div
      className="pointer-events-none absolute bottom-0 right-0"
      style={{
        width: `calc(100% - ${headerHeight}px - ${gap}px)`,
        height: `calc(100% - ${headerHeight}px - ${gap}px)`,
      }}
    >
      {reputations.data?.map((reputation, index) => (
        <ReputationItem
          key={composeKey("reputation", index + 1)}
          reputation={reputation}
          factionsMap={factionsMap.current}
          headerHeight={headerHeight}
          gap={gap}
          size={size}
          grid={grid}
          onUpdate={(id, fame, infamy) =>
            updateRep.mutate({ id, fame, infamy })
          }
          canDrag={status === "authenticated"}
        />
      ))}
    </div>
  );
}
