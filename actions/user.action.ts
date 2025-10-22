import customAxios from "@/configs/customAxios";
import { logInActionSchema } from "@/lib/action-validation";
import { actionClient } from "@/lib/safe-action";
import { AxiosError } from "axios";

export const logInAction = actionClient
  .schema(logInActionSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { data } = await customAxios.post("/auth/login", parsedInput);

      return {
        success: true,
        data: JSON.parse(JSON.stringify(data)),
      };
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage = err.response?.data?.message || "Kutilmagan xatolik";

      return {
        success: false,
        error: errorMessage,
      };
    }
  });
