// src/hooks/use-sound.ts
"use client";

import { useCallback } from "react";
import { useSound as useSoundContext } from "@/components/providers/sound-provider";

export function useSoundEffect() {
  const { playSound, isSoundEnabled } = useSoundContext();

  const playClickSound = useCallback(() => {
    playSound("click");
  }, [playSound]);

  const playHoverSound = useCallback(() => {
    playSound("hover");
  }, [playSound]);

  const playSuccessSound = useCallback(() => {
    playSound("success");
  }, [playSound]);

  const playErrorSound = useCallback(() => {
    playSound("error");
  }, [playSound]);

  const playNotificationSound = useCallback(() => {
    playSound("notification");
  }, [playSound]);

  return {
    playClickSound,
    playHoverSound,
    playSuccessSound,
    playErrorSound,
    playNotificationSound,
    isSoundEnabled,
  };
}