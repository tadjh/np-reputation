import { z } from "zod";
import { createRouter } from "./context";
import { createProtectedRouter } from "./protected-router";

export const factionProtectedRouter = createProtectedRouter().mutation(
  "create",
  {
    input: z.object({
      name: z.string(),
      nickname: z.string().max(4),
      color: z.string().startsWith("#").max(7),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.faction.create({ data: input });
    },
  }
);

export const factionRouter = createRouter()
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.faction.findMany();
    },
  })
  .query("unaligned", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.faction.findMany({
        orderBy: [
          {
            nickname: "asc",
          },
        ],
        where: {
          NOT: { reputation: { some: { userId: { contains: input.userId } } } },
        },
      });
    },
  });
