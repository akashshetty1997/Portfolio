// src/components/sections/about-section.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Calendar,
  Sparkles,
  Award,
  Briefcase,
  Code2,
  Rocket,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EDUCATION, PERSONAL_INFO } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";
import Image from "next/image";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playHoverSound } = useSoundEffect();

  const highlights = [
    { icon: Briefcase, label: "4+ Years", sublabel: "Production Experience" },
    { icon: Code2, label: "10+", sublabel: "Technologies" },
    { icon: Rocket, label: "4.9+", sublabel: "App Store Rating" },
    { icon: Award, label: "3.4", sublabel: "GPA at Northeastern" },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 px-4 py-1.5" variant="outline">
            <Sparkles className="w-3 h-3 mr-2" />
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Who I <span className="text-gradient">Am</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            MS CS student at Northeastern with 4+ years of production experience
            building scalable full-stack systems
          </p>
        </motion.div>

        {/* Summary Card - full width, top position */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <Card className="bg-background/60 backdrop-blur-sm border-border/50 hover:border-border/80 transition-all duration-300">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Avatar */}
                <motion.div
                  className="shrink-0 mx-auto md:mx-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-primary to-accent p-[2px]">
                    <div className="w-full h-full rounded-2xl bg-background overflow-hidden">
                      <Image
                        src="/images/Profile.png"
                        alt={PERSONAL_INFO.name}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover rounded-2xl"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Name + Summary */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-1">
                    {PERSONAL_INFO.name}
                  </h3>
                  <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-muted-foreground mb-4">
                    <span>Software Engineer</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span>MS CS Student</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {PERSONAL_INFO.location}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {PERSONAL_INFO.aboutMe.summary
                      .slice(0, 2)
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-sm text-muted-foreground leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Highlights Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-8"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
              whileHover={{ y: -4 }}
              onHoverStart={playHoverSound}
            >
              <item.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
              <p className="text-xl font-bold">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.sublabel}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="bg-background/60 backdrop-blur-sm border-border/50 hover:border-border/80 transition-all duration-300">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Education</h3>
              </div>

              {/* Education Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {EDUCATION.map((edu, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-lg bg-muted/30 border border-border/30 hover:border-border/50 transition-all"
                    whileHover={{ y: -2 }}
                    onHoverStart={playHoverSound}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{edu.school}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {edu.degree}
                          </p>
                        </div>
                        <Badge
                          variant={
                            edu.duration.includes("2027")
                              ? "default"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {edu.duration.includes("2027")
                            ? "Current"
                            : "Completed"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{edu.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{edu.duration}</span>
                        </div>
                      </div>

                      {/* GPA */}
                      {edu.gpa && (
                        <div
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            index === 0
                              ? "bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
                              : "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Award
                              className={`w-4 h-4 ${
                                index === 0
                                  ? "text-primary"
                                  : "text-green-500"
                              }`}
                            />
                            <span className="text-sm font-medium">
                              {index === 0 ? "Current GPA" : "Final GPA"}
                            </span>
                          </div>
                          <div className="text-right">
                            <span
                              className={`text-lg font-bold ${
                                index === 0
                                  ? "text-primary"
                                  : "text-green-500"
                              }`}
                            >
                              {edu.gpa.split("/")[0]}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              /{edu.gpa.split("/")[1]}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Coursework */}
                      {edu.coursework && edu.coursework.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
                          {edu.coursework.map((course, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs px-2 py-0.5"
                            >
                              {course}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}