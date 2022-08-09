import { z } from "zod";
import { createRouter } from "./context";
import { createProtectedRouter } from "./protected-router";

export const reputationProtectedRouter = createProtectedRouter().mutation(
  "create",
  {
    input: z.object({
      userId: z.string(),
      factionId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.reputation.create({ data: input });
    },
  }
);

export const reputationRouter = createRouter().query("all", {
  async resolve({ ctx }) {
    return await ctx.prisma.reputation.findMany();
  },
});
