import { Suspense } from "react";
import { notFound } from "next/navigation";
import VideoPlayer from "../../../components/VideoPlayer";
import VideoMeta from "../../../components/VideoMeta";
import SidebarRecommendations from "../../../components/SidebarRecommendations";
import { getRecommendations, getVideoDetails } from "../../../lib/api";
import { type Video } from "../../../lib/types";

/**
 * Page: Watch Video by ID
 * Fetches the selected video details and recommended videos and renders the player, meta, and sidebar.
 */
export const dynamic = "force-dynamic";

async function VideoSection({ id }: { id: string }) {
  const video = await getVideoDetails(id).catch(() => null);
  if (!video) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <VideoPlayer
        sources={[{ src: video.videoUrl || "", type: "video/mp4" }]}
        poster={video.posterUrl || video.thumbnailUrl}
      />
      <VideoMeta
        title={video.title}
        channelName={video.channelName}
        views={video.views}
        publishedAt={video.publishedAt}
        description={video.description}
      />
    </div>
  );
}

async function RecommendationsSection({ id }: { id: string }) {
  const recs: Video[] = await getRecommendations(id).catch(() => []);
  return <SidebarRecommendations videos={recs} currentId={id} />;
}

/**
 * PUBLIC_INTERFACE
 * Watch page route handler.
 * Accepts dynamic route param { id } via Next.js App Router.
 *
 * Note: For Next.js PageProps, 'params' can be a Promise.
 */
type WatchPageProps = { params: Promise<Record<string, string>> };

export default async function Page({ params }: WatchPageProps) {
  const resolved = await params;
  const id = resolved.id as string;

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-4 md:py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <Suspense
            fallback={
              <div className="space-y-4">
                <div className="aspect-video w-full rounded-xl bg-gray-200 animate-pulse" />
                <div className="h-8 w-2/3 rounded bg-gray-200 animate-pulse" />
                <div className="h-20 w-full rounded bg-gray-100 animate-pulse" />
              </div>
            }
          >
            <VideoSection id={id} />
          </Suspense>
        </section>

        <aside className="lg:col-span-4">
          <h2 className="mb-3 text-sm font-semibold text-gray-700">Recommended</h2>
          <Suspense
            fallback={
              <div className="space-y-3">
                <div className="h-24 w-full rounded bg-gray-100 animate-pulse" />
                <div className="h-24 w-full rounded bg-gray-100 animate-pulse" />
                <div className="h-24 w-full rounded bg-gray-100 animate-pulse" />
              </div>
            }
          >
            <RecommendationsSection id={id} />
          </Suspense>
        </aside>
      </div>
    </main>
  );
}
