// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { factionProtectedRouter, factionRouter } from "./faction";
import { reputationProtectedRouter, reputationRouter } from "./reputation";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("question.", protectedExampleRouter)
  .merge("factions.", factionRouter)
  .merge("faction.", factionProtectedRouter)
  .merge("reputations.", reputationRouter)
  .merge("reputation.", reputationProtectedRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
