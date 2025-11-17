"use client";

import type { ICourse } from "@/types";
import Link from "next/link";
import CustomImage from "@/components/shared/CustomImage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  course: ICourse;
  href: string;
}

function UserCourseCard({ course, href }: Props) {
  const isCompleted = course.progress_percentage === 100;

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-lg border bg-white dark:bg-card transition-all duration-200 hover:shadow-lg",
        isCompleted && "ring-2 ring-green-500/20"
      )}
    >
      <div className="relative h-56 w-full overflow-hidden bg-muted flex items-center justify-center">
        <CustomImage
          src={course.image}
          alt={course.title}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {isCompleted && (
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
          {isCompleted && (
            <CheckCircle2 className="size-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span
              className={cn(
                "font-medium",
                isCompleted
                  ? "text-green-600 dark:text-green-400"
                  : "text-muted-foreground"
              )}
            >
              {isCompleted
                ? "Kurs tugatildi!"
                : `${course.progress_percentage}% tugatildi`}
            </span>
          </div>
          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-300 rounded-full",
                isCompleted ? "bg-green-600 dark:bg-green-500" : "bg-primary"
              )}
              style={{ width: `${course.progress_percentage}%` }}
            />
          </div>
        </div>

        <Link href={href}>
          <Button
            className={cn(
              "w-full rounded-md",
              isCompleted &&
                "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
            )}
            variant={isCompleted ? "default" : "default"}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="size-4 mr-2" />
                Qayta ko&apos;rish
              </>
            ) : (
              "Davom etish"
            )}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default UserCourseCard;
