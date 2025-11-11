"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, BookOpen } from "lucide-react";
import EmptyStateUI from "@/components/shared/EmptyStateUI";
import { useGetLessonsByCourseSlug } from "@/hooks/useGetLessonsByCourseSlug";
import { LessonItem } from "./LessonItem";
import LessonItemSkeleton from "./LessonItemSkeleton";
import Link from "next/link";
import { ILesson } from "@/types";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LessonsManagement() {
  const { slug: course_slug } = useParams<{ slug: string }>();
  const { lessons, isLoading, course } = useGetLessonsByCourseSlug(course_slug);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href={`/admin-dashboard/all-courses/${course_slug}`}>
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
              {lessons.length} {lessons.length === 1 ? "dars" : "dars"}
            </Badge>
          )}
          <Link
            href={`/admin-dashboard/all-courses/${course_slug}/lessons/add`}
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

        {!isLoading && lessons && lessons.length > 0 && (
          <div className="grid gap-3">
            {lessons.map((lesson: ILesson, index: number) => (
              <LessonItem
                key={lesson._id}
                lesson={lesson}
                course_slug={course.slug}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
