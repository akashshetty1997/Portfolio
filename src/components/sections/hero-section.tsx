"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  ArrowUpRight,
  MapPin,
  Github,
  Linkedin,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PERSONAL_INFO } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";
import { toast } from "sonner";

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { playClickSound, playHoverSound } = useSoundEffect();

  const handleDownloadResume = () => {
    playClickSound();
    toast.success("Resume download started!");
  };

  const handleScrollToWork = () => {
    playClickSound();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const typingSequence = PERSONAL_INFO.typingAnimationTexts.flatMap((text) => [
    text,
    2000,
  ]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] w-full bg-background overflow-hidden p-4 sm:p-6 md:p-12 flex flex-col justify-between"
    >
      {/* TOP ROW: Floating Header (Now highly visible with glassmorphism) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full z-50 relative gap-4"
      >
        {/* Top Left: Status Pill */}
        <div className="flex items-center gap-3 bg-background/70 backdrop-blur-md py-2 px-4 rounded-full border border-border shadow-sm">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-foreground/90">
            {PERSONAL_INFO.status}
          </span>
        </div>

        {/* Top Right: Location & Socials Pill */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm font-semibold text-foreground/90 bg-background/70 backdrop-blur-md py-2 px-4 md:px-6 rounded-full border border-border shadow-sm">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {PERSONAL_INFO.location}
          </div>
          
          <div className="hidden sm:block w-px h-3.5 bg-border" />
          
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1.5 uppercase tracking-widest"
              onMouseEnter={playHoverSound}
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Github</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1.5 uppercase tracking-widest"
              onMouseEnter={playHoverSound}
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* MIDDLE: Massive Editorial Typography */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full px-4 sm:px-6 md:px-12 pointer-events-none z-10 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-black text-[clamp(4rem,14vw,16rem)] leading-[0.85] tracking-tighter text-foreground m-0 p-0">
            {PERSONAL_INFO.firstName.toUpperCase()}
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-start sm:justify-end w-full mt-2 sm:mt-0"
        >
          {/* Webkit text stroke creates the hollow text effect */}
          <h1 
            className="font-black text-[clamp(4rem,14vw,16rem)] leading-[0.85] tracking-tighter text-transparent m-0 p-0"
            style={{ WebkitTextStroke: "2px hsl(var(--foreground))" }}
          >
            {PERSONAL_INFO.lastName.toUpperCase()}
          </h1>
        </motion.div>
      </div>

      {/* BOTTOM ROW: Content Block pushed to bottom right */}
      <div className="flex justify-center sm:justify-end w-full z-20 mt-auto pt-32 pb-4 sm:pb-0">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-md bg-background/85 backdrop-blur-xl p-6 sm:p-8 border sm:border-r-0 sm:border-b-0 border-border shadow-2xl relative"
        >
          {/* Dynamic Role */}
          <div className="h-6 mb-4 text-primary font-mono text-sm tracking-tight font-semibold">
            <TypeAnimation
              sequence={typingSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <p className="text-foreground/80 leading-relaxed mb-8 text-sm md:text-base">
            {PERSONAL_INFO.aboutMe.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              onClick={handleScrollToWork}
              onMouseEnter={playHoverSound}
              className="rounded-none bg-foreground text-background hover:bg-foreground/90 group w-full"
            >
              View Projects
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={handleDownloadResume}
              onMouseEnter={playHoverSound}
              className="rounded-none border-border hover:bg-secondary/50 w-full"
              asChild
            >
              <a href={PERSONAL_INFO.resume} download>
                <Download className="w-4 h-4 mr-2" />
                CV
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}