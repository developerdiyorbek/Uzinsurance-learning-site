import { Skeleton } from "@/components/ui/skeleton";

export default function TestLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-2/3" />
      <div className="space-y-3">
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    </div>
  );
}

