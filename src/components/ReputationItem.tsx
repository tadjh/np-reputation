import { motion } from "framer-motion";
import React from "react";
import { headerHeight, gap, size } from "../config";
import { clamp } from "../utils";

type ReputationProps = {
  id: string;
  infamy: number;
  fame: number;
  color: string;
  nickname: string;
  grid: DOMRect;
  canDrag: boolean;
  onUpdate: (id: string, fame: number, infamy: number) => void;
};

export default function ReputationItem({
  id,
  infamy,
  fame,
  color,
  nickname,
  grid,
  canDrag,
  onUpdate,
}: ReputationProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const handleDragEnd = (
    id: string,
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
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
      id={id}
      ref={ref}
      drag={canDrag}
      dragMomentum={false}
      dragElastic={0.0}
      onDragEnd={() => handleDragEnd(id, ref)}
      className="pointer-events-auto absolute flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-400 transition-opacity"
      style={{
        backgroundColor: `${color}E6`,
        y: (grid.height - headerHeight - gap) * infamy - size / 2,
        x: (grid.width - headerHeight - gap) * fame - size / 2,
      }}
    >
      <span className="font-bold text-slate-200">{nickname}</span>
    </motion.div>
  );
}
