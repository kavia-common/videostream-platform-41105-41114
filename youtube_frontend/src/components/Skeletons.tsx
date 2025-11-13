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

/** PUBLIC_INTERFACE */
export function SkeletonGrid({ count = 12 }: { count?: number }): React.ReactElement {
  /** This is a public function. */
  return (
    <div
      className="
        grid gap-4
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-lg overflow-hidden bg-white border border-gray-100"
        >
          <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-gray-50 animate-pulse" />
          <div className="p-3 flex gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
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
