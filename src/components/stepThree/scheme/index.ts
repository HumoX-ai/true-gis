import { z } from "zod";

export const formSchema = z.object({
  placename: z.string().min(2, {
    message: "Joy nomi kiritilmadi",
  }),
  description: z.string().min(2, {
    message: "Joy haqida malumot kiritilmadi",
  }),
});
