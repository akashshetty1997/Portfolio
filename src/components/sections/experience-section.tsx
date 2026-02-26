// src/components/sections/experience-section.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronRight,
  Circle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCE } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playHoverSound } = useSoundEffect();

  return (
    <section
      id="experience"
      className="py-20 relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-4 py-1.5" variant="outline">
            <Briefcase className="w-3 h-3 mr-2" />
            Experience
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            4+ years of building scalable applications and leading development
            teams
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-px"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--border)), hsl(var(--border) / 0.3))",
            }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          />

          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.2,
              }}
              className="relative pl-14 md:pl-16 pb-14 last:pb-0 group"
              onMouseEnter={playHoverSound}
            >
              {/* Timeline node */}
              <div className="absolute left-0 top-1">
                <motion.div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-border bg-background flex items-center justify-center group-hover:border-foreground/50 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-foreground group-hover:bg-foreground transition-colors duration-300" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="rounded-xl border border-border/50 bg-background/60 backdrop-blur-sm p-5 md:p-6 hover:border-primary/30 transition-all duration-300">
                {/* Company & Role header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold">{exp.title}</h3>
                    <p className="text-primary font-medium text-sm">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Key metrics row */}
                {exp.achievements && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(exp.achievements).map(([key, value]) => (
                      <span
                        key={key}
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        <Circle className="w-1.5 h-1.5 fill-current" />
                        {value}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description bullets */}
                <div className="space-y-2 mb-4">
                  {exp.description.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-primary/50 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/40">
                  {exp.technologies.map((tech, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="text-xs px-2 py-0.5 font-normal"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Bottom node - next step */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="relative pl-14 md:pl-16 pt-2"
          >
            <div className="absolute left-0 top-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-dashed border-border bg-background flex items-center justify-center">
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-foreground/30 animate-pulse" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground pt-2.5">
              <span className="font-medium text-primary/70">Summer 2026</span>
              <span className="mx-2">·</span>
              Your company?
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}