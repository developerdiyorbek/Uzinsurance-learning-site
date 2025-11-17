"use client";

import LearnSidebar from "./LearnSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { useGetUserLessonsByCourseSlug } from "@/hooks/useGetUserLessonsByCourseSlug";
import { Progress } from "@/components/ui/progress";

interface LearnSidebarWrapperProps {
  currentLessonSlug: string | null;
  onLessonClick: (slug: string) => void;
}

export default function LearnSidebarWrapper({
  currentLessonSlug,
  onLessonClick,
}: LearnSidebarWrapperProps) {
  const params = useParams();
  const course_slug = params?.slug as string;
  const { course, progressPercentage, isLoading } =
    useGetUserLessonsByCourseSlug(course_slug);

  return (
    <aside className="hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 border-r bg-gradient-to-b from-background to-muted/20 overflow-hidden shadow-lg z-40">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-transparent">
          {isLoading ? (
            <Skeleton className="h-5 w-32 mb-2" />
          ) : (
            <h1 className="font-bold text-base text-foreground mb-3 line-clamp-2">
              {course?.title || "Kurs"}
            </h1>
          )}
          {isLoading ? (
            <Skeleton className="h-2 w-full mb-2" />
          ) : (
            <>
              <Progress value={progressPercentage} className="h-2 mb-2" />
              <p className="text-xs text-center text-muted-foreground">
                {progressPercentage}% tugatildi
              </p>
            </>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <LearnSidebar
            currentLessonSlug={currentLessonSlug}
            onLessonClick={onLessonClick}
          />
        </div>
      </div>
    </aside>
  );
}
