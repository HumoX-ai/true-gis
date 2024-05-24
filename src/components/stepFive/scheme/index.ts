import { z } from "zod";

export const formSchema = z.object({
  time: z.string(),
  timeZone: z.string(),
});
