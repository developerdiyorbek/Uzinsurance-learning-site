"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetCourseBySlug } from "@/hooks/useGetCourseBySlug";
import { Loader, ArrowLeft } from "lucide-react";
import AdvancedErrorComponent from "@/components/shared/AdvancedErrorComponent";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lessonSchema } from "@/lib/validation";
import TextEditor from "@/components/shared/TextEditor";
import customAxios from "@/configs/customAxios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ILesson } from "@/types";

type LessonFormValues = z.infer<typeof lessonSchema>;

export default function EditLessonPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const lessonId = params.lessonId as string;
  const {
    course,
    isLoading: courseLoading,
    error: courseError,
  } = useGetCourseBySlug(slug);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: lesson,
    isLoading: lessonLoading,
    error: lessonError,
  } = useQuery<ILesson>({
    queryKey: ["lesson", lessonId],
    queryFn: async () => {
      const { data } = await customAxios.get(`admin/lessons/${lessonId}`);
      return data?.lesson || data;
    },
    enabled: !!lessonId,
  });

  const form = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      content: "",
      order: 1,
    },
  });

  useEffect(() => {
    if (lesson) {
      form.reset({
        title: lesson.title || "",
        content: lesson.content || "",
        order: lesson.order || 1, // Keep order for form validation, but don't show it
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  const handleBack = () => {
    router.push(`/admin-dashboard/all-courses/${slug}/lessons`);
  };

  const onSubmit = async (data: LessonFormValues) => {
    if (!course?._id || !lessonId) return;

    try {
      setIsSubmitting(true);
      await customAxios.put(`admin/lessons/${lessonId}`, {
        ...data,
        course: course._id,
      });
      toast.success("Dars muvaffaqiyatli yangilandi");
      router.push(`/admin-dashboard/all-courses/${slug}/lessons`);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Kutilmagan xatolik");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = courseLoading || lessonLoading;
  const error = courseError || lessonError;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !course || !lesson) {
    return <AdvancedErrorComponent />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="flex-shrink-0"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <PageHeader
          title="Darsni tahrirlash"
          description={`"${lesson.title}" darsini tahrirlash`}
          className="mb-0"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dars ma&apos;lumotlari</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label>Dars nomi</Label>
                    <FormControl>
                      <Input placeholder="Dars nomini yozing" {...field} />
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
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  Bekor qilish
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin size-4 mr-2" />
                      Saqlanmoqda...
                    </>
                  ) : (
                    "Yangilash"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
