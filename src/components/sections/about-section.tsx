// src/components/sections/about-section.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Calendar,
  Sparkles,
  User,
  Award,
  TrendingUp,
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

  return (
    <section id="about" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Standardized Background - SAME as ExperienceSection */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header - standardized */}
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
            Just a Northeastern grad student who happens to have 4+ years of
            making computers do things they probably shouldn&apos;t
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Profile Card - standardized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full bg-background/60 backdrop-blur-sm border-border/50 hover:border-border/80 transition-all duration-300">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="space-y-6 flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Personal Profile</h3>
                  </div> 

                  {/* Avatar */}
                  <div className="flex justify-center">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-accent p-[2px]">
                        <div className="w-full h-full rounded-2xl bg-background overflow-hidden">
                          <Image
                            src="/images/Profile.png"
                            alt={PERSONAL_INFO.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover rounded-2xl"
                            priority
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="text-center space-y-2">
                    <h4 className="text-xl font-bold">{PERSONAL_INFO.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Software Engineer | MS CS Student
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{PERSONAL_INFO.location}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-3 pt-4 border-t border-border/50 flex-1">
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
              </CardContent>
            </Card>
          </motion.div>

          {/* Education Card - standardized with GPA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full bg-background/60 backdrop-blur-sm border-border/50 hover:border-border/80 transition-all duration-300">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="space-y-6 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Education Journey</h3>
                  </div>

                  {/* Education Items */}
                  <div className="space-y-4 flex-1 flex flex-col">
                    {EDUCATION.map((edu, index) => (
                      <motion.div
                        key={index}
                        className="p-4 rounded-lg bg-muted/30 border border-border/30 hover:border-border/50 transition-all flex-1"
                        whileHover={{ y: -2 }}
                        onHoverStart={playHoverSound}
                      >
                        <div className="space-y-3 h-full flex flex-col">
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

                          {/* GPA Section */}
                          {index === 0 ? (
                            // Northeastern University - Current GPA
                            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">
                                  Current GPA
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-lg font-bold text-primary">
                                  3.67
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  /4.0
                                </span>
                              </div>
                            </div>
                          ) : (
                            // Manipal University - Completed
                            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-medium">
                                  Final GPA
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-lg font-bold text-green-500">
                                  3.8
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  /4.0
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Coursework - only show if exists */}
                          {edu.coursework.length > 0 && (
                            <div className="flex-1 flex flex-col justify-end">
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
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Overall Academic Stats */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 rounded-lg bg-muted/30">
                        <TrendingUp className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <p className="text-xs font-semibold">
                          Academic Standing
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Excellent
                        </p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/30">
                        <Award className="w-4 h-4 mx-auto mb-1 text-accent" />
                        <p className="text-xs font-semibold">Research Focus</p>
                        <p className="text-xs text-muted-foreground">AI/ML</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
