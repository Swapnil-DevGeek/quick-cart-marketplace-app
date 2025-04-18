
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="h-full rounded-md overflow-hidden border animate-pulse">
      <div className="pt-[100%] relative bg-muted">
        <Skeleton className="absolute inset-0" />
      </div>
      <div className="p-4">
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-5 w-3/4 mb-3" />
        <Skeleton className="h-4 w-1/4 mb-4" />
        <Skeleton className="h-6 w-2/5 mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export function OrderTrackingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-7 w-40 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-8 w-32 rounded-full" />
      </div>

      <div className="rounded-md border overflow-hidden">
        <Skeleton className="h-60 w-full" />
        <div className="p-6 space-y-8">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
