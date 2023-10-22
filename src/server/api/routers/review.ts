import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { reviews } from "@/server/db/schema";

export const reviewRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        placeId: z.number(),
        rating: z.number().min(1).max(5),
        inclusiveScore: z.number().min(1).max(5),
        hasGenderNeutralBathroom: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(reviews).values({
        placeId: input.placeId,
        rating: input.rating,
        inclusiveScore: input.inclusiveScore,
        hasGenderNeutralBathroom: input.hasGenderNeutralBathroom,
      });
    }),

  getAllReviewsByPlaceId: publicProcedure
    .input(
      z.object({
        placeId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.query.reviews.findMany();
    }),
});
