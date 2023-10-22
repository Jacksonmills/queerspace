import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { places } from "@/server/db/schema";

export const placeRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1), address: z.string().min(1), latitude: z.number().min(0), longitude: z.number().min(0) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(places).values({
        name: input.name,
        address: input.address,
        latitude: input.latitude,
        longitude: input.longitude,
      });
    }),

  getAllPlaces: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.places.findMany();
  }),
});
