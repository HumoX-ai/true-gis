import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Ism-familiya kiritilmadi",
  }),
  phone: z
    .string()
    .min(2, {
      message: "Telefon raqam kiritilmadi",
    })
    .min(9, {
      message: "Telefon raqam to'liq kiritilmadi",
    }),
});
