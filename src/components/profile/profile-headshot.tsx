"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { profileImage } from "@/data/portfolio";

export function ProfileHeadshot() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative z-10"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? undefined
          : { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.12 }
      }
    >
      <div className="mx-auto w-full max-w-[19rem] rounded-[2rem] border border-accent/50 bg-[linear-gradient(180deg,rgba(255,77,90,0.1),rgba(255,255,255,0.02))] p-1 shadow-[0_0_32px_rgba(255,77,90,0.12)]">
        <div className="overflow-hidden rounded-[1.65rem] border border-white/10 bg-panel">
          <Image
            src={profileImage.src}
            alt={profileImage.alt}
            width={720}
            height={900}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}
