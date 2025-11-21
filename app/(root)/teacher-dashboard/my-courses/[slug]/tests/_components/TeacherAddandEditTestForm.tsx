"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { testSchema } from "@/lib/validation";
import customAxios from "@/configs/customAxios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import { useParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetTeacherTestById } from "@/hooks/useGetTeacherTestsByCourseSlug";

type TestFormValues = z.infer<typeof testSchema>;

interface Props {
  isEdit?: boolean;
}

function TeacherAddandEditTestForm({ isEdit = false }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { slug: course_slug, test_id } = useParams<{
    slug: string;
    test_id?: string;
  }>();

  const { test, isLoading: isLoadingTest } = useGetTeacherTestById(test_id);

  const form = useForm<TestFormValues>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      question: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      correctAnswer: "a",
    },
  });

  useEffect(() => {
    if (isLoadingTest) return;

    if (isEdit && test) {
      form.reset({
        question: test.question || "",
        options: {
          a: test.options.a || "",
          b: test.options.b || "",
          c: test.options.c || "",
          d: test.options.d || "",
        },
        correctAnswer: test.correctAnswer as "a" | "b" | "c" | "d",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test, isEdit, isLoadingTest]);

  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.teacherTestsByCourseSlug, course_slug],
    mutationFn: async (data: TestFormValues) => {
      const values = {
        question: data.question,
        options: {
          a: data.options.a,
          b: data.options.b,
          c: data.options.c,
          d: data.options.d,
        },
        correct_answer: data.correctAnswer,
      };

      if (isEdit) {
        const response = await customAxios.put(
          `teacher/tests/${test_id}`,
          values
        );
        return response.data;
      } else {
        const response = await customAxios.post(
          `teacher/courses/${course_slug}/tests`,
          values
        );
        return response.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.teacherTestsByCourseSlug, course_slug],
      });
      toast.success(
        `Test muvaffaqiyatli ${isEdit ? "yangilandi" : "qo'shildi"}`
      );
      router.push(`/teacher-dashboard/my-courses/${course_slug}/tests`);
    },
  });

  const onSubmit = (data: TestFormValues) => {
    mutate(data);
  };

  if (isEdit && isLoadingTest) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin size-8 text-primary" />
          <p className="text-muted-foreground">
            Test ma&apos;lumotlari yuklanmoqda...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Savol</FormLabel>
              <FormControl>
                <Input
                  placeholder="Test savolini yozing"
                  {...field}
                  disabled={isPending || (isEdit && isLoadingTest)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="options.a"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variant A</FormLabel>
                <FormControl>
                  <Input
                    placeholder="A variant javobini yozing"
                    {...field}
                    disabled={isPending || (isEdit && isLoadingTest)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="options.b"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variant B</FormLabel>
                <FormControl>
                  <Input
                    placeholder="B variant javobini yozing"
                    {...field}
                    disabled={isPending || (isEdit && isLoadingTest)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="options.c"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variant C</FormLabel>
                <FormControl>
                  <Input
                    placeholder="C variant javobini yozing"
                    {...field}
                    disabled={isPending || (isEdit && isLoadingTest)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="options.d"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variant D</FormLabel>
                <FormControl>
                  <Input
                    placeholder="D variant javobini yozing"
                    {...field}
                    disabled={isPending || (isEdit && isLoadingTest)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="correctAnswer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To&apos;g&apos;ri javob</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isPending || (isEdit && isLoadingTest)}
                key={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-1/2 cursor-pointer">
                    <SelectValue placeholder="To'g'ri javobni tanlang" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="a" className="cursor-pointer">
                    Variant A
                  </SelectItem>
                  <SelectItem value="b" className="cursor-pointer">
                    Variant B
                  </SelectItem>
                  <SelectItem value="c" className="cursor-pointer">
                    Variant C
                  </SelectItem>
                  <SelectItem value="d" className="cursor-pointer">
                    Variant D
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.push(`/teacher-dashboard/my-courses/${course_slug}/tests`)
            }
            disabled={isPending || (isEdit && isLoadingTest)}
          >
            Bekor qilish
          </Button>
          <Button
            type="submit"
            disabled={isPending || (isEdit && isLoadingTest)}
          >
            {isPending ? (
              <>
                <Loader className="animate-spin size-4 mr-2" />
                Saqlanmoqda...
              </>
            ) : isEdit ? (
              "Yangilash"
            ) : (
              "Qo'shish"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default TeacherAddandEditTestForm;
