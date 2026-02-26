"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
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
      // Slightly faster tracking for a more mechanical feel
      const speed = 0.25; 
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
      }
    };

    const handleMouseOut = () => {
      setIsHovered(false);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => {
      mousePos.current = { x: -100, y: -100 };
    };

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

  useEffect(() => {
    if (!isVisible) return;

    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";
    document.body.classList.add("custom-cursor-active");

    return () => {
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Central Target - Sharp Square */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10001]"
        style={{ willChange: "transform" }}
      >
        <AnimatePresence>
          <motion.div
            className="relative -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: isClicked ? 0.5 : isHovered ? 1.5 : 1 }}
            transition={{
              type: "tween", // Replaced bouncy spring with rigid tween
              duration: 0.15,
              ease: "circOut"
            }}
          >
            <div
              className={`w-2 h-2 rounded-none transition-all duration-200 bg-foreground`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Outer Reticle - Wireframe Square */}
      <div
        ref={cursorRingRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{ willChange: "transform" }}
      >
        <AnimatePresence>
          <motion.div
            className="relative -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: isClicked ? 0.9 : isHovered ? 1.4 : 1,
              rotate: isClicked ? 45 : isHovered ? 90 : 0, // Mechanical rotation on interaction
              opacity: isHovered ? 1 : 0.4,
            }}
            transition={{
              type: "tween",
              duration: 0.2,
              ease: "easeOut"
            }}
          >
            <div
              className={`w-8 h-8 rounded-none transition-all duration-300 ${
                isHovered
                  ? "border-[2px] border-foreground bg-foreground/5"
                  : "border border-foreground/50"
              }`}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}