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
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetTeacherLessonBySlug } from "@/hooks/useGetTeacherLessonBySlug";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Textarea } from "@/components/ui/textarea";

const TextEditor = dynamic(() => import("@/components/shared/TextEditor"), {
  ssr: false,
});

type LessonFormValues = z.infer<typeof lessonSchema>;

interface Props {
  isEdit?: boolean;
}

function TeacherAddandEditLessonForm({ isEdit = false }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { slug: course_slug, lesson_slug } = useParams<{
    slug: string;
    lesson_slug: string;
  }>();

  const { lesson, lessonLoading } = useGetTeacherLessonBySlug(
    lesson_slug,
    course_slug,
  );

  const [lessonFile, setLessonFile] = useState<File | null>(null);

  const form = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      content: "",
      slug: "",
      video_url: "",
      file_url: null,
    },
  });

  useEffect(() => {
    if (lessonLoading) return;

    if (isEdit && lesson) {
      form.reset({
        title: lesson.title || "",
        content: lesson.content || "",
        slug: lesson.slug || "",
        video_url: lesson.video_url || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson, isEdit, lessonLoading]);

  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.teacherLessonsByCourseSlug, course_slug],
    mutationFn: async (data: LessonFormValues) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("slug", data.slug);
      formData.append("video_url", data.video_url || "");

      if (lessonFile) {
        formData.append("file", lessonFile);
      }

      if (isEdit) {
        const response = await customAxios.put(
          `teacher/lessons/${lesson_slug}/${course_slug}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        return response.data;
      } else {
        const response = await customAxios.post(
          `teacher/lessons/${course_slug}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        return response.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.teacherLessonsByCourseSlug, course_slug],
      });
      toast.success(
        `Dars muvaffaqiyatli ${isEdit ? "yangilandi" : "qo'shildi"}`,
      );
      router.push(`/teacher-dashboard/my-courses/${course_slug}/lessons`);
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
          name="video_url"
          render={({ field }) => (
            <FormItem>
              <Label>Video URL (ixtiyoriy)</Label>
              <FormControl>
                <Textarea
                  placeholder="YouTube URL yoki embed code kiriting"
                  {...field}
                  value={field.value || ""}
                  disabled={lessonLoading || isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormItem>
          <Label>Dars fayli (PDF, DOC, DOCX, PPT, PPTX)</Label>
          <FormControl>
            <Input
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setLessonFile(file);
              }}
              disabled={lessonLoading || isPending}
            />
          </FormControl>
          {isEdit && lesson?.file_url && !lessonFile && (
            <p className="text-sm text-muted-foreground mt-1">
              Joriy fayl:{" "}
              <a
                href={lesson?.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                yuklab olish
              </a>
            </p>
          )}
        </FormItem>

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

        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.push(
                `/teacher-dashboard/my-courses/${course_slug}/lessons`,
              )
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

export default TeacherAddandEditLessonForm;
