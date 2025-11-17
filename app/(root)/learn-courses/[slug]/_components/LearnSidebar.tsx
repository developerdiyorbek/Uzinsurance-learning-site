"use client";

import { useGetUserLessonsByCourseSlug } from "@/hooks/useGetUserLessonsByCourseSlug";
import { ILesson } from "@/types";
import { CheckCircle2, BookOpen, Video, Pause } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, textSlice } from "@/lib/utils";

interface LearnSidebarProps {
  currentLessonSlug?: string | null;
  onLessonClick?: (slug: string) => void;
}

export default function LearnSidebar({
  currentLessonSlug,
  onLessonClick,
}: LearnSidebarProps) {
  const params = useParams();
  const course_slug = params?.slug as string;

  const { lessons, isLoading, error } =
    useGetUserLessonsByCourseSlug(course_slug);

  if (isLoading) {
    return (
      <div className="space-y-1.5 p-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error || !lessons || lessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
          <BookOpen className="size-6 text-muted-foreground" />
        </div>
        <p className="text-xs font-medium text-foreground mb-1">
          Darslar yuklanmadi
        </p>
        <p className="text-[10px] text-muted-foreground">
          Qayta urinib ko&apos;ring
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto p-2">
        {lessons.map((lesson: ILesson, index: number) => {
          const isCompleted = lesson.is_completed;
          const isCurrent = lesson.slug === currentLessonSlug;

          return (
            <Link
              key={lesson._id}
              href={`/learn-courses/${course_slug}/${lesson.slug}`}
              onClick={(e) => {
                if (onLessonClick) {
                  e.preventDefault();
                  onLessonClick(lesson.slug);
                }
              }}
            >
              <div
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer",
                  "hover:bg-green-50/50 dark:hover:bg-green-950/20",
                  isCurrent && "bg-green-50 dark:bg-green-950/30"
                )}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <div className="size-6 rounded-full bg-green-600 dark:bg-green-500 flex items-center justify-center">
                      <CheckCircle2
                        className="size-3.5 text-white"
                        strokeWidth={2.5}
                      />
                    </div>
                  ) : isCurrent ? (
                    <div className="size-6 rounded-full bg-green-600 dark:bg-green-500 flex items-center justify-center">
                      <Pause
                        className="size-3 text-white"
                        fill="currentColor"
                      />
                    </div>
                  ) : (
                    <div className="size-6 rounded-full bg-gray-700 dark:bg-gray-600 flex items-center justify-center group-hover:bg-green-600 dark:group-hover:bg-green-500 transition-colors">
                      <Video
                        className="size-3.5 text-white"
                        fill="currentColor"
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground leading-tight">
                    #{index + 1}. {textSlice(lesson.title, 40)}
                  </p>
                </div>

                {isCurrent && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-green-600 dark:bg-green-500 rounded-l-full" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
