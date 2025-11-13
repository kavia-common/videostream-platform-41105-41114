"use client";

import React from "react";
import VideoGrid from "../../components/VideoGrid";

/**
 * PUBLIC_INTERFACE
 * Search page placeholder: reuses VideoGrid to show results based on query param.
 * Actual filtering is handled by getHomeFeed/getSearch API within the grid or separate logic.
 */
export const dynamic = "force-dynamic";

export default function SearchPage(): React.ReactElement {
  /** This is a public function. */
  return (
    <div className="space-y-6">
      <VideoGrid />
    </div>
  );
}
