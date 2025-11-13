import VideoGrid from "../../components/VideoGrid";

/**
 * PUBLIC_INTERFACE
 * BrowsePage
 * Displays the home feed (mock-backed when API base is unset) with responsive grid and pagination.
 */
export default function BrowsePage() {
  return (
    <main className="px-4 sm:px-6 lg:px-8 py-6">
      <section className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Explore videos
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Curated feed using mock data when API is not configured.
        </p>
      </section>
      <VideoGrid />
    </main>
  );
}
