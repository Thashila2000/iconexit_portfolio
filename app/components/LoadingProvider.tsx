"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  // null = not yet checked, true = show loader, false = skip loader
  const [showLoader, setShowLoader] = useState<boolean | null>(null);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("iconex_loaded");
    if (alreadySeen) {
      // returning visitor within the same tab session — skip loader
      setShowLoader(false);
    } else {
      // first visit — show loader and mark as seen
      sessionStorage.setItem("iconex_loaded", "1");
      setShowLoader(true);
    }
  }, []);

  // Still checking sessionStorage — render nothing to avoid flash
  if (showLoader === null) return null;

  return (
    <>
      {children}
      {showLoader && (
        <LoadingScreen onComplete={() => setShowLoader(false)} />
      )}
    </>
  );
}