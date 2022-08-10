import { Faction, Reputation } from "@prisma/client";
import { motion, useMotionValue } from "framer-motion";
import React, { useEffect } from "react";
import { clamp } from "../utils";

type ReputationProps = {
  reputation: Reputation;
  factionsMap: Map<string, Faction>;
  headerHeight: number;
  gap: number;
  size: number;
  grid: DOMRect;
  canDrag: boolean;
  onUpdate: (id: string, fame: number, infamy: number) => void;
};

export default function ReputationItem({
  reputation,
  factionsMap,
  headerHeight,
  gap,
  size,
  grid,
  canDrag,
  onUpdate,
}: ReputationProps) {
  const faction = factionsMap.get(reputation.factionId);
  const ref = React.createRef<HTMLDivElement>();
  const x = useMotionValue(0);

  const handleDragEnd = (id: string, ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current === null) return;
    const rep = ref.current.getBoundingClientRect();
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
    onUpdate(id, fame, infamy);
  };

  return (
    <motion.div
      id={reputation.id}
      ref={ref}
      drag={canDrag}
      dragMomentum={false}
      dragElastic={0.0}
      dragSnapToOrigin={true}
      onDragEnd={() => handleDragEnd(reputation.id, ref)}
      className="pointer-events-auto absolute flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-opacity"
      style={{
        backgroundColor: `${faction?.color || "#FFFFFF"}E6`,
        top: (grid.height - headerHeight - gap) * reputation.infamy - size / 2,
        left: (grid.width - headerHeight - gap) * reputation.fame - size / 2,
      }}
    >
      <span className="font-bold text-white/90 mix-blend-difference">
        {faction?.nickname || "????"}
      </span>
    </motion.div>
  );
}
