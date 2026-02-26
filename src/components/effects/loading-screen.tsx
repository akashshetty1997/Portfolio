"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
    { text: "HELLO", language: "ENG" },
    { text: "नमस्ते", language: "HIN" },
    { text: "BONJOUR", language: "FRA" },
    { text: "HOLA", language: "SPA" },
    { text: "こんにちは", language: "JPN" },
    { text: "你好", language: "CHN" },
    { text: "CIAO", language: "ITA" },
    { text: "안녕하세요", language: "KOR" },
    { text: "ПРИВЕТ", language: "RUS" },
    { text: "مرحبا", language: "ARA" },
    { text: "OLÁ", language: "POR" },
    { text: "HALLO", language: "GER" },
];

interface LoadingScreenProps {
    onLoadingComplete?: () => void;
    duration?: number;
}

export function LoadingScreen({
    onLoadingComplete,
    duration = 3500,
}: LoadingScreenProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Hard-cut greeting interval
        const greetingInterval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % greetings.length);
        }, duration / greetings.length); // Distribute greetings evenly across duration

        // Progress counter interval
        const updateRate = 30; // ms per tick
        const totalTicks = duration / updateRate;
        let currentTick = 0;

        const progressInterval = setInterval(() => {
            currentTick++;
            const newProgress = Math.min(Math.floor((currentTick / totalTicks) * 100), 100);
            setProgress(newProgress);
        }, updateRate);

        // Hide loading screen after duration
        const timer = setTimeout(() => {
            setIsVisible(false);
            clearInterval(greetingInterval);
            clearInterval(progressInterval);

            // Call callback after the heavy exit animation finishes
            setTimeout(() => {
                onLoadingComplete?.();
            }, 800); 
        }, duration);

        return () => {
            clearTimeout(timer);
            clearInterval(greetingInterval);
            clearInterval(progressInterval);
        };
    }, [duration, onLoadingComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    // The brutalist "curtain pull" exit animation
                    initial={{ y: 0 }}
                    exit={{ y: "-100vh" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    className="fixed inset-0 z-[100] flex flex-col justify-between bg-foreground text-background overflow-hidden selection:bg-background selection:text-foreground"
                >
                    {/* Top Row: System Logs */}
                    <div className="flex justify-between items-start p-6 md:p-10 font-mono text-xs md:text-sm uppercase tracking-widest opacity-80">
                        <div className="flex flex-col gap-1">
                            <span>System_Boot_Sequence //</span>
                            <span>Initializing_Modules... {progress}%</span>
                            <span className="animate-pulse">Loading_Assets_ [OK]</span>
                        </div>
                        <div className="text-right">
                            <span>v2.0.26</span>
                            <br />
                            <span>Loc: BOS_MA</span>
                        </div>
                    </div>

                    {/* Middle: Massive Greeting */}
                    <div className="flex-1 flex items-center justify-center px-4 relative">
                        {/* Decorative wireframe crosshairs */}
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
                            <div className="w-full h-px bg-background" />
                            <div className="absolute w-px h-full bg-background" />
                        </div>

                        <div className="relative text-center w-full flex flex-col items-center justify-center h-40">
                            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-50 absolute top-0">
                                LANG_ID: {greetings[currentIndex].language}
                            </span>
                            
                            <h1 className="text-[clamp(4rem,15vw,12rem)] font-black uppercase tracking-tighter leading-none m-0 p-0 absolute top-1/2 -translate-y-1/2">
                                {greetings[currentIndex].text}
                            </h1>
                        </div>
                    </div>

                    {/* Bottom Row: Progress & Name */}
                    <div className="p-6 md:p-10 flex flex-col md:flex-row justify-between items-end gap-6 border-t border-background/20 relative">
                        {/* Stark Loading Bar filling the exact border width */}
                        <div 
                            className="absolute top-0 left-0 h-[2px] bg-background transition-all ease-linear duration-75"
                            style={{ width: `${progress}%` }}
                        />

                        <div className="font-mono text-xs tracking-[0.3em] uppercase">
                            Akash Shetty <br className="hidden md:block" />
                            <span className="opacity-50">Software Engineer</span>
                        </div>
                        
                        {/* Massive Progress Number */}
                        <div className="text-6xl md:text-8xl font-black tracking-tighter tabular-nums leading-none">
                            {progress.toString().padStart(3, '0')}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}