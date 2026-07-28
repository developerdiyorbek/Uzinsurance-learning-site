"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUploadInput from "@/components/shared/ImageUploadInput";
import { teacherCourseEditSchema } from "@/lib/validation";
import { Label } from "@/components/ui/label";
import customAxios from "@/configs/customAxios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Loader, Send } from "lucide-react";
import { ICourse } from "@/types";
import { useRouter } from "next/navigation";

type TeacherCourseEditFormValues = z.infer<typeof teacherCourseEditSchema>;

interface Props {
  course: ICourse;
  onSuccess?: () => void;
}

export default function TeacherCourseEditForm({ course, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [submittingForApproval, setSubmittingForApproval] = useState(false);
  const router = useRouter();
  const isPending = course.status === "pending";
  const isPublishedOrRejected =
    course.status === "published" || course.status === "rejected";

  const form = useForm<TeacherCourseEditFormValues>({
    resolver: zodResolver(teacherCourseEditSchema),
    defaultValues: {
      title: course.title || "",
      description: course.description || "",
      slug: course.slug || "",
      image: undefined,
    },
  });

  useEffect(() => {
    if (course) {
      form.reset({
        title: course.title || "",
        description: course.description || "",
        slug: course.slug || "",
        image: undefined,
      });
    }
  }, [course, form]);

  const onSubmit = async (data: TeacherCourseEditFormValues) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("new_slug", data.slug);

      if (data.image) {
        formData.append("image", data.image);
      }

      await customAxios.put(`teacher/courses/${course?.slug}`, formData);

      toast.success("Kurs muvaffaqiyatli yangilandi");
      if (onSuccess) {
        onSuccess();
      }

      const slug_changed = course?.slug && data.slug !== course.slug;

      if (slug_changed) {
        router.push("/teacher-dashboard/my-courses");
      } else {
        router.refresh();
      }

      router.refresh();
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage = err.response?.data?.message || "Kutilmagan xatolik";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitForApproval = async () => {
    try {
      setSubmittingForApproval(true);

      await customAxios.put(
        `teacher/courses/${course?.slug}/submit-for-approval`,
      );

      toast.success("Kurs tasdiqlashga yuborildi");
      if (onSuccess) {
        onSuccess();
      }
      router.refresh();
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage = err.response?.data?.message || "Kutilmagan xatolik";
      toast.error(errorMessage);
    } finally {
      setSubmittingForApproval(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Label>Kurs nomi</Label>
                <FormControl>
                  <Input placeholder="Kurs nomini yozing" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label>Tavsif</Label>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Kurs haqida qisqacha ma'lumot yozing..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                  <Input placeholder="Masalan: sugurta-haqida" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <Label>Kurs rasmi</Label>
                <FormControl>
                  <ImageUploadInput
                    initialImage={course.image}
                    onChange={(file) => {
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="animate-spin size-4 mr-2" />
                  Saqlanmoqda...
                </>
              ) : (
                "Saqlash"
              )}
            </Button>

            {!isPending && (
              <Button
                type="button"
                variant="default"
                onClick={handleSubmitForApproval}
                disabled={
                  submittingForApproval || loading || isPublishedOrRejected
                }
                className="flex-1"
              >
                {submittingForApproval ? (
                  <>
                    <Loader className="animate-spin size-4 mr-2" />
                    Yuborilmoqda...
                  </>
                ) : (
                  <>
                    <Send className="size-4 mr-2" />
                    Kursni Tasdiqlashga yuborish
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
