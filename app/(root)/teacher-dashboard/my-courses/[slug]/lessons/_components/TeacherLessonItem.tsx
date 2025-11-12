"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ILesson } from "@/types";
import { Pencil, Trash2, Calendar, GripVertical } from "lucide-react";
import customAxios from "@/configs/customAxios";
import { toast } from "react-toastify";
import AlertModal from "@/components/shared/AlertModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import Link from "next/link";
import { format } from "date-fns";
import { textSlice } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TeacherLessonItemProps {
  lesson: ILesson;
  course_slug: string;
  index: number;
  isUpdatingOrder?: boolean;
}

export function TeacherLessonItem({
  lesson,
  course_slug,
  index,
  isUpdatingOrder,
}: TeacherLessonItemProps) {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lesson._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const { mutate: deleteLesson, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.teacherLessonsByCourseSlug, course_slug],
    mutationFn: async (lesson_slug: string) => {
      const { data } = await customAxios.delete(
        `teacher/lessons/${lesson_slug}/${course_slug}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.teacherLessonsByCourseSlug, course_slug],
      });
      toast.success("Dars muvaffaqiyatli o'chirildi");
      setIsDeleteModalOpen(false);
    },
  });

  const lessonNumber = index + 1;

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="flex items-center gap-3 rounded-lg border bg-card p-4 group dark:border-border/50 dark:bg-card/50 dark:hover:bg-card/80 transition-colors"
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-grab active:cursor-grabbing hover:bg-muted shrink-0 dark:hover:bg-muted/80"
          title="Tartibni o'zgartirish"
          {...attributes}
          {...listeners}
          disabled={isUpdatingOrder}
        >
          <GripVertical className="size-4 text-muted-foreground dark:text-muted-foreground/80" />
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground text-sm font-medium transition-colors dark:bg-primary/20 dark:group-hover:bg-primary dark:group-hover:text-primary-foreground">
          {lessonNumber}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <Link
                href={`/teacher-dashboard/my-courses/${course_slug}/lessons/${lesson.slug}`}
                className="block"
              >
                <h3 className="text-sm font-medium text-foreground line-clamp-1 mb-1 group-hover:text-primary transition-colors dark:text-foreground dark:group-hover:text-primary">
                  {textSlice(lesson.title, 40)}
                </h3>
              </Link>
              <div className="flex items-center gap-3 text-xs text-muted-foreground dark:text-muted-foreground/70">
                <div className="flex items-center gap-1">
                  <Calendar className="size-3 dark:text-muted-foreground/60" />
                  <span>
                    {format(new Date(lesson.createdAt), "dd MMM, yyyy")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <Link
                href={`/teacher-dashboard/my-courses/${course_slug}/lessons/${lesson.slug}`}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 dark:hover:bg-muted/80"
                  title="Tahrirlash"
                >
                  <Pencil className="size-4 dark:text-foreground/80" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20 dark:hover:text-destructive"
                title="O'chirish"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <Trash2 className="size-4 text-destructive dark:text-destructive/90" />
              </Button>
            </div>
          </div>
        </div>
      </div>

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

