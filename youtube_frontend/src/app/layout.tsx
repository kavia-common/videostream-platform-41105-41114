import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "VideoStream – Ocean Professional",
  description:
    "A modern video platform UI with browse, search, playback, and recommendations.",
  applicationName: "VideoStream",
  keywords: ["video", "stream", "browse", "search", "playback", "next.js"],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

/**
 * Root layout that provides the global app shell with a sticky header placeholder
 * and a responsive main content container. Designed to be compatible with next export.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="app-root" suppressHydrationWarning>
        {/* Accessible application header with gradient background */}
        <header className="app-header" role="banner" aria-label="Global header">
          <div className="container-responsive header-content">
            {/* Placeholder branding and future search input area */}
            <div className="flex items-center gap-2 min-w-0">
              <div
                aria-hidden
                className="h-8 w-8 rounded-md bg-primary shadow-subtle"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
              <span className="font-semibold text-sm sm:text-base text-primary">
                VideoStream
              </span>
            </div>

            <nav
              aria-label="Primary"
              className="flex items-center gap-3 text-sm"
            >
              {/* Placeholder nav items; to be wired later */}
              <Link href="/" className="transition-base hover:opacity-80">
                Home
              </Link>
              <Link
                href="/browse"
                className="transition-base hover:opacity-80 hidden sm:inline"
              >
                Browse
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content area with responsive container */}
        <main id="main-content" className="app-main" role="main">
          <div className="container-responsive">{children}</div>
        </main>
      </body>
    </html>
  );
}
