import { object, string, array } from "zod";

export const formSchema = object({
  // Rasm yuklamasa keyingi bosqichga o'tmasligi
  prewImages: array(string()).max(5, "5 tadan ortiq rasm yuklay olmang"),
});
