"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";

/**
 * PUBLIC_INTERFACE
 * Header component for the application.
 * Renders the application logo/title and the SearchBar with Ocean Professional styling.
 */
export default function Header(): React.ReactElement {
  /** This is a public function. */
  return (
    <header
      className="w-full sticky top-0 z-40 border-b border-slate-200/60 bg-gradient-to-b from-blue-500/10 to-gray-50/60 backdrop-blur supports-[backdrop-filter]:bg-white/55"
      aria-label="Primary"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="group relative flex items-center gap-2 rounded-md px-1 outline-none transition"
          aria-label="Go to homepage"
        >
          <Image
            src="/logo.svg"
            alt="Ocean Video"
            width={128}
            height={32}
            priority
            className="h-8 w-auto select-none"
          />
          <span className="absolute inset-0 rounded-md ring-inset ring-blue-500/0 group-focus-visible:ring-2 group-focus-visible:ring-blue-500/50" />
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
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition focus-visible:ring-2 focus-visible:ring-blue-500/50"
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
