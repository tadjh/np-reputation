import { z } from "zod";
import { createProtectedRouter } from "./protected-router";
import { createRouter } from "./context";

export const reputationProtectedRouter = createProtectedRouter()
  .mutation("create", {
    input: z.object({
      userId: z.string(),
      factionId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.reputation.create({ data: input });
    },
  })
  .mutation("update", {
    input: z.object({ id: z.string(), fame: z.number(), infamy: z.number() }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.reputation.update({
        where: { id: input.id },
        data: input,
      });
    },
  });

export const reputationRouter = createRouter().query("byId", {
  input: z.object({
    userId: z.string(),
  }),
  async resolve({ ctx, input }) {
    return await ctx.prisma.reputation.findMany({
      where: { userId: input.userId },
    });
  },
});
