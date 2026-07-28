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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUploadInput from "@/components/shared/ImageUploadInput";
import { courseEditSchema } from "@/lib/validation";
import { Label } from "@/components/ui/label";
import customAxios from "@/configs/customAxios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Loader, ShieldCheck } from "lucide-react";
import { ICourse } from "@/types";
import { useRouter } from "next/navigation";

type CourseEditFormValues = z.infer<typeof courseEditSchema>;

interface Props {
  course: ICourse;
  onSuccess?: () => void;
}

export default function CourseEditForm({ course, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<CourseEditFormValues>({
    resolver: zodResolver(courseEditSchema),
    defaultValues: {
      title: course.title || "",
      description: course.description || "",
      slug: course.slug || "",
      status: course.status || "created",
      image: undefined,
    },
  });

  useEffect(() => {
    if (course) {
      form.reset({
        title: course.title || "",
        description: course.description || "",
        slug: course.slug || "",
        status: course.status || "created",
        image: undefined,
      });
    }
  }, [course, form]);

  const onSubmit = async (data: CourseEditFormValues) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("new_slug", data.slug);
      formData.append("status", data.status);

      if (data.image) {
        formData.append("image", data.image);
      }

      await customAxios.put(`admin/courses/${course?.slug}`, formData);

      toast.success("Kurs muvaffaqiyatli yangilandi");
      if (onSuccess) {
        onSuccess();
      }

      const slug_changed = course?.slug && data.slug !== course.slug;

      if (slug_changed) {
        router.push("/admin-dashboard/all-courses");
      } else {
        router.refresh();
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage = err.response?.data?.message || "Kutilmagan xatolik";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Label>Status</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[300px] cursor-pointer focus:border-primary">
                    <ShieldCheck className="size-4 text-muted-foreground" />
                    <SelectValue placeholder="Statusni tanlang" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="created">Yaratilgan</SelectItem>
                  <SelectItem value="pending">Kutilmoqda</SelectItem>
                  <SelectItem value="published">Nashr qilingan</SelectItem>
                  <SelectItem value="rejected">Rad etilgan</SelectItem>
                </SelectContent>
              </Select>
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
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader className="animate-spin size-4 mr-2" />
              Saqlanmoqda...
            </>
          ) : (
            "Saqlash"
          )}
        </Button>
      </form>
    </Form>
  );
}
