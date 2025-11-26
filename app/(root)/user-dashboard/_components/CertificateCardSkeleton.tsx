"use client";

import { Skeleton } from "@/components/ui/skeleton";

function CertificateCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-2 pt-2 border-t">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export default CertificateCardSkeleton;

