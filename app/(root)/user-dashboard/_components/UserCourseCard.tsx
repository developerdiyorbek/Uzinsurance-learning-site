"use client";

import type { ICourse } from "@/types";
import Link from "next/link";
import CustomImage from "@/components/shared/CustomImage";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  course: ICourse;
}

function UserCourseCard({ course }: Props) {
  return (
    <Link
      href={`/user-dashboard/${course.slug}`}
      className={cn(
        "group block overflow-hidden rounded-lg border bg-white dark:bg-card transition-all duration-200 hover:shadow-lg cursor-pointer",
        course.course_completed && "ring-2 ring-green-500/20"
      )}
    >
      <div className="relative h-56 w-full overflow-hidden bg-muted flex items-center justify-center">
        <CustomImage
          src={course.image}
          alt={course.title}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {course.course_completed && (
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-green-600 dark:bg-green-500 text-white border-0 shadow-lg"
            >
              <Trophy className="size-3 mr-1" />
              Tugatilgan
            </Badge>
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-lg font-semibold text-foreground flex-1">
            {course.title}
          </h3>
          {course.course_completed && (
            <CheckCircle2 className="size-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span
              className={cn(
                "font-medium",
                course.course_completed
                  ? "text-green-600 dark:text-green-400"
                  : "text-muted-foreground"
              )}
            >
              {course.course_completed
                ? "Kurs tugatildi!"
                : `${course.progress_percentage}% tugatildi`}
            </span>
          </div>
          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-300 rounded-full",
                course.course_completed
                  ? "bg-green-600 dark:bg-green-500"
                  : "bg-primary"
              )}
              style={{ width: `${course.progress_percentage}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UserCourseCard;
