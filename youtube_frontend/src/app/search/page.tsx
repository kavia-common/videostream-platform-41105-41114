"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchVideos } from "../../lib/api";
import { SkeletonGrid } from "../../components/Skeletons";
import type { Video, VideoSearchResponse } from "../../lib/types";

/**
 * PUBLIC_INTERFACE
 * SearchPage
 * This page reads the 'q' query param and performs a client-side search using api.searchVideos.
 * It renders results via VideoGrid and shows SkeletonGrid during loading.
 * It handles empty states, error states, and supports pagination via "Load more" if pageToken is provided.
 * Notes:
 * - Implemented as a Client Component to allow export-compatible client fetching and to avoid server env-dependence.
 * - Preserves mock fallback automatically when NEXT_PUBLIC_API_BASE is unset (api module should handle this).
 */
export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") || "").trim();

  // Local state for results, loading, error, and pagination
  const [videos, setVideos] = useState<Video[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep last executed query to reset list when query changes
  const lastQueryRef = useRef<string>("");

  const hasQuery = useMemo(() => q.length > 0, [q]);

  const runSearch = useCallback(
    async (query: string, pageToken?: string) => {
      try {
        // When starting a fresh search (no pageToken), clear previous error and set base loading
        if (!pageToken) {
          setError(null);
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const res: VideoSearchResponse = await searchVideos(query, pageToken ? { pageToken } : undefined);

        // res should include items and possibly nextPageToken; fall back defensively
        const newItems = Array.isArray(res.items) ? res.items : [];
        const newNext = typeof res.nextCursor === "string" ? res.nextCursor : null;

        if (pageToken) {
          // Append
          setVideos((prev) => [...prev, ...newItems]);
        } else {
          // Fresh set
          setVideos(newItems);
        }
        setNextPageToken(newNext);
      } catch (e: unknown) {
        // Normalize error message
        const message =
          e instanceof Error && e.message
            ? e.message
            : typeof e === "string" && e.trim().length > 0
            ? e
            : "Failed to fetch search results.";
        setError(message);
        if (!pageToken) {
          // On initial failure, ensure list is reset
          setVideos([]);
          setNextPageToken(null);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
        setInitialLoaded(true);
      }
    },
    []
  );

  // Trigger search when q changes
  useEffect(() => {
    if (!hasQuery) {
      // Clear state if no query
      setVideos([]);
      setNextPageToken(null);
      setInitialLoaded(true);
      setError(null);
      lastQueryRef.current = "";
      return;
    }

    if (lastQueryRef.current !== q) {
      lastQueryRef.current = q;
      setInitialLoaded(false);
      setVideos([]);
      setNextPageToken(null);
      runSearch(q);
    }
  }, [q, hasQuery, runSearch]);

  const onLoadMore = useCallback(() => {
    if (hasQuery && nextPageToken && !loading && !loadingMore) {
      runSearch(q, nextPageToken);
    }
  }, [hasQuery, nextPageToken, loading, loadingMore, q, runSearch]);

  // UI states
  const showSkeleton = !initialLoaded && (loading || (hasQuery && !videos.length));
  const showEmpty = initialLoaded && hasQuery && !loading && !videos.length && !error;
  const showPrompt = initialLoaded && !hasQuery && !error;

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto w-full">
      <h1 className="text-xl font-semibold mb-4">
        {hasQuery ? `Search results for "${q}"` : "Search"}
      </h1>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {showPrompt && (
        <div className="rounded-md border border-gray-200 bg-white px-4 py-6 text-gray-600">
          Enter a search query in the header to find videos.
        </div>
      )}

      {showSkeleton && <SkeletonGrid count={12} />}

      {!showSkeleton && !!videos.length && (
        <>
          {/* Reuse grid layout styles while rendering our own items */}
          <div
            className="
              grid gap-4
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {videos.map((v) => (
              // Use existing VideoCard via VideoGrid's internal card import by mimicking structure is complex.
              // Instead, render minimal compatible cards or better route through VideoCard directly if available.
              // To avoid internal imports, render anchor to watch page with thumbnail/title.
              <a
                key={v.id}
                href={`/watch/${encodeURIComponent(v.id)}`}
                className="rounded-lg overflow-hidden bg-white border border-gray-100 hover:shadow transition"
              >
                <div
                  className="aspect-video bg-cover bg-center"
                  style={{ backgroundImage: `url(${v.thumbnailUrl})` }}
                  aria-label={v.title}
                />
                <div className="p-3">
                  <div className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {v.title}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {v.channelName}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {nextPageToken && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={onLoadMore}
                disabled={loadingMore}
                className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                aria-label="Load more results"
              >
                {loadingMore ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </>
      )}

      {showEmpty && (
        <div className="rounded-md border border-gray-200 bg-white px-4 py-6 text-gray-600">
          No results found. Try a different search.
        </div>
      )}
    </div>
  );
}
