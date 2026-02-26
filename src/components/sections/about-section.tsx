"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Calendar,
  Award,
  Briefcase,
  Code2,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EDUCATION, PERSONAL_INFO } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";
import Image from "next/image";

// Strict, snappy animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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
    },
  },
};

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playHoverSound } = useSoundEffect();

  const highlights = [
    { icon: Briefcase, label: "4+ YRS", sublabel: "PRODUCTION EXP" },
    { icon: Code2, label: "10+", sublabel: "TECHNOLOGIES" },
    { icon: Rocket, label: "4.9+", sublabel: "APP STORE RATING" },
    { icon: Award, label: "3.4", sublabel: "GPA @ NORTHEASTERN" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen bg-background pt-24 pb-32 overflow-hidden border-t border-border"
    >
      {/* Massive Background Typography Watermark */}
      <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none flex justify-center">
        <h2 className="text-[clamp(10rem,25vw,30rem)] font-black leading-none whitespace-nowrap">
          ABOUT
        </h2>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4 block">
              01 // The Architect
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Who I{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px hsl(var(--foreground))" }}
              >
                Am
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-mono text-muted-foreground uppercase flex flex-col items-start md:items-end"
          >
            <span>Based in {PERSONAL_INFO.location}</span>
            <span>MS CS @ Northeastern</span>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Image (Magazine Spread Style) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative group h-fit"
          >
            <div className="relative w-full overflow-hidden border border-border bg-muted">
              {/* Sharp, stark image container with hover effect using explicit width/height */}
              <Image
                src="/images/Profile.png"
                alt={PERSONAL_INFO.name}
                width={800}
                height={1000}
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
                priority
                unoptimized
              />
              {/* Overlay Border - pointer-events-none ensures hover works perfectly */}
              <div className="absolute inset-0 border-[12px] border-background mix-blend-overlay opacity-50 pointer-events-none" />
            </div>

            {/* Brutalist Name Block overlapping the image */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-foreground text-background p-6 shadow-2xl z-20">
              <h3 className="text-2xl font-black uppercase tracking-tight m-0 leading-none">
                {PERSONAL_INFO.name}
              </h3>
              <p className="font-mono text-xs mt-2 text-background/80 tracking-widest uppercase">
                Software Engineer
              </p>
            </div>
          </motion.div>

          {/* Right Column: Text & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full pt-8 lg:pt-0">
            {/* Summary Text */}
            <motion.div variants={itemVariants} className="space-y-6 mb-16">
              {PERSONAL_INFO.aboutMe.summary.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-base md:text-lg leading-relaxed ${
                    index === 0
                      ? "text-foreground font-medium text-xl md:text-2xl tracking-tight"
                      : "text-muted-foreground"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Brutalist Stats Row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-border"
            >
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="p-4 md:p-6 border-r border-b border-border hover:bg-foreground hover:text-background transition-colors duration-300 group flex flex-col justify-between aspect-square"
                  onMouseEnter={playHoverSound}
                >
                  <item.icon className="w-5 h-5 mb-4 opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 transition-all" />
                  <div>
                    <p className="text-2xl md:text-3xl font-black tracking-tighter mb-1">
                      {item.label}
                    </p>
                    <p className="text-[10px] md:text-xs font-mono tracking-widest opacity-70">
                      {item.sublabel}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Education Timeline (Editorial Table format) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-32"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4"
          >
            Education Background
            <div className="h-px bg-border flex-1" />
          </motion.h3>

          <div className="border-t border-border">
            {EDUCATION.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group border-b border-border py-8 hover:px-6 transition-all duration-300 hover:bg-secondary/20 flex flex-col md:flex-row md:items-center justify-between gap-6"
                onMouseEnter={playHoverSound}
              >
                {/* Left: Year & Location */}
                <div className="w-full md:w-1/4 flex flex-row md:flex-col justify-between md:justify-start font-mono text-sm">
                  <span className="text-foreground font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4 opacity-50" />
                    {edu.duration}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-2 md:mt-2">
                    <MapPin className="w-3.5 h-3.5 opacity-50" />
                    {edu.location}
                  </span>
                </div>

                {/* Middle: Degree & School */}
                <div className="w-full md:w-1/2">
                  <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {edu.school}
                  </h4>
                  <p className="text-foreground/80 text-sm md:text-base">
                    {edu.degree}
                  </p>

                  {/* Coursework Tags - Stark Badges */}
                  {edu.coursework && edu.coursework.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {edu.coursework.map((course, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="rounded-none border-border/50 text-[10px] tracking-widest uppercase font-mono bg-transparent"
                        >
                          {course}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: GPA & Status */}
                <div className="w-full md:w-1/4 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                  {edu.gpa && (
                    <div className="text-right flex items-baseline gap-1">
                      <span className="text-3xl font-black tracking-tighter">
                        {edu.gpa.split("/")[0]}
                      </span>
                      <span className="text-sm font-mono text-muted-foreground">
                        /{edu.gpa.split("/")[1]}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-muted-foreground">
                    {edu.duration.includes("2027") ? (
                      <>
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        In Progress
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4" />
                        Completed
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
