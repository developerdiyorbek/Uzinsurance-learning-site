import { z } from "zod";

export const logInSchema = z.object({
  phoneNumber: z
    .string()
    .min(17, "Majburiy field!")
    .regex(/^\+998 \d{2} \d{3} \d{2} \d{2}$/, "Raqam kiriting!"),
  password: z.string().min(1, "Majburiy field!"),
});
