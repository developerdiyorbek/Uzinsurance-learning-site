"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lessonSchema } from "@/lib/validation";
import customAxios from "@/configs/customAxios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetLessonBySlug } from "@/hooks/useGetLessonBySlug";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { NumericFormat } from "react-number-format";

const TextEditor = dynamic(() => import("@/components/shared/TextEditor"), {
  ssr: false,
});

type LessonFormValues = z.infer<typeof lessonSchema>;

interface Props {
  isEdit?: boolean;
}

function AddandEditLessonForm({ isEdit = false }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { slug: course_slug, lesson_slug } = useParams<{
    slug: string;
    lesson_slug: string;
  }>();

  const { lesson, lessonLoading } = useGetLessonBySlug(
    lesson_slug,
    course_slug
  );

  const form = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      content: "",
      slug: "",
      order: 1,
    },
  });

  useEffect(() => {
    if (lessonLoading) return;

    if (isEdit && lesson) {
      form.reset({
        title: lesson.title || "",
        content: lesson.content || "",
        slug: lesson.slug || "",
        order: lesson.order || 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson, isEdit, lessonLoading]);

  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.lessonsByCourseSlug, course_slug],
    mutationFn: async (data: LessonFormValues) => {
      const values = {
        title: data.title,
        content: data.content,
        slug: data.slug,
        order: data.order,
      };

      if (isEdit) {
        const response = await customAxios.put(
          `admin/lessons/${lesson_slug}`,
          values
        );
        return response.data;
      } else {
        const response = await customAxios.post(
          `admin/lessons/${course_slug}`,
          values
        );
        return response.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.lessonsByCourseSlug, course_slug],
      });
      toast.success(
        `Dars muvaffaqiyatli ${isEdit ? "yangilandi" : "qo'shildi"}`
      );
      router.push(`/admin-dashboard/all-courses/${course_slug}/lessons`);
    },
  });

  const onSubmit = (data: LessonFormValues) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <Label>Dars nomi</Label>
              <FormControl>
                <Input
                  placeholder="Dars nomini yozing"
                  {...field}
                  disabled={lessonLoading || isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <Label>Dars mazmuni</Label>
              <FormControl>
                <TextEditor
                  value={field.value}
                  onChange={field.onChange}
                  disabled={lessonLoading || isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <Label>Slug</Label>
              <FormControl>
                <Input
                  placeholder="dars-slug"
                  {...field}
                  disabled={lessonLoading || isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <Label>Tartib raqami</Label>
              <FormControl>
                <NumericFormat
                  value={field.value || 1}
                  thousandSeparator=" "
                  allowNegative={false}
                  decimalScale={0}
                  placeholder="Tartib raqami"
                  disabled={lessonLoading || isPending}
                  customInput={Input}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue ?? 1);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.push(`/admin-dashboard/all-courses/${course_slug}/lessons`)
            }
            disabled={lessonLoading || isPending}
          >
            Bekor qilish
          </Button>
          <Button type="submit" disabled={lessonLoading || isPending}>
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

export default AddandEditLessonForm;
