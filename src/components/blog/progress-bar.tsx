"use client";

import { useEffect, useState } from "react";

export function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const element = document.getElementById("article-content");

      if (!element) {
        setProgress(0);
        return;
      }

      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const elementHeight = element.offsetHeight;
      const currentScroll = window.scrollY - elementTop;
      const scrollableDistance = elementHeight - window.innerHeight;

      if (scrollableDistance <= 0) {
        setProgress(currentScroll > 0 ? 100 : 0);
        return;
      }

      const percentage = (currentScroll / scrollableDistance) * 100;
      setProgress(Math.max(0, Math.min(100, percentage)));
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-50 h-1 bg-blue-600 transition-all duration-150 ease-out"
      style={{ width: `${progress}%` }}
    />
  );
}
