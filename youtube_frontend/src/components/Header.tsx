"use client";

import React from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

/**
 * Header component for the application.
 * Renders the application logo/title and the SearchBar.
 *
 * PUBLIC_INTERFACE
 */
export default function Header(): React.ReactElement {
  /** This is a public function. */
  return (
    <header className="w-full sticky top-0 z-40 border-b border-gray-200 bg-gradient-to-r from-blue-500/10 to-gray-50 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Go to homepage"
        >
          <div className="h-9 w-9 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
            {/* Simple play icon */}
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            StreamView
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1">
          <React.Suspense
            fallback={
              <div className="w-full">
                <div className="h-[38px] w-full rounded-md bg-gray-100 animate-pulse" aria-hidden />
              </div>
            }
          >
            <SearchBar />
          </React.Suspense>
        </div>

        {/* Right controls placeholder (e.g., user, theme toggle) */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition"
            aria-label="Upload placeholder"
            title="Upload (placeholder)"
          >
            <svg
              className="h-4 w-4 mr-2 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5 20h14v-2H5v2zm7-18-5.5 5.5 1.42 1.42L11 7.84V16h2V7.84l3.08 3.08 1.42-1.42L12 2z" />
            </svg>
            Upload
          </button>
        </div>
      </div>
    </header>
  );
}
