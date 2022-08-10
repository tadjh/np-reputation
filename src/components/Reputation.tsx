import { Faction } from "@prisma/client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { env } from "../env/client.mjs";
import { clamp, composeKey } from "../utils";
import { trpc } from "../utils/trpc";

type ReputationProps = {
  gridRef: React.MutableRefObject<HTMLDivElement | null>;
  userId?: string;
};

const headerHeight = 16;
const gap = 8;
const size = 40;

export default function Reputation({
  gridRef,
  userId = env.NEXT_PUBLIC_FEATURED_USER,
}: ReputationProps) {
  const { status } = useSession();

  const toastRef = React.useRef<string>("");
  const [factionsMap, setFactionsMap] = useState<Map<string, Faction>>(
    new Map()
  );

  trpc.useQuery(["factions.all"], {
    onSuccess: (result) => {
      setFactionsMap(new Map(result.map((res) => [res.id, res])));
    },
  });
  const reputations = trpc.useQuery(["reputation.byId", { userId }], {
    onError() {
      toast.error("Reputation could not be found.", { id: toastRef.current });
    },
    onSuccess() {
      toast.success("Reputation loaded!", { id: toastRef.current });
    },
  });
  const updateRep = trpc.useMutation(["reputation.update"], {
    onMutate() {
      toastRef.current = toast.loading("Updating reputation...");
    },
    onError() {
      toast.error("Reputation failed to update", { id: toastRef.current });
    },
    onSuccess(input) {
      toast.success(
        `${factionsMap.get(input.id)?.name || "faction"} reputation updated`,
        { id: toastRef.current }
      );
    },
  });

  useEffect(() => {
    toastRef.current = toast.loading("Loading reputation...");
  }, []);

  if (gridRef.current === null) return null;

  const grid = gridRef.current.getBoundingClientRect();

  const handleDragEnd = (id: string) => {
    // Couldn't get refs to work so did this
    const ref = document.getElementById(id);
    if (ref === null) return;
    const rep = ref.getBoundingClientRect();
    const x = (rep.right - rep.left) / 2 + rep.left;
    const y = (rep.bottom - rep.top) / 2 + rep.top;
    const f =
      (x - grid.left - headerHeight - gap) /
      (grid.right - grid.left - headerHeight);
    const i =
      (y - grid.top - headerHeight - gap) /
      (grid.bottom - grid.top - headerHeight);
    const fame = clamp(f, 0.0, 1.0);
    const infamy = clamp(i, 0.0, 1.0);
    updateRep.mutate({ id, fame, infamy });
  };

  return (
    <div
      className="pointer-events-none absolute bottom-0 right-0"
      style={{
        width: `calc(100% - ${headerHeight}px - ${gap}px)`,
        height: `calc(100% - ${headerHeight}px - ${gap}px)`,
      }}
    >
      {reputations.data &&
        reputations.data.map(({ id, fame, infamy, factionId }, index) => {
          const faction = factionsMap.get(factionId);
          if (!faction) return null;
          return (
            <motion.div
              id={id}
              drag={status === "authenticated"}
              dragMomentum={false}
              dragElastic={0.0}
              onDragEnd={() => handleDragEnd(id)}
              key={composeKey("reputation", index + 1)}
              className="pointer-events-auto absolute flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-opacity"
              style={{
                backgroundColor: `${faction.color}E6`,
                top: (grid.height - headerHeight - gap) * infamy - size / 2,
                left: (grid.width - headerHeight - gap) * fame - size / 2,
              }}
            >
              <span className="font-bold text-white/90 mix-blend-difference">
                {faction.nickname}
              </span>
            </motion.div>
          );
        })}
    </div>
  );
}
