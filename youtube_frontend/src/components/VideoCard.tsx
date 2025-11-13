"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNowStrict } from "../lib/utils";
import type { Video } from "../lib/types";

/**
 * PUBLIC_INTERFACE
 * VideoCard
 * This component displays a single video item with thumbnail, title, channel, views, and published time.
 */
export default function VideoCard({ video }: { video: Video }) {
  /** Render the channel avatar if provided or a fallback */
  const renderAvatar = () => {
    // No avatar URL in current Video type; render initials
    const initials =
      (video.channelName?.match(/\b\w/g) || [])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "CH";
    return (
      <div className="w-9 h-9 rounded-full bg-blue-600/10 text-blue-700 grid place-items-center text-xs font-semibold">
        {initials}
      </div>
    );
  };

  const href = `/watch/${video.id}`;

  return (
    <article className="group rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
      <Link href={href} className="block relative aspect-video bg-gray-100">
        {/* Thumbnail */}
        {video.thumbnailUrl ? (
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.01] transition-transform duration-200"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-gray-50" />
        )}

        {/* Duration badge */}
        {video.duration && (
          <span className="absolute bottom-2 right-2 text-xs font-medium px-1.5 py-0.5 rounded bg-black/70 text-white">
            {video.duration}
          </span>
        )}
      </Link>

      <div className="p-3 flex gap-3">
        <div className="shrink-0">{renderAvatar()}</div>
        <div className="min-w-0">
          <Link href={href} className="block">
            <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 hover:text-blue-700 transition-colors">
              {video.title}
            </h3>
          </Link>
          <div className="mt-1 text-xs text-gray-600">
            <p className="truncate">{video.channelName}</p>
            <p className="mt-0.5">
              {formatViews(video.views)} views
              {video.publishedAt ? (
                <>
                  {" • "}
                  {formatDistanceToNowStrict(new Date(video.publishedAt))} ago
                </>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function formatViews(views?: number | null) {
  if (views == null) return "0";
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  return `${views}`;
}
