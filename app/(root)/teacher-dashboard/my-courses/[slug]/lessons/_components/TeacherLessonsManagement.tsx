"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, BookOpen } from "lucide-react";
import EmptyStateUI from "@/components/shared/EmptyStateUI";
import { useGetTeacherLessonsByCourseSlug } from "@/hooks/useGetTeacherLessonsByCourseSlug";
import { TeacherLessonItem } from "./TeacherLessonItem";
import LessonItemSkeleton from "@/app/(root)/admin-dashboard/all-courses/[slug]/lessons/_components/LessonItemSkeleton";
import Link from "next/link";
import { ILesson } from "@/types";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import customAxios from "@/configs/customAxios";
import { toast } from "react-toastify";

export default function TeacherLessonsManagement() {
  const { slug: course_slug } = useParams<{ slug: string }>();
  const { lessons, isLoading, course, lessonsCount } =
    useGetTeacherLessonsByCourseSlug(course_slug);
  const queryClient = useQueryClient();
  const [items, setItems] = useState<ILesson[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { mutate: updateOrder, isPending: isUpdatingOrder } = useMutation({
    mutationKey: [QUERY_KEYS.teacherLessonsByCourseSlug, course_slug],
    mutationFn: async (updates: { slug: string; order: number }[]) => {
      await customAxios.put(`teacher/lessons/${course_slug}/reorder`, {
        updates,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.teacherLessonsByCourseSlug, course_slug],
      });
      toast.success("Darslar tartibi muvaffaqiyatli yangilandi");
    },
  });

  useEffect(() => {
    if (lessons && lessons.length > 0) {
      setItems([...lessons]);
    }
  }, [lessons]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex(
          (item) => item._id === active.id
        );
        const newIndex = currentItems.findIndex((item) => item._id === over.id);

        if (oldIndex === -1 || newIndex === -1) {
          return currentItems;
        }

        const newItems = arrayMove(currentItems, oldIndex, newIndex);

        const originalOrderMap = new Map(
          currentItems.map((lesson) => [lesson.slug, lesson.order])
        );

        const updates = newItems
          .map((lesson, index) => ({
            slug: lesson.slug,
            order: index + 1,
          }))
          .filter((update) => {
            const originalOrder = originalOrderMap.get(update.slug);
            return (
              originalOrder !== undefined && originalOrder !== update.order
            );
          });

        if (updates.length > 0) {
          updateOrder(updates);
        }

        return newItems;
      });
    }
  };

  const displayLessons =
    items.length > 0 && items.length === (lessons?.length || 0)
      ? items
      : lessons || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href={`/teacher-dashboard/my-courses/${course_slug}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold">Darslar boshqaruvi</h1>
            <p className="text-sm text-muted-foreground">
              &quot;{course?.title}&quot; kursi uchun darslar
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isLoading && lessons && (
            <Badge variant="secondary" className="text-xs font-medium">
              <BookOpen className="size-3 mr-1" />
              {lessonsCount} dars
            </Badge>
          )}
          <Link
            href={`/teacher-dashboard/my-courses/${course_slug}/lessons/add`}
          >
            <Button size="sm" className="gap-1.5">
              <Plus className="size-3.5" />
              Dars qo&apos;shish
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {isLoading && (
          <div className="grid gap-3">
            {[1, 2, 3].map((item) => (
              <LessonItemSkeleton key={item} />
            ))}
          </div>
        )}

        {!isLoading && lessons?.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-12">
              <EmptyStateUI
                hasSearch={false}
                title="Hozircha darslar yo'q"
                description="Kursga birinchi darsni qo'shing"
              />
            </CardContent>
          </Card>
        )}

        {!isLoading && displayLessons && displayLessons.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={displayLessons.map((lesson: ILesson) => lesson._id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid gap-3">
                {displayLessons.map((lesson: ILesson, index: number) => (
                  <TeacherLessonItem
                    key={lesson._id}
                    lesson={lesson}
                    course_slug={course.slug}
                    index={index}
                    isUpdatingOrder={isUpdatingOrder}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
