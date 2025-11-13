"use client";

import React from "react";
import BrowsePage from "./(browse)/page";

/**
 * PUBLIC_INTERFACE
 * Root index page delegates to BrowsePage.
 */
export const dynamic = "force-dynamic";

export default function IndexPage(): React.ReactElement {
  /** This is a public function. */
  return <BrowsePage />;
}
