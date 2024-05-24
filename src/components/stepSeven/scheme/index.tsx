import { z } from "zod";

export const formSchema = z.object({
  radio: z.string(),
});
