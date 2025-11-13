import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";

/**
 * Root layout wraps the entire application and renders the Header.
 * The Header contains the SearchBar and navigation.
 * Designed to be compatible with next export.
 */
export const metadata: Metadata = {
  title: "StreamView – Ocean Professional",
  description:
    "A modern, YouTube-like experience to discover and watch video content.",
  applicationName: "StreamView",
  keywords: ["video", "stream", "search", "watch", "YouTube-like", "Next.js"],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="app-root bg-[#f9fafb] text-[#111827] antialiased"
        suppressHydrationWarning
      >
        <Header />
        <main id="main-content" className="app-main" role="main">
          <div className="container-responsive mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
