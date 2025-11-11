import { Skeleton } from "@/components/ui/skeleton";

function LessonItemSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-lg border-l-4 border-l-transparent bg-card p-4 shadow-sm">
      {/* Lesson Number - Left Side */}
      <div className="flex flex-col items-center justify-center shrink-0">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="mt-1.5 h-8 w-0.5" />
      </div>

      {/* Content - Middle */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-16 rounded-full" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          {/* Actions - Right Side */}
          <div className="flex items-center gap-1 shrink-0">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonItemSkeleton;
