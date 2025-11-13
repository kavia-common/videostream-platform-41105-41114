"use client";

import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { SkeletonGrid } from "./Skeletons";
import { getHomeFeed } from "../lib/api";
import type { Video } from "../lib/types";

type GridState =
  | { status: "idle" | "loading" }
  | { status: "success"; items: Video[]; hasMore: boolean; page: number }
  | { status: "error"; message: string }
  | { status: "empty" };

/**
 * PUBLIC_INTERFACE
 * VideoGrid
 * Fetches and renders a grid of videos with pagination ("Load more"), loading skeletons, and error/empty states.
 */
export default function VideoGrid() {
  const [state, setState] = useState<GridState>({ status: "idle" });
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      setState({ status: "loading" });
      try {
        const res = await getHomeFeed({ page: 1 });
        if (!active) return;
        const items = res.items ?? [];
        if (items.length === 0) {
          setState({ status: "empty" });
        } else {
          setState({
            status: "success",
            items,
            hasMore: Boolean(res.hasMore),
            page: 1,
          });
        }
      } catch (e: unknown) {
        if (!active) return;
        let message = "Failed to load videos. Please try again later.";
        if (e instanceof Error && typeof e.message === "string") {
          message = e.message;
        } else if (typeof e === "string" && e.trim().length > 0) {
          message = e;
        }
        setState({
          status: "error",
          message,
        });
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const onLoadMore = async () => {
    if (state.status !== "success" || !state.hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const nextPage = state.page + 1;
      const res = await getHomeFeed({ page: nextPage });
      const newItems = res.items ?? [];
      setState({
        status: "success",
        items: [...state.items, ...newItems],
        hasMore: Boolean(res.hasMore),
        page: nextPage,
      });
    } catch (e) {
      // Keep existing items on error, but show inline message via console or toast in future
      console.error(e);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (state.status === "loading" || state.status === "idle") {
    return <SkeletonGrid count={12} />;
  }

  if (state.status === "error") {
    return (
      <div className="w-full py-16 grid place-items-center">
        <div className="max-w-md text-center bg-white border border-red-100 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            We hit a snag
          </h2>
          <p className="text-sm text-gray-600 mt-2">{state.message}</p>
          <button
            className="mt-4 inline-flex items-center rounded-md bg-blue-600 text-white px-3 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => {
              // retry
              setState({ status: "idle" });
            }}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (state.status === "empty") {
    return (
      <div className="w-full py-16 grid place-items-center">
        <div className="max-w-md text-center bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">No videos</h2>
          <p className="text-sm text-gray-600 mt-2">
            We couldn’t find any videos to show right now.
          </p>
        </div>
      </div>
    );
  }

  // success
  return (
    <div className="space-y-6">
      <div
        className="
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {state.status === "success" &&
          state.items.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
      </div>

      {state.status === "success" && state.hasMore && (
        <div className="flex justify-center">
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="inline-flex items-center rounded-md bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-blue-50 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 shadow-sm"
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
