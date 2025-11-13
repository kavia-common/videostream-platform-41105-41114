"use client";

import React from "react";
import VideoGrid from "../../components/VideoGrid";

/**
 * PUBLIC_INTERFACE
 * Browse page showing the home feed grid.
 */
export const dynamic = "force-dynamic";

export default function BrowsePage(): React.ReactElement {
  /** This is a public function. */
  return (
    <div className="space-y-6">
      <VideoGrid />
    </div>
  );
}
