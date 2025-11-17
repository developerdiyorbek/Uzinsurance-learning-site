"use client";

import { useParams } from "next/navigation";
import { useGetUserLessonsByCourseSlug } from "@/hooks/useGetUserLessonsByCourseSlug";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export default function LearnFooter() {
  const params = useParams();
  const course_slug = params?.slug as string;

  const { isLoading, progressPercentage } =
    useGetUserLessonsByCourseSlug(course_slug);

  if (isLoading) {
    return (
      <footer className="sticky bottom-0 z-40 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="py-3">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="sticky bottom-0 z-40 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  Progress
                </span>
                <span className="text-xs font-bold text-primary">
                  {progressPercentage}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-1.5" />
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {progressPercentage} darslar tugatildi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
