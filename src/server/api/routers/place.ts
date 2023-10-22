import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { places } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const placeRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        address: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(places).values({
        name: input.name,
        address: input.address,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(places).where(eq(places.id, input.id));
    }),

  getAllPlaces: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.places.findMany();
  }),
});
