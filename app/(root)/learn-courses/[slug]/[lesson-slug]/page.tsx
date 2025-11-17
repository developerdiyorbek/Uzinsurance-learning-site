"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetUserLessonsByCourseSlug } from "@/hooks/useGetUserLessonsByCourseSlug";
import { useGetUserLessonBySlug } from "@/hooks/useGetUserLessonBySlug";
import { useCompleteLesson } from "@/hooks/useCompleteLesson";
import { useTimer } from "@/hooks/useTimer";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader,
  Trophy,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import parse from "html-react-parser";
import LessonLoading from "./_components/LessonLoading";
import LessonError from "./_components/LessonError";
import LessonNotFound from "./_components/LessonNotFound";
import LessonLocked from "./_components/LessonLocked";

export default function LearnLessonPage() {
  const params = useParams();
  const router = useRouter();
  const course_slug = params?.slug as string;
  const lesson_slug = (params?.["lesson-slug"] || params?.lessonSlug) as string;

  const {
    lessons,
    isLoading: lessonsLoading,
    error: lessonsError,
    refetch: refetchLessons,
    progressPercentage,
  } = useGetUserLessonsByCourseSlug(course_slug);

  const {
    lesson,
    isCompleted,
    nextLessonSlug: currentNextLesson,
    previousLessonSlug,
    isLoading: lessonLoading,
    error: lessonError,
    refetch: refetchLesson,
  } = useGetUserLessonBySlug(lesson_slug, course_slug);

  const completeLessonMutation = useCompleteLesson();

  const currentLessonIndex = lessons.findIndex((l) => l.slug === lesson_slug);

  const isLocked =
    currentLessonIndex > 0 && !lessons[currentLessonIndex - 1]?.is_completed;
  const lockedPreviousLessonSlug =
    currentLessonIndex > 0 ? lessons[currentLessonIndex - 1]?.slug : undefined;

  const {
    seconds: timerSeconds,
    reset: resetTimer,
    start: startTimer,
    formatTimer,
  } = useTimer({
    initialSeconds: 60,
    autoStart: false,
  });

  useEffect(() => {
    if (isCompleted) {
      resetTimer();
    } else {
      resetTimer();
      startTimer();
    }
  }, [lesson_slug, isCompleted, resetTimer, startTimer]);

  const handleCompleteLesson = async () => {
    if (!lesson_slug || !course_slug) return;

    try {
      const result = await completeLessonMutation.mutateAsync({
        course_slug,
        lesson_slug,
      });

      const nextSlug = result.next_lesson_slug || currentNextLesson;
      if (nextSlug) {
        router.push(`/learn-courses/${course_slug}/${nextSlug}`);
      } else {
        refetchLesson();
        refetchLessons();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextLesson = () => {
    if (currentNextLesson) {
      router.push(`/learn-courses/${course_slug}/${currentNextLesson}`);
    }
  };

  const handlePreviousLesson = () => {
    if (previousLessonSlug) {
      router.push(`/learn-courses/${course_slug}/${previousLessonSlug}`);
    }
  };

  if (lessonsLoading || lessonLoading) {
    return <LessonLoading />;
  }

  if (lessonsError || lessonError) {
    return (
      <LessonError
        onRetry={() => {
          refetchLessons();
          refetchLesson();
        }}
      />
    );
  }

  if (!lesson) {
    return <LessonNotFound courseSlug={course_slug} />;
  }

  if (isLocked) {
    return (
      <LessonLocked
        courseSlug={course_slug}
        previousLessonSlug={lockedPreviousLessonSlug}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className="px-3 py-0.5 text-xs font-semibold bg-primary/10 text-primary border-primary/20"
            >
              Dars {currentLessonIndex + 1} / {lessons.length}
            </Badge>
            {isCompleted && (
              <Badge
                variant="secondary"
                className="px-3 py-0.5 text-xs font-semibold bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
              >
                <CheckCircle2 className="size-3 mr-1" />
                Tugatilgan
              </Badge>
            )}
            {progressPercentage === 100 && (
              <Badge
                variant="secondary"
                className="px-3 py-0.5 text-xs font-semibold bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
              >
                <Trophy className="size-3 mr-1" />
                Kurs tugatildi!
              </Badge>
            )}
          </div>

          <Button
            onClick={handleCompleteLesson}
            disabled={
              completeLessonMutation.isPending ||
              isCompleted ||
              timerSeconds > 0
            }
            size="sm"
            className={cn(
              "flex items-center gap-1.5 font-semibold",
              isCompleted
                ? "bg-green-600 hover:bg-green-700 text-white"
                : timerSeconds > 0
                ? "bg-primary/50 hover:bg-primary/50 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90"
            )}
          >
            {completeLessonMutation.isPending ? (
              <>
                <Loader className="size-3.5 animate-spin" />
                <span>Tugatilmoqda...</span>
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle2 className="size-3.5" />
                <span>Tugatilgan</span>
              </>
            ) : timerSeconds > 0 ? (
              <>
                <Clock className="size-3.5" />
                <span>Kuting: {formatTimer(timerSeconds)}</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="size-3.5" />
                <span>Darsni tugatish</span>
              </>
            )}
          </Button>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold leading-tight text-foreground">
          {lesson.title}
        </h1>
      </div>

      <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:leading-relaxed prose-p:text-foreground/90 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md prose-img:my-4 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-strong:text-foreground prose-code:text-primary prose-pre:bg-muted prose-pre:border prose-pre:text-sm prose-blockquote:border-l-2 prose-blockquote:border-primary prose-blockquote:pl-3 prose-blockquote:italic prose-blockquote:text-sm">
        {parse(lesson?.content || "")}
      </div>

      <div className="flex items-center justify-between gap-3 pt-4 border-t">
        <Button
          variant="outline"
          onClick={handlePreviousLesson}
          disabled={!previousLessonSlug}
          size="sm"
          className="flex items-center gap-1.5"
        >
          <ArrowLeft className="size-4" />
          <span>Oldingi dars</span>
        </Button>

        {currentNextLesson && (
          <Button
            onClick={handleNextLesson}
            size="sm"
            className="flex items-center gap-1.5"
          >
            <span>Keyingi dars</span>
            <ArrowRight className="size-4" />
          </Button>
        )}
        {!currentNextLesson && progressPercentage === 100 && (
          <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-sm">
            <Trophy className="size-4" />
            <span className="font-semibold">Barcha darslar tugatildi!</span>
          </div>
        )}
      </div>
    </div>
  );
}
