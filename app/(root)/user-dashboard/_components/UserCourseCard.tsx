"use client";

import type { ICourse } from "@/types";
import Link from "next/link";
import CustomImage from "@/components/shared/CustomImage";
import { Button } from "@/components/ui/button";

interface Props {
  course: ICourse;
  href: string;
}

function UserCourseCard({ course, href }: Props) {
  const progress =
    ((course?.completedLessons || 0) / (course?.totalLessons || 0)) * 100 || 0;

  return (
    <div className="group overflow-hidden rounded-lg border bg-white dark:bg-card transition-all duration-200 hover:shadow-lg">
      <div className="relative h-56 w-full overflow-hidden bg-muted flex items-center justify-center">
        <CustomImage
          src={course.image}
          alt={course.title}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5 space-y-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-foreground">
          {course.title}
        </h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">
              {progress}% tugatildi
            </span>
          </div>
          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Link href={href}>
          <Button className="w-full rounded-md" variant="default">
            Davom etish
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default UserCourseCard;
