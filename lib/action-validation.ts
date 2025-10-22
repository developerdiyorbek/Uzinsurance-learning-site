import { z } from "zod";

export const logInActionSchema = z.object({
  phone_number: z.string().min(1, "Majburiy field!"),
  password: z.string().min(1, "Majburiy field!"),
});
