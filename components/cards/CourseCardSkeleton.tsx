"use client";

import { Calendar } from "lucide-react";

interface Props {
  show_creator?: boolean;
}

function CourseCardSkeleton({ show_creator }: Props) {
  return (
    <div className="animate-pulse group overflow-hidden rounded-lg border bg-card">
      <div className="relative h-52 w-full bg-muted">
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700" />
      </div>

      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>

        {show_creator && (
          <div className="flex items-center gap-2 pt-2 border-t">
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCardSkeleton;
