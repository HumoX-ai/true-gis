import { z } from "zod";

export const formSchema = z.object({
  placename: z.string().min(2, {
    message: "Joy nomi kiritilmadi",
  }),
  phone: z
    .string()
    .min(2, {
      message: "Telefon raqam kiritilmadi",
    })
    .min(9, {
      message: "Telefon raqam to'liq kiritilmadi",
    }),
  phone2: z.string(),
});
