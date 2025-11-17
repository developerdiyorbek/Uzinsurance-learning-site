"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetUserLessonsByCourseSlug } from "@/hooks/useGetUserLessonsByCourseSlug";
import AdvancedErrorComponent from "@/components/shared/AdvancedErrorComponent";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const course_slug = params?.slug as string;
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    lessons,
    completedLessons,
    isLoading: lessonsLoading,
    error: lessonsError,
    refetch: refetchLessons,
  } = useGetUserLessonsByCourseSlug(course_slug);

  useEffect(() => {
    if (lessons.length > 0 && !isRedirecting) {
      setIsRedirecting(true);
      const firstIncomplete = lessons.find((l) => !l.is_completed);
      const lessonToRedirect = firstIncomplete || lessons[0];
      if (lessonToRedirect) {
        router.replace(
          `/learn-courses/${course_slug}/${lessonToRedirect.slug}`
        );
      }
    }
  }, [lessons, completedLessons, course_slug, router, isRedirecting]);

  if (lessonsLoading || isRedirecting) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-3/4" />
        <Card>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-64 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (lessonsError) {
    return (
      <div className="space-y-6">
        <AdvancedErrorComponent onRetry={() => refetchLessons()} />
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="py-16">
        <div className="text-center space-y-4">
          <Loader2 className="mx-auto size-12 text-primary animate-spin" />
          <p className="text-muted-foreground">
            Darsga yo&apos;naltirilmoqda...
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
