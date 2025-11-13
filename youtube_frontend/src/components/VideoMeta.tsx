"use client";

import React, { useMemo, useState } from "react";
import { cn } from "../lib/utils";

type VideoMetaProps = {
  title: string;
  channelName: string;
  views: number;
  publishedAt?: string;
  description?: string;
  className?: string;
};

/**
 * PUBLIC_INTERFACE
 * VideoMeta displays the video title, channel info, views, and local interactive actions.
 */
export default function VideoMeta({
  title,
  channelName,
  views,
  publishedAt,
  description,
  className,
}: VideoMetaProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);

  const viewsLabel = useMemo(() => {
    const v = views || 0;
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M views`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K views`;
    return `${v} views`;
  }, [views]);

  const dateLabel = useMemo(() => {
    if (!publishedAt) return undefined;
    const d = new Date(publishedAt);
    return d.toLocaleDateString();
  }, [publishedAt]);

  const toggleLike = () => {
    setLiked((l) => {
      if (!l) setDisliked(false);
      return !l;
    });
  };

  const toggleDislike = () => {
    setDisliked((d) => {
      if (!d) setLiked(false);
      return !d;
    });
  };

  return (
    <div className={cn("w-full", className)}>
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900">{title}</h1>
      <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">{channelName}</span>
            <span className="text-xs text-gray-500">
              {viewsLabel}
              {dateLabel ? ` • ${dateLabel}` : ""}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-pressed={liked}
            onClick={toggleLike}
            className={cn(
              "px-3 py-2 rounded-md text-sm border transition",
              liked
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            )}
          >
            👍 Like
          </button>
          <button
            aria-pressed={disliked}
            onClick={toggleDislike}
            className={cn(
              "px-3 py-2 rounded-md text-sm border transition",
              disliked
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            )}
          >
            👎 Dislike
          </button>
          <button
            aria-pressed={saved}
            onClick={() => setSaved((s) => !s)}
            className={cn(
              "px-3 py-2 rounded-md text-sm border transition",
              saved
                ? "bg-amber-50 border-amber-200 text-amber-700"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            )}
          >
            ➕ Save
          </button>
          <button
            className="px-3 py-2 rounded-md text-sm border bg-white border-gray-200 text-gray-700 hover:bg-gray-50 transition"
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
          >
            🔗 Share
          </button>
        </div>
      </div>
      {description ? (
        <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-700 border border-gray-100">
          {description}
        </div>
      ) : null}
    </div>
  );
}
