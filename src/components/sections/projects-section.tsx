// src/components/sections/projects-section.tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Folder,
  Github,
  ExternalLink,
  Calendar,
  User,
  ChevronRight,
  ChevronLeft,
  X,
  Lock,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PROJECTS } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";
import Image from "next/image";

function ProjectImage({
  project,
  index,
  className,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  className?: string;
}) {
  const [imgError, setImgError] = useState(false);

  if (!project.image || imgError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted",
          className
        )}
      >
        <div className="text-center px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-muted-foreground tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground/60 mt-2">{project.role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-contain"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

interface ProjectModalProps {
  project: (typeof PROJECTS)[0];
  projectIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, projectIndex, isOpen, onClose }: ProjectModalProps) {
  const { playClickSound } = useSoundEffect();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const allImages =
    project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : project.image
      ? [project.image]
      : [];

  const totalSlides = Math.ceil(allImages.length / 2);

  const getCurrentImages = () => {
    const startIndex = currentSlideIndex * 2;
    return allImages.slice(startIndex, startIndex + 2);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-[95vw] md:max-w-5xl max-h-[90vh] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl">
            <motion.button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 backdrop-blur-xl border border-border/50 hover:bg-background/90 transition-all group"
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-4 h-4 text-foreground/80 group-hover:text-foreground transition-colors" />
            </motion.button>

            <div className="relative flex flex-col lg:flex-row h-full max-h-[90vh]">
              {/* Left - Images */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="lg:w-[40%] p-6 bg-muted/30 flex flex-col justify-center"
              >
                <div className="lg:hidden mb-4">
                  <h2 className="text-2xl font-bold">{project.title}</h2>
                </div>

                <div className="relative">
                  <div className="relative overflow-hidden rounded-xl bg-background/50 min-h-[280px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlideIndex}
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -200, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        {allImages.length === 0 ? (
                          <div className="h-[280px] lg:h-[360px] flex items-center justify-center bg-muted rounded-xl">
                            <div className="text-center px-6">
                              <h3 className="text-3xl font-bold text-muted-foreground">
                                {project.title}
                              </h3>
                              <p className="text-sm text-muted-foreground/60 mt-2">
                                {project.role}
                              </p>
                            </div>
                          </div>
                        ) : allImages.length === 1 ? (
                          <div className="relative w-full h-[280px] lg:h-[360px]">
                            <Image
                              src={allImages[0]}
                              alt={project.title}
                              fill
                              className="object-contain p-4"
                            />
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 p-2 h-[280px] lg:h-[360px]">
                            {getCurrentImages().map((image, idx) => (
                              <div
                                key={`${currentSlideIndex}-${idx}`}
                                className="relative bg-background/30 rounded-lg border border-border/20 overflow-hidden"
                              >
                                <Image
                                  src={image}
                                  alt={`${project.title} - ${currentSlideIndex * 2 + idx + 1}`}
                                  fill
                                  className="object-contain p-2"
                                />
                                <div className="absolute bottom-2 right-2">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs bg-background/80 backdrop-blur-sm"
                                  >
                                    {currentSlideIndex * 2 + idx + 1}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {totalSlides > 1 && (
                    <>
                      <button
                        onClick={() => {
                          playClickSound();
                          setCurrentSlideIndex((p) =>
                            p === 0 ? totalSlides - 1 : p - 1
                          );
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/90 border border-border/50 hover:bg-background shadow-lg transition-all hover:scale-110"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          playClickSound();
                          setCurrentSlideIndex((p) =>
                            p === totalSlides - 1 ? 0 : p + 1
                          );
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/90 border border-border/50 hover:bg-background shadow-lg transition-all hover:scale-110"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {totalSlides > 1 && (
                  <div className="flex justify-center gap-1.5 mt-4">
                    {Array.from({ length: totalSlides }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          playClickSound();
                          setCurrentSlideIndex(i);
                        }}
                        className={cn(
                          "rounded-full transition-all duration-300",
                          currentSlideIndex === i
                            ? "w-6 h-2 bg-primary"
                            : "w-2 h-2 bg-primary/30 hover:bg-primary/50"
                        )}
                      />
                    ))}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3 justify-center mt-6">
                  {project.github && !project.isprivate && (
                    <motion.button
                      onClick={() => {
                        playClickSound();
                        window.open(project.github, "_blank");
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-background/50 border border-border/50 hover:bg-background/80 transition-all text-sm font-medium flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </motion.button>
                  )}
                  {project.isprivate && (
                    <div className="px-4 py-2 rounded-lg bg-secondary border border-border text-sm font-medium flex items-center gap-2 text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      Private Repo
                    </div>
                  )}
                  {project.live && (
                    <motion.button
                      onClick={() => {
                        playClickSound();
                        if (project.live) window.open(project.live, "_blank");
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      Live Demo
                    </motion.button>
                  )}
                </div>
              </motion.div>

              {/* Right - Details */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="lg:w-[60%] p-6 lg:p-8 overflow-y-auto"
              >
                <div className="space-y-6 max-w-2xl">
                  <div className="hidden lg:block">
                    <h2 className="text-3xl font-bold mb-3">{project.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {project.duration}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <User className="w-3 h-3 mr-1" />
                        {project.role}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">
                      Overview
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                      Key Achievements
                    </h3>
                    <div className="space-y-2">
                      {project.highlights.map((highlight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">
                            {highlight}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playClickSound, playHoverSound } = useSoundEffect();
  const [selectedProject, setSelectedProject] = useState<{
    project: (typeof PROJECTS)[0];
    index: number;
  } | null>(null);

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <Badge className="mb-4 px-4 py-1.5" variant="outline">
            <Folder className="w-3 h-3 mr-2" />
            Projects
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What I&apos;ve <span className="text-gradient">Built</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-world applications that solve real problems
          </p>
        </motion.div>

        {/* Featured project - Supatrack (full width) */}
        {PROJECTS.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-5xl mx-auto mb-8"
          >
            <Card
              className="group bg-card border-border hover:border-foreground/20 transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => {
                playClickSound();
                setSelectedProject({ project: PROJECTS[0], index: 0 });
              }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative md:w-2/5 h-56 md:h-auto bg-muted overflow-hidden">
                  <ProjectImage
                    project={PROJECTS[0]}
                    index={0}
                    className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                  />
                  {PROJECTS[0].live && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-xs">
                        <span className="relative flex h-1.5 w-1.5 mr-1.5">
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-foreground" />
                        </span>
                        Live
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="md:w-3/5 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Badge variant="outline" className="text-xs mb-2">
                        Featured Project
                      </Badge>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {PROJECTS[0].title}
                      </h3>
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {PROJECTS[0].duration}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {PROJECTS[0].description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {PROJECTS[0].technologies.slice(0, 6).map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {PROJECTS[0].technologies.length > 6 && (
                      <Badge variant="secondary" className="text-xs opacity-60">
                        +{PROJECTS[0].technologies.length - 6}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    {PROJECTS[0].isprivate && (
                      <span className="flex items-center gap-1 text-muted-foreground text-xs">
                        <Lock className="w-3 h-3" />
                        Private
                      </span>
                    )}
                    {PROJECTS[0].github && !PROJECTS[0].isprivate && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playClickSound();
                          window.open(PROJECTS[0].github, "_blank");
                        }}
                        className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </button>
                    )}
                    {PROJECTS[0].live && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playClickSound();
                          if (PROJECTS[0].live) window.open(PROJECTS[0].live, "_blank");
                        }}
                        className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        App Store
                      </button>
                    )}
                    <span className="ml-auto flex items-center gap-1 text-primary text-sm font-medium">
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Other projects grid */}
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PROJECTS.slice(1).map((project, index) => {
            const actualIndex = index + 1;
            return (
              <motion.div
                key={actualIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                onMouseEnter={playHoverSound}
              >
                <Card
                  className="group h-full bg-card border-border hover:border-foreground/20 transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={() => {
                    playClickSound();
                    setSelectedProject({ project, index: actualIndex });
                  }}
                >
                  {/* Image / Fallback */}
                  <div className="relative h-40 overflow-hidden">
                    <ProjectImage
                      project={project}
                      index={actualIndex}
                      className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-background/80 backdrop-blur-sm"
                      >
                        {project.duration.split(" - ")[0]}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="text-base font-bold mb-1.5 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs px-1.5 py-0"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge
                          variant="secondary"
                          className="text-xs px-1.5 py-0 opacity-60"
                        >
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs pt-2 border-t border-border/40">
                      {project.isprivate && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Lock className="w-3 h-3" />
                          Private
                        </span>
                      )}
                      {project.github && !project.isprivate && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playClickSound();
                            window.open(project.github, "_blank");
                          }}
                          className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Code
                        </button>
                      )}
                      {project.live && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playClickSound();
                            if (project.live) window.open(project.live, "_blank");
                          }}
                          className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          Live
                        </button>
                      )}
                      <span className="ml-auto flex items-center gap-1 text-primary font-medium">
                        Details
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject.project}
          projectIndex={selectedProject.index}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}