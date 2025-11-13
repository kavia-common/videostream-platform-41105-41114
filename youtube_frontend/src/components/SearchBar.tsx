"use client";

import React, { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * PUBLIC_INTERFACE
 * SearchBar component.
 * Accepts user input and navigates to /search?q=<query> on submit with accessible controls.
 */
export default function SearchBar(): React.ReactElement {
  /** This is a public function. */
  const router = useRouter();
  const params = useSearchParams();
  const initial = params?.get("q") ?? "";
  const [query, setQuery] = useState<string>(initial);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) {
        router.push("/search");
        return;
      }
      const url = `/search?q=${encodeURIComponent(trimmed)}`;
      router.push(url);
    },
    [query, router]
  );

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative flex items-center">
        <label htmlFor="search-input" className="sr-only">
          Search videos
        </label>
        <input
          id="search-input"
          aria-label="Search videos"
          placeholder="Search videos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-l-md border border-slate-300 bg-white/95 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus-visible:ring-2 focus-visible:ring-blue-500/50 focus:border-blue-500/60"
        />
        <button
          type="submit"
          aria-label="Search"
          title="Search"
          className="inline-flex items-center gap-2 rounded-r-md border border-blue-600 bg-blue-600/90 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500/50"
        >
          <svg
            className="h-4 w-4 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5 1.5-1.5-5-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </form>
  );
}
