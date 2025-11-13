import React from "react";

/**
 * Skeleton placeholders for loading states.
 * Includes:
 *  - SkeletonCard: Thumbnail + title lines
 *  - SkeletonGrid: Responsive grid of cards
 *  - SkeletonPlayer: Large video player placeholder with metadata lines
 *
 * PUBLIC_INTERFACE
 */
export function SkeletonCard(): React.ReactElement {
  /** This is a public function. */
  return (
    <div className="animate-pulse">
      <div className="w-full aspect-video rounded-lg bg-gray-200" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-3 w-1/2 rounded bg-gray-200" />
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function SkeletonGrid({ count = 12 }: { count?: number }): React.ReactElement {
  /** This is a public function. */
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
export function SkeletonPlayer(): React.ReactElement {
  /** This is a public function. */
  return (
    <div className="animate-pulse">
      <div className="w-full aspect-video rounded-lg bg-gray-200" />
      <div className="mt-4 space-y-3">
        <div className="h-5 w-2/3 rounded bg-gray-200" />
        <div className="h-4 w-1/3 rounded bg-gray-200" />
        <div className="h-16 w-full rounded bg-gray-100" />
      </div>
    </div>
  );
}
