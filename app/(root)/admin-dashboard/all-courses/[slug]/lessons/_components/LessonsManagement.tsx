"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import EmptyStateUI from "@/components/shared/EmptyStateUI";
import { useGetLessonsByCourseSlug } from "@/hooks/useGetLessonsByCourseSlug";
import { LessonItem } from "./LessonItem";
import LessonItemSkeleton from "./LessonItemSkeleton";
import PageHeader from "@/components/shared/PageHeader";
import Link from "next/link";
import { ILesson } from "@/types";
import { useParams } from "next/navigation";

export default function LessonsManagement() {
  const { slug: course_slug } = useParams<{ slug: string }>();
  const { lessons, isLoading, course } = useGetLessonsByCourseSlug(course_slug);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Link href={`/admin-dashboard/all-courses/${course_slug}`}>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
        <PageHeader
          title="Darslar boshqaruvi"
          description={`"${course?.title}" kursi uchun darslar qo'shish va tahrirlash`}
          className="mb-0"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Darslar</h3>
          <p className="text-sm text-muted-foreground">
            Kursga darslar qo&apos;shing va boshqaring.
          </p>
        </div>
        <Link href={`/admin-dashboard/all-courses/${course_slug}/lessons/add`}>
          <Button size="sm">
            <Plus className="size-4 mr-2" />
            Dars qo&apos;shish
          </Button>
        </Link>
      </div>

      {isLoading && (
        <div className="grid gap-4">
          {[1, 2, 3].map((item) => (
            <LessonItemSkeleton key={item} />
          ))}
        </div>
      )}

      {!isLoading && lessons?.length === 0 && (
        <EmptyStateUI
          hasSearch={false}
          title="Hozircha darslar yo'q"
          description="Kursga birinchi darsni qo'shing"
        />
      )}

      {!isLoading && lessons?.length > 0 && (
        <div className="grid gap-4">
          {lessons?.map((lesson: ILesson) => (
            <LessonItem
              key={lesson._id}
              lesson={lesson}
              course_slug={course.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
