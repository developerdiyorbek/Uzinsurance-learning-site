import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CourseActionsSkeleton() {
  return (
    <>
      <div className="mb-4 space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      <Card className="mb-5">
        <CardHeader>
          <div className="flex items-start gap-4">
            <Skeleton className="w-32 h-32 rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <Skeleton className="h-7 w-64" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-56" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-24 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-[300px]" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>

            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default CourseActionsSkeleton;
