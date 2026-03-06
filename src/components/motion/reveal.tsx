"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

type MotionStaggerProps = {
  children: ReactNode;
  className?: string;
};

const revealEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const revealItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: revealEase },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

export function MotionReveal({
  children,
  className,
  delay = 0,
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants = shouldReduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: revealEase,
            delay,
          },
        },
      };

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={
        shouldReduceMotion ? undefined : { once: false, amount: 0.2 }
      }
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function MotionStagger({ children, className }: MotionStaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={
        shouldReduceMotion ? undefined : { once: false, amount: 0.2 }
      }
      variants={shouldReduceMotion ? undefined : staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerItem({
  children,
  className,
}: MotionStaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={shouldReduceMotion ? undefined : revealItem}
    >
      {children}
    </motion.div>
  );
}
