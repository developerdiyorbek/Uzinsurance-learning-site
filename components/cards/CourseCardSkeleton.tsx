"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CourseCardSkeleton() {
  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="space-y-4 p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>

        <div className="space-y-3 px-3 pb-4">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-1/2" />

          <Skeleton className="h-[1px] w-full" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCardSkeleton;
