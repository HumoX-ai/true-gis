import { z } from "zod";

export const formSchema = z.object({
  linksInput: z.string().min(1),
});
