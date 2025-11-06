"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUploadInput from "@/components/shared/ImageUploadInput";
import { courseSchema } from "@/lib/validation";
import { Label } from "@/components/ui/label";
import customAxios from "@/configs/customAxios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { Loader } from "lucide-react";

type CourseFormValues = z.infer<typeof courseSchema>;

export default function CreateCourseForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      slug: "",
      image: undefined,
    },
  });

  const onSubmit = async (data: CourseFormValues) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("slug", data.slug);
      formData.append("image", data.image);

      await customAxios.post("teacher/courses", formData);

      toast.success("Kurs muvaffaqiyatli qo'shildi");
      form.reset();
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
                  placeholder="Kurs haqida qisqacha ma’lumot yozing..."
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <Label>Kurs rasmi</Label>
              <FormControl>
                <ImageUploadInput
                  onChange={(file) => {
                    field.onChange(file);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader className="animate-spin size-4" />}
          Saqlash
        </Button>
      </form>
    </Form>
  );
}
