// src/components/effects/loading-bar.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingBar() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Start loading when pathname changes
    setIsLoading(true);
    setProgress(10);

    // Simulate loading progress
    const timer1 = setTimeout(() => setProgress(35), 100);
    const timer2 = setTimeout(() => setProgress(70), 200);
    const timer3 = setTimeout(() => setProgress(90), 300);
    const timer4 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 200);
    }, 400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [pathname]);

  // Also show loading bar on initial page load
  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
      setProgress(10);
    };

    const handleComplete = () => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 200);
    };

    // Check if page is still loading
    if (document.readyState !== "complete") {
      handleStart();

      // Gradually increase progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      window.addEventListener("load", () => {
        clearInterval(interval);
        handleComplete();
      });

      return () => {
        clearInterval(interval);
        window.removeEventListener("load", handleComplete);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-bar fixed top-0 left-0 right-0 z-[9999] h-1 bg-gradient-to-r from-pure-purple via-bright-red to-deep-red"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: progress / 100 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          {/* Glowing effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pure-purple via-bright-red to-deep-red blur-sm"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
