import * as z from 'zod';

export const TopicSchema = z.object({
  msg: z.string().min(1, 'Topic name is required'),
});
