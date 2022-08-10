// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { factionProtectedRouter, factionRouter } from "./faction";
import { reputationProtectedRouter, reputationRouter } from "./reputation";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("factions.", factionRouter)
  .merge("faction.", factionProtectedRouter)
  .merge("reputation.", reputationRouter)
  .merge("reputation.", reputationProtectedRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
