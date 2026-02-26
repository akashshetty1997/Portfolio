"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  Terminal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCE } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";

// Strict, snappy animations matching the About section
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1] as const
    } 
  },
};

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playHoverSound } = useSoundEffect();

  return (
    <section
      id="experience"
      className="relative min-h-screen bg-background pt-24 pb-32 overflow-hidden border-t border-border"
      ref={ref}
    >
      {/* Massive Background Typography Watermark */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none flex justify-center">
        <h2 className="text-[clamp(8rem,20vw,25rem)] font-black leading-none whitespace-nowrap">
          EXPERIENCE
        </h2>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4 block">
              02 // The Journey
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Professional <span className="text-transparent" style={{ WebkitTextStroke: "1.5px hsl(var(--foreground))" }}>Track</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-mono text-muted-foreground uppercase flex flex-col items-start md:items-end"
          >
            <span>4+ Years Production Exp.</span>
            <span>Building Scalable Systems</span>
          </motion.div>
        </div>

        {/* Editorial Experience Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="border-t-[2px] border-foreground"
        >
          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group border-b border-border hover:bg-secondary/10 transition-colors duration-500"
              onMouseEnter={playHoverSound}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-10 md:py-16 px-4 md:px-6">
                
                {/* Left Column: Meta (Year & Location) */}
                <div className="lg:col-span-3 flex flex-row lg:flex-col justify-between lg:justify-start font-mono uppercase tracking-widest text-sm md:text-xs">
                  <div className="flex flex-col gap-1">
                    <span className="text-foreground font-bold">{exp.duration.split(" - ")[0]}</span>
                    <span className="text-muted-foreground hidden lg:block">|</span>
                    <span className="text-foreground font-bold">{exp.duration.split(" - ")[1]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground lg:mt-6">
                    <MapPin className="w-3.5 h-3.5 opacity-50" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Middle Column: Core Info (Company, Title, Desc) */}
                <div className="lg:col-span-6">
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-4 group-hover:text-primary transition-colors duration-300">
                    {exp.company}
                  </h3>
                  <div className="inline-block border border-foreground text-foreground px-3 py-1 font-mono text-xs uppercase tracking-widest mb-8">
                    {exp.title}
                  </div>
                  
                  <div className="space-y-4">
                    {exp.description.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <span className="font-mono text-primary mt-1 text-sm">{"//"}</span>
                        <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Stats & Tech Stack (FIXED OVERLAP) */}
                <div className="lg:col-span-3 flex flex-col pt-6 lg:pt-0 border-t lg:border-t-0 border-border/50">
                  {/* Achievements Block */}
                  {exp.achievements && (
                    <div className="mb-10 space-y-4">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-4 border-b border-foreground/10 pb-2">
                        Key Metrics
                      </span>
                      <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                        {Object.entries(exp.achievements).map(([key, value]) => (
                          <div key={key} className="flex flex-col gap-1">
                            <span className="font-mono text-[10px] text-muted-foreground uppercase leading-tight pr-2">
                              {key}
                            </span>
                            <span className="font-black text-foreground text-xl tracking-tighter">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Tags */}
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-4 border-b border-foreground/10 pb-2">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="rounded-none border-border bg-transparent text-[10px] font-mono tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}

          {/* Brutalist "Next Step" Node */}
          <motion.div
            variants={itemVariants}
            className="group border-b border-foreground bg-foreground/5 hover:bg-foreground/10 transition-colors duration-500 relative overflow-hidden"
            onMouseEnter={playHoverSound}
          >
            {/* Animated scanning line effect */}
            <div className="absolute top-0 left-0 w-full h-px bg-primary/50 -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite]" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-10 px-4 md:px-6 items-center">
              <div className="lg:col-span-3 font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-primary animate-pulse" />
                Summer 2026
              </div>
              <div className="lg:col-span-6 flex items-center gap-4">
                <Terminal className="w-8 h-8 text-muted-foreground/50" />
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-muted-foreground/50">
                  Your Company <span className="animate-pulse">_</span>
                </h3>
              </div>
              <div className="lg:col-span-3 flex justify-start lg:justify-end">
                <a 
                  href="#contact" 
                  className="font-mono text-xs tracking-widest uppercase border-b border-primary text-primary pb-1 hover:text-foreground hover:border-foreground transition-colors flex items-center gap-2"
                >
                  Initiate Handshake <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}