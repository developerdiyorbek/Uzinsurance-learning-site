"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CourseDetailLoading() {
  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-0">
      {/* Hero Image Skeleton - Responsive */}
      <div className="relative h-48 sm:h-64 md:h-72 lg:h-96 w-full rounded-lg sm:rounded-xl overflow-hidden bg-muted">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Main Content Grid - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Main Content Skeleton - Full width on mobile, 2/3 on desktop */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex-shrink-0" />
                <Skeleton className="h-5 sm:h-6 w-28 sm:w-32" />
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="p-4 sm:p-6 space-y-3">
              <Skeleton className="h-3 sm:h-4 w-full" />
              <Skeleton className="h-3 sm:h-4 w-full" />
              <Skeleton className="h-3 sm:h-4 w-5/6" />
              <Skeleton className="h-3 sm:h-4 w-4/6" />
              <Skeleton className="h-3 sm:h-4 w-full" />
              <Skeleton className="h-3 sm:h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Skeleton - Full width on mobile, 1/3 on desktop */}
        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
          {/* Course Info Card Skeleton */}
          <Card className="shadow-sm lg:sticky lg:top-6">
            <CardHeader className="p-4 sm:p-6">
              <Skeleton className="h-5 sm:h-6 w-36 sm:w-40" />
            </CardHeader>
            <Separator />
            <CardContent className="space-y-0 p-4 sm:p-6">
              {/* Teacher Info Skeleton */}
              <div className="flex items-start gap-3 sm:gap-4 pb-3 sm:pb-4">
                <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-16 sm:w-20" />
                  <Skeleton className="h-3 sm:h-4 w-24 sm:w-32" />
                </div>
              </div>
              <Separator />

              {/* Date Skeleton */}
              <div className="flex items-start gap-3 sm:gap-4 py-3 sm:py-4">
                <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-20 sm:w-24" />
                  <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
                </div>
              </div>
              <Separator />

              {/* Lessons Count Skeleton */}
              <div className="flex items-start gap-3 sm:gap-4 py-3 sm:py-4">
                <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-16 sm:w-20" />
                  <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons Skeleton */}
          <Card className="shadow-sm">
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6 space-y-2 sm:space-y-3">
              <Skeleton className="h-10 sm:h-11 w-full rounded-md" />
              <Skeleton className="h-10 sm:h-11 w-full rounded-md" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
