import * as z from 'zod';

export const AllowPostToggleSchema = z.object({
  allow_post: z.boolean(),
});
