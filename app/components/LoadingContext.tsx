"use client";

import { createContext, useContext, useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

const ReadyContext = createContext<boolean>(false);

export function useReady(): boolean {
  return useContext(ReadyContext);
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState<boolean | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("iconex_loaded");
    if (seen) {
      setShowLoader(false);
      setReady(true);
    } else {
      sessionStorage.setItem("iconex_loaded", "1");
      setShowLoader(true);
    }
  }, []);

  if (showLoader === null) return null;

  return (
    <ReadyContext.Provider value={ready}>
      {children}
      {showLoader && !ready && (
        <LoadingScreen onComplete={() => setReady(true)} />
      )}
    </ReadyContext.Provider>
  );
}