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
  Sparkles,
  Code2,
  Layers,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PROJECTS } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectModalProps {
  project: (typeof PROJECTS)[0];
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { playClickSound, playHoverSound } = useSoundEffect();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // Prioritize screenshots over main image
  const allImages = project.screenshots && project.screenshots.length > 0 
    ? project.screenshots 
    : project.image 
      ? [project.image]
      : [];

  // Calculate how many slides we need (2 images per slide)
  const totalSlides = Math.ceil(allImages.length / 2);

  const handlePrevSlide = () => {
    playClickSound();
    setCurrentSlideIndex((prev) => 
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    playClickSound();
    setCurrentSlideIndex((prev) => 
      prev === totalSlides - 1 ? 0 : prev + 1
    );
  };

  // Get the current pair of images to display
  const getCurrentImages = () => {
    const startIndex = currentSlideIndex * 2;
    return allImages.slice(startIndex, startIndex + 2);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-[95vw] md:max-w-7xl max-h-[90vh] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl">
            {/* Close Button */}
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

            {/* Content Container - 40/60 split */}
            <div className="relative flex flex-col lg:flex-row h-full max-h-[90vh]">
              {/* Left Side - Image Slider (40%) */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:w-[40%] p-6 lg:p-8 bg-muted/30 flex flex-col justify-center"
              >
                {/* Project Title for Mobile */}
                <div className="lg:hidden mb-4">
                  <h2 className="text-2xl font-bold text-gradient">
                    {project.title}
                  </h2>
                </div>

                {/* Image Slider Container */}
                <div className="relative">
                  {/* Slider Viewport */}
                  <div className="relative overflow-hidden rounded-xl bg-background/50 min-h-[300px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlideIndex}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                        className="h-full"
                      >
                        {allImages.length === 1 ? (
                          /* Single image - full width */
                          <div className="relative w-full h-[300px] lg:h-[400px]">
                            <Image
                              src={allImages[0]}
                              alt={`${project.title} - Main Image`}
                              fill
                              className="object-contain p-4"
                            />
                            <div className="absolute bottom-3 right-3">
                              <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
                                1 of 1
                              </Badge>
                            </div>
                          </div>
                        ) : (
                          /* Multiple images - grid layout */
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 h-[300px] lg:h-[400px]">
                            {getCurrentImages().map((image, index) => (
                              <div
                                key={`${currentSlideIndex}-${index}`}
                                className="relative bg-background/30 rounded-lg border border-border/20 overflow-hidden"
                              >
                                <Image
                                  src={image}
                                  alt={`${project.title} - Image ${currentSlideIndex * 2 + index + 1}`}
                                  fill
                                  className="object-contain p-2"
                                />
                                {/* Image number overlay */}
                                <div className="absolute bottom-2 right-2">
                                  <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
                                    {currentSlideIndex * 2 + index + 1}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                            {/* If odd number of images on last slide, fill the empty spot */}
                            {getCurrentImages().length === 1 && currentSlideIndex === totalSlides - 1 && (
                              <div className="relative bg-muted/20 rounded-lg border border-border/10 flex items-center justify-center">
                                <div className="text-center">
                                  <Layers className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                                  <p className="text-xs text-muted-foreground/50">No more images</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation Arrows - Only show if more than 1 slide needed */}
                  {allImages.length > 1 && totalSlides > 1 && (
                    <>
                      <button
                        onClick={handlePrevSlide}
                        onMouseEnter={playHoverSound}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 hover:bg-background shadow-lg transition-all hover:scale-110"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={handleNextSlide}
                        onMouseEnter={playHoverSound}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 hover:bg-background shadow-lg transition-all hover:scale-110"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Slide Indicators - Only show if multiple slides */}
                {allImages.length > 2 && totalSlides > 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center gap-2 mt-4"
                  >
                    {Array.from({ length: totalSlides }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          playClickSound();
                          setCurrentSlideIndex(index);
                        }}
                        onMouseEnter={playHoverSound}
                        className="group relative"
                      >
                        <div
                          className={cn(
                            "transition-all duration-300",
                            currentSlideIndex === index
                              ? "w-8 h-2 rounded-full bg-primary"
                              : "w-2 h-2 rounded-full bg-primary/30 hover:bg-primary/50"
                          )}
                        />
                        {/* Tooltip showing which images */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <Badge variant="secondary" className="text-xs whitespace-nowrap">
                            Images {index * 2 + 1}-{Math.min(index * 2 + 2, allImages.length)}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Image count info */}
                {allImages.length > 1 && (
                  <div className="text-center mt-3">
                    <p className="text-xs text-muted-foreground">
                      {allImages.length === 1 
                        ? "1 image" 
                        : totalSlides > 1 
                          ? `Showing ${currentSlideIndex * 2 + 1}-${Math.min(currentSlideIndex * 2 + 2, allImages.length)} of ${allImages.length} images`
                          : `${allImages.length} images`
                      }
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-3 justify-center mt-6"
                >
                  {project.github && !project.isprivate && (
                    <motion.button
                      onClick={() => {
                        playClickSound();
                        window.open(project.github, "_blank");
                      }}
                      onMouseEnter={playHoverSound}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 transition-all text-sm font-medium flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </motion.button>
                  )}
                  
                  {project.isprivate && (
                    <div className="px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm font-medium flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <Code2 className="w-4 h-4" />
                      <span>Private</span>
                    </div>
                  )}
                  
                  {project.live && (
                    <motion.button
                      onClick={() => {
                        playClickSound();
                        if (project.live) window.open(project.live, "_blank");
                      }}
                      onMouseEnter={playHoverSound}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </motion.button>
                  )}
                </motion.div>
              </motion.div>

              {/* Right Side - Project Details (60%) */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:w-[60%] p-6 lg:p-8 overflow-y-auto"
              >
                <div className="space-y-6 max-w-2xl">
                  {/* Title for Desktop */}
                  <div className="hidden lg:block">
                    <motion.h2 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl lg:text-4xl font-bold mb-3 text-gradient"
                    >
                      {project.title}
                    </motion.h2>
                    
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

                  {/* Overview */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-primary/10">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">Overview</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Key Achievements */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Key Achievements</h3>
                    <div className="space-y-2">
                      {project.highlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                          className="flex items-start gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technology Stack */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.5 + index * 0.03,
                            type: "spring",
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        </motion.div>
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

// Rest of the ProjectsSection component remains the same...
export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playClickSound, playHoverSound } = useSoundEffect();
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);

  return (
    <section id="projects" className="py-12 relative" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 px-5 py-2 text-sm font-medium border-border/50 bg-background/50 backdrop-blur text-foreground" variant="outline">
            <Folder className="w-3 h-3 mr-1 text-foreground" />
            Projects
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What I&apos;ve <span className="text-gradient">Built</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-world applications that solve real problems
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              onMouseEnter={playHoverSound}
            >
              <Card
                className="group h-full bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => {
                  playClickSound();
                  setSelectedProject(project);
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Layers className="w-16 h-16 text-primary/30" />
                    </div>
                  )}

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-white font-medium"
                    >
                      View Details →
                    </motion.div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={project.live ? "default" : "secondary"}
                      className="bg-background/80 backdrop-blur"
                    >
                      {project.duration}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack Preview */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 text-sm">
                    {project.github && !project.isprivate && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playClickSound();
                          window.open(project.github, "_blank");
                        }}
                        className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </button>
                    )}
                    
                    {project.isprivate && (
                      <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 text-xs">
                        <Code2 className="w-3 h-3" />
                        <span>Private</span>
                      </span>
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
                        <ExternalLink className="w-4 h-4" />
                        <span>Live</span>
                      </button>
                    )}
                    <button className="ml-auto flex items-center gap-1 text-primary">
                      <span className="text-sm font-medium">
                        Learn More
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}