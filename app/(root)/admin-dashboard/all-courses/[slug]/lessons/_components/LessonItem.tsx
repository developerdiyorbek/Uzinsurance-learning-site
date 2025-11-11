"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ILesson } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import customAxios from "@/configs/customAxios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import AlertModal from "@/components/shared/AlertModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import Link from "next/link";

interface LessonItemProps {
  lesson: ILesson;
  course_slug: string;
}

export function LessonItem({ lesson, course_slug }: LessonItemProps) {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutate: deleteLesson, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.lessonsByCourseSlug, course_slug],
    mutationFn: async (lesson_slug: string) => {
      const { data } = await customAxios.delete(`admin/lessons/${lesson_slug}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.lessonsByCourseSlug, course_slug],
      });
      toast.success("Dars muvaffaqiyatli o&apos;chirildi");
      setIsDeleteModalOpen(false);
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Darsni o'chirishda xatolik");
    },
  });

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                #{lesson.order}
              </span>
              <CardTitle className="text-base">{lesson.title}</CardTitle>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin-dashboard/all-courses/${course_slug}/lessons/${lesson.slug}`}
            >
              <Button variant="ghost" size="sm">
                <Pencil className="size-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => deleteLesson(lesson.slug)}
        title="Darsni o'chirish"
        description={`"${lesson.title}" darsini o&apos;chirishni tasdiqlaysizmi? Bu amalni qaytarib bo&apos;lmaydi.`}
        btnContinue="O'chirish"
        btnCancel="Bekor qilish"
        loading={isPending}
      />
    </>
  );
}
