// import { createRouter } from "./context";
import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const factionRouter = createProtectedRouter()
  .mutation("create", {
    input: z.object({
      name: z.string(),
      nickname: z.string().max(8),
      color: z.string().startsWith("#").max(7),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.faction.create({ data: input });
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.faction.findMany();
    },
  });
