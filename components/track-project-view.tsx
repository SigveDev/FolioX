"use client";
import { useEffect } from "react";

export default function TrackProjectView({ projectId }: { projectId: string }) {
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_LOCAL_REQUESTS}/api/projects/${projectId}/views`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referrer: document.referrer,
          userAgent: navigator.userAgent,
        }),
      }
    );
  }, [projectId]);
  return null;
}
