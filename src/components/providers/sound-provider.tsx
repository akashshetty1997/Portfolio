// src/components/providers/sound-provider.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playSound: (
    soundType: "click" | "hover" | "success" | "error" | "notification"
  ) => void;
  setBackgroundVolume: (volume: number) => void;
  backgroundVolume: number;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // DISABLE SOUND TEMPORARILY - Set this to true to enable later
  const SOUND_FEATURE_ENABLED = false; // ← Change this to true when ready

  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [backgroundVolume, setBackgroundVolume] = useState(0.3);

  const toggleSound = () => {
    // Do nothing when disabled
    if (!SOUND_FEATURE_ENABLED) return;

    const newState = !isSoundEnabled;
    setIsSoundEnabled(newState);
    localStorage.setItem("soundEnabled", newState.toString());
  };

  const playSound = (soundType: string) => {
    // Do nothing when disabled
    if (!SOUND_FEATURE_ENABLED) return;
    // Placeholder for future sound implementation
    console.log("Sound:", soundType);
  };

  const setBackgroundVolumeHandler = (volume: number) => {
    // Do nothing when disabled
    if (!SOUND_FEATURE_ENABLED) return;
    setBackgroundVolume(volume);
  };

  return (
    <SoundContext.Provider
      value={{
        isSoundEnabled: false,
        toggleSound,
        playSound,
        setBackgroundVolume: setBackgroundVolumeHandler,
        backgroundVolume,
      }}
    >
      {children}

      {/* Hide Sound Toggle Button when disabled */}
      {SOUND_FEATURE_ENABLED && (
        <Button
          onClick={toggleSound}
          size="icon"
          variant="outline"
          className="sound-toggle fixed bottom-6 right-6 z-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Toggle sound"
        >
          {isSoundEnabled ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </Button>
      )}
    </SoundContext.Provider>
  );
}

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
