// src/components/sections/experience-section.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  ArrowRight,
  Code2,
  Building2,
  Rocket,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCE } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playHoverSound } = useSoundEffect();

  const roleIcons = [Code2, Rocket, Building2];

  return (
    <section
      id="experience"
      className="py-20 relative overflow-hidden"
      ref={ref}
    >
      {/* Standardized Background - same as other sections */}
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
            <Briefcase className="w-3 h-3 mr-2" />
            Experience
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            4+ years of building scalable applications and leading development teams
          </p>
        </motion.div>

        {/* Experience Cards - standardized card styling */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {EXPERIENCE.map((exp, index) => {
              const Icon = roleIcons[index % roleIcons.length];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.1,
                  }}
                  onMouseEnter={playHoverSound}
                  className="group"
                >
                  {/* Standardized Card - matching other sections */}
                  <Card className="h-full bg-background/60 backdrop-blur-sm border-border/50 hover:border-border/80 transition-all duration-300">
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Header Section */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {exp.title}
                              </h3>
                              <p className="text-sm font-medium text-primary">
                                {exp.company}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{exp.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description - standardized height */}
                      <div className="flex-1 space-y-2 mb-4">
                        {exp.description.slice(0, 3).map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <ArrowRight className="w-3 h-3 text-primary/60 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-2">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies - standardized */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.slice(0, 5).map((tech, idx) => (
                            <Badge 
                              key={idx} 
                              variant="secondary" 
                              className="text-xs px-2 py-0.5"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {exp.technologies.length > 5 && (
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              +{exp.technologies.length - 5}
                            </Badge>
                          )}
                        </div>

                        {/* Achievements bar - standardized */}
                        {exp.achievements && (
                          <div className="flex items-center gap-3 pt-3 border-t border-border/50 text-xs">
                            {Object.entries(exp.achievements).slice(0, 1).map(([key, value]) => (
                              <div key={key} className="flex items-center gap-1">
                                <Zap className="w-3 h-3 text-yellow-500" />
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>


        </div>
      </div>
    </section>
  );
}