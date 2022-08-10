import { Faction } from "@prisma/client";
import React from "react";
import toast from "react-hot-toast";
import { headerHeight, gap } from "../config";
import { env } from "../env/client.mjs";
import { composeKey } from "../utils";
import { trpc } from "../utils/trpc";
import ReputationItem from "./ReputationItem";

type ReputationProps = {
  gridEl: HTMLDivElement;
  userId?: string;
  status: "authenticated" | "loading" | "unauthenticated";
};

export default function Reputation({
  gridEl,
  userId = env.NEXT_PUBLIC_FEATURED_USER,
  status,
}: ReputationProps) {
  const utils = trpc.useContext();
  const toastRef = React.useRef<string>("");
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
      {reputations.data?.map(({ id, infamy, fame, factionId }, index) => {
        const faction = factionsMap.current.get(factionId);
        if (!faction) return null;
        return (
          <ReputationItem
            key={composeKey("reputation", index + 1)}
            id={id}
            infamy={infamy}
            fame={fame}
            color={faction.color}
            nickname={faction.nickname}
            grid={grid}
            onUpdate={(id, fame, infamy) =>
              updateRep.mutate({ id, fame, infamy })
            }
            canDrag={status === "authenticated"}
          />
        );
      })}
    </div>
  );
}
