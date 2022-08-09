import { z } from "zod";
import { createRouter } from "./context";
import { createProtectedRouter } from "./protected-router";

export const factionProtectedRouter = createProtectedRouter().mutation(
  "create",
  {
    input: z.object({
      name: z.string(),
      nickname: z.string().max(8),
      color: z.string().startsWith("#").max(7),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.faction.create({ data: input });
    },
  }
);

export const factionRouter = createRouter().query("all", {
  async resolve({ ctx }) {
    return await ctx.prisma.faction.findMany();
  },
});
