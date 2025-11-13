import Link from "next/link";
import React from "react";
import { type Video } from "../lib/types";
import { cn } from "../lib/utils";

type SidebarRecommendationsProps = {
  videos: Video[];
  currentId?: string;
  className?: string;
};

/**
 * PUBLIC_INTERFACE
 * SidebarRecommendations displays a compact list of recommended videos with thumbnails and metadata.
 */
export default function SidebarRecommendations({
  videos,
  currentId,
  className,
}: SidebarRecommendationsProps) {
  return (
    <aside className={cn("w-full space-y-3", className)}>
      {videos?.filter(v => v.id !== currentId).map((video) => {
        const title = video.title || "Untitled video";
        const thumb = video.thumbnailUrl || "/placeholder-thumb.jpg";
        return (
          <Link
            key={video.id}
            href={`/watch/${video.id}`}
            className="group flex gap-3 rounded-lg border border-gray-100 bg-white hover:bg-gray-50 transition p-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
            aria-label={`Watch ${title}`}
            title={title}
          >
            <div className="relative h-20 w-36 shrink-0 overflow-hidden rounded-md bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={title}
                src={thumb}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="line-clamp-2 text-sm font-medium text-gray-900">{title}</div>
              {video.channelName ? (
                <div className="mt-1 text-xs text-gray-600">{video.channelName}</div>
              ) : null}
              <div className="text-xs text-gray-500">
                {formatViews(video.views)} {video.publishedAt ? "• " + formatDate(video.publishedAt) : ""}
              </div>
            </div>
          </Link>
        );
      })}
    </aside>
  );
}

function formatViews(v?: number) {
  const n = v || 0;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
  return `${n} views`;
}
function formatDate(publishedAt?: string) {
  if (!publishedAt) return "";
  const d = new Date(publishedAt);
  return d.toLocaleDateString();
}
