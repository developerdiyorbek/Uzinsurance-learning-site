"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, FileQuestion } from "lucide-react";
import EmptyStateUI from "@/components/shared/EmptyStateUI";
import { useGetTeacherTestsByCourseSlug } from "@/hooks/useGetTeacherTestsByCourseSlug";
import { TeacherTestItem } from "./TeacherTestItem";
import TeacherTestItemSkeleton from "./TeacherTestItemSkeleton";
import Link from "next/link";
import { ITest } from "@/types";
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

export default function TeacherTestsManagement() {
  const { slug: course_slug } = useParams<{ slug: string }>();
  const queryClient = useQueryClient();

  const { tests, isLoading, course, testsCount } =
    useGetTeacherTestsByCourseSlug(course_slug);

  const [items, setItems] = useState<ITest[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { mutate: updateOrder, isPending: isUpdatingOrder } = useMutation({
    mutationKey: [QUERY_KEYS.teacherTestsByCourseSlug, course_slug],
    mutationFn: async (updates: { test_id: string; order: number }[]) => {
      await customAxios.put(`teacher/courses/${course_slug}/tests/reorder`, {
        updates,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.teacherTestsByCourseSlug, course_slug],
      });
      toast.success("Testlar tartibi muvaffaqiyatli yangilandi");
    },
  });

  useEffect(() => {
    if (tests && tests.length > 0) {
      setItems([...tests]);
    }
  }, [tests]);

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
          currentItems.map((test) => [test._id, test.order])
        );

        const updates = newItems
          .map((test, index) => ({
            test_id: test._id,
            order: index + 1,
          }))
          .filter((update) => {
            const originalOrder = originalOrderMap.get(update.test_id);
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

  const displayTests =
    items.length > 0 && items.length === (tests?.length || 0)
      ? items
      : tests || [];

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
            <h1 className="text-xl font-semibold">Testlar boshqaruvi</h1>
            <p className="text-sm text-muted-foreground">
              &quot;{course?.title}&quot; kursi uchun testlar
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isLoading && tests && (
            <Badge variant="secondary" className="text-xs font-medium">
              <FileQuestion className="size-3 mr-1" />
              {testsCount} test
            </Badge>
          )}
          <Link href={`/teacher-dashboard/my-courses/${course_slug}/tests/add`}>
            <Button size="sm" className="gap-1.5">
              <Plus className="size-3.5" />
              Test qo&apos;shish
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {isLoading && (
          <div className="grid gap-3">
            {[1, 2, 3].map((item) => (
              <TeacherTestItemSkeleton key={item} />
            ))}
          </div>
        )}

        {!isLoading && tests?.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-12">
              <EmptyStateUI
                hasSearch={false}
                title="Hozircha testlar yo'q"
                description="Kursga birinchi testni qo'shing"
              />
            </CardContent>
          </Card>
        )}

        {!isLoading && displayTests && displayTests.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={displayTests.map((test: ITest) => test._id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid gap-3">
                {displayTests.map((test: ITest, index: number) => (
                  <TeacherTestItem
                    key={test._id}
                    test={test}
                    course_slug={course_slug}
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
