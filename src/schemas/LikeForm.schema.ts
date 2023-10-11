import * as z from 'zod';

export const LikeSchema = z.object({
  isLiked: z.boolean(),
});
