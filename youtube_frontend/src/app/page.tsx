/**
 * PUBLIC_INTERFACE
 * Home page: thin export-safe hero that links users to the browse experience.
 * Avoids server-only features to remain compatible with `next export`.
 */
export default function Home() {
  return (
    <section
      aria-labelledby="welcome-heading"
      className="surface rounded-lg shadow-medium transition-base"
    >
      <div className="bg-ocean-gradient rounded-t-lg border-b border-black/5 p-6 sm:p-7" />
      <div className="p-6 sm:p-8">
        <h1
          id="welcome-heading"
          className="text-xl sm:text-2xl font-semibold text-primary"
        >
          Welcome to VideoStream
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Explore a modern video browsing experience with Ocean Professional
          theming. Start by browsing trending videos.
        </p>
        <div className="mt-4">
          <a
            href="/browse"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-white transition-base"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Browse videos
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
