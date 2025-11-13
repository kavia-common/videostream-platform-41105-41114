"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

export type VideoSource = {
  src: string;
  type?: string;
};

type VideoPlayerProps = {
  sources: VideoSource[];
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
};

/**
 * PUBLIC_INTERFACE
 * VideoPlayer renders an HTML5 video element with multiple sources, poster image,
 * and graceful error fallback when the media cannot be loaded.
 */
export default function VideoPlayer({
  sources,
  poster,
  className,
  autoPlay = false,
  controls = true,
  muted = false,
}: VideoPlayerProps) {
  /** This component renders an HTML5 video with multiple <source> elements.
   * It displays a friendly fallback when playback fails.
   */
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => setIsReady(true);
    const onError = () => {
      setError("We couldn't load this video. Please try again later.");
    };

    v.addEventListener("loadeddata", onLoaded);
    v.addEventListener("error", onError);

    return () => {
      v.removeEventListener("loadeddata", onLoaded);
      v.removeEventListener("error", onError);
    };
  }, []);

  if (!sources || sources.length === 0) {
    return (
      <div className={cn("aspect-video w-full bg-gray-100 rounded-lg flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50", className)}>
        <p className="text-sm text-gray-600">No video source available</p>
      </div>
    );
  }

  return (
    <div className={cn("w-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50", className)}>
      <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200">
        {!error ? (
          <video
            ref={videoRef}
            className={cn("h-full w-full object-contain bg-black")}
            poster={poster}
            controls={controls}
            autoPlay={autoPlay}
            muted={muted}
            playsInline
            aria-label="Video player"
            title="Video player"
          >
            {sources.map((s, idx) => (
              <source key={`${s.src}-${idx}`} src={s.src} type={s.type || "video/mp4"} />
            ))}
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white">
            <div className="text-center">
              <div className="mb-2 text-lg font-semibold">Playback error</div>
              <div className="text-sm opacity-80">{error}</div>
            </div>
          </div>
        )}
      </div>
      {!isReady && !error && (
        <div className="mt-2 h-2 w-1/3 animate-pulse rounded bg-gray-200" aria-hidden />
      )}
    </div>
  );
}
