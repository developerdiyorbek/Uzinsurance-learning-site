import { Skeleton } from "@/components/ui/skeleton";

function TeacherTestItemSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
      <Skeleton className="h-8 w-8 shrink-0 rounded" />

      <Skeleton className="h-8 w-8 shrink-0 rounded" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <Skeleton className="h-4 w-48 mb-1" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-3 rounded" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherTestItemSkeleton;
