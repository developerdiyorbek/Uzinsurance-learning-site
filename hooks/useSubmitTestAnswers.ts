import customAxios from "@/configs/customAxios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface TestAnswer {
  test_id: string;
  answer: "a" | "b" | "c" | "d";
}

interface SubmitTestAnswersRequest {
  course_slug: string;
  answers: TestAnswer[];
}

interface TestResultDetail {
  test_id: string;
  question: string;
  user_answer: "a" | "b" | "c" | "d" | null;
  correct_answer: "a" | "b" | "c" | "d";
  is_correct: boolean;
}

interface SubmitTestAnswersResponse {
  success: boolean;
  results: {
    correct_count: number;
    total_count: number;
    score: number;
    details: TestResultDetail[];
  };
  message: string;
}

export function useSubmitTestAnswers() {
  return useMutation({
    mutationFn: async ({ course_slug, answers }: SubmitTestAnswersRequest) => {
      const { data } = await customAxios.post<SubmitTestAnswersResponse>(
        `user/courses/${course_slug}/tests/submit`,
        { answers }
      );
      return data;
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error.response?.data?.message || "Testni yuborishda xatolik yuz berdi";
      toast.error(errorMessage);
    },
  });
}
