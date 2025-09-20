// src/components/effects/custom-cursor.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  // ✅ Initialize with null and type as number | null
  const requestRef = useRef<number | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const hasPointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;
    setIsVisible(hasPointer);
    if (!hasPointer) return;

    const updateCursor = () => {
      const speed = 0.15;
      currentPos.current.x +=
        (mousePos.current.x - currentPos.current.x) * speed;
      currentPos.current.y +=
        (mousePos.current.y - currentPos.current.y) * speed;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }

      requestRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.matches(
          "a, button, [role='button'], input, textarea, select, [data-cursor='pointer']"
        ) || !!target.closest("a, button, [role='button']");
      if (isInteractive) {
        setIsHovered(true);
        setIsPointer(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovered(false);
      setIsPointer(false);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => {
      mousePos.current = { x: -100, y: -100 };
    };

    // Start loop
    requestRef.current = requestAnimationFrame(updateCursor);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none !important;
        }
        a,
        button,
        input,
        textarea,
        select,
        [role="button"] {
          cursor: none !important;
        }
      `}</style>

      {/* Dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10001] mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <AnimatePresence>
          <motion.div
            className="relative -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: isClicked ? 0.8 : isHovered ? 0.5 : 1 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 400,
              mass: 0.5,
            }}
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                isHovered ? "bg-white scale-150" : "bg-white"
              }`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Ring */}
      <div
        ref={cursorRingRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{ willChange: "transform" }}
      >
        <AnimatePresence>
          <motion.div
            className="relative -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: isClicked ? 1.5 : isHovered ? 2 : 1,
              opacity: isHovered ? 0.5 : 0.8,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 350,
              mass: 0.5,
            }}
          >
            <div
              className={`w-10 h-10 rounded-full border transition-all duration-300 ${
                isHovered ? "border-primary border-2" : "border-white/50 border"
              } ${isPointer ? "animate-pulse" : ""}`}
              style={{
                background: isHovered
                  ? "radial-gradient(circle, transparent 40%, rgba(139, 92, 246, 0.1) 100%)"
                  : "transparent",
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
