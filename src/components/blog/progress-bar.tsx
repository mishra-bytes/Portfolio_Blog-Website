"use client";

import { useEffect, useState } from "react";

export function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;

      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }

      const percentage = (window.scrollY / scrollHeight) * 100;
      setProgress(Math.min(Math.max(percentage, 0), 100));
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-50 h-1 bg-blue-600 transition-all duration-150 ease-out"
      style={{ width: `${progress}%` }}
    />
  );
}
