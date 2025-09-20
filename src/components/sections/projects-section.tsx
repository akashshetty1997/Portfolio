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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-[95vw] md:max-w-7xl max-h-[95vh] p-0 overflow-hidden bg-gradient-to-br from-background/98 via-background/95 to-background/90 backdrop-blur-2xl border-0 shadow-2xl">
            {/* Animated Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            {/* Glass morphism overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.35_0.15_280/0.1),transparent_70%),radial-gradient(ellipse_at_bottom_left,oklch(0.577_0.245_27.325/0.1),transparent_70%)] pointer-events-none" />

            {/* Close Button */}
            <motion.button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="absolute top-4 right-4 z-50 p-3 rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20 transition-all group"
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5 text-foreground/80 group-hover:text-foreground transition-colors" />
            </motion.button>

            {/* Content Container */}
            <div className="relative flex flex-col lg:flex-row h-full">
              {/* Left Side - Enhanced Image Gallery */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2 p-6 lg:p-10 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
              >
                <div className="h-full flex flex-col justify-center space-y-6">
                  {/* Project Title for Mobile */}
                  <div className="lg:hidden mb-4">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                      {project.title}
                    </h2>
                  </div>

                  {/* Main Image with Effects */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="relative group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity animate-gradient bg-[length:200%_auto]" />
                    
                    <div className="relative aspect-video bg-gradient-to-br from-background/50 to-background/30 rounded-2xl overflow-hidden shadow-2xl">
                      {project.image ? (
                        <>
                          <Image
                            src={project.screenshots?.[activeImageIndex] || project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500"
                          />
                          {/* Glass overlay with gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                          
                          {/* Floating UI Elements */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="absolute bottom-4 left-4 flex gap-2"
                          >
                            <Badge className="bg-white/20 dark:bg-black/20 backdrop-blur-xl border-white/30 text-white">
                              {project.role}
                            </Badge>
                          </motion.div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                          <Layers className="w-24 h-24 text-primary/30 animate-pulse" />
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Enhanced Thumbnail Gallery */}
                  {project.screenshots && project.screenshots.length > 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex gap-3 justify-center"
                    >
                      {project.screenshots.map((screenshot, index) => (
                        <motion.button
                          key={index}
                          onClick={() => {
                            playClickSound();
                            setActiveImageIndex(index);
                          }}
                          onMouseEnter={playHoverSound}
                          whileHover={{ scale: 1.1, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            "relative w-24 h-16 rounded-xl overflow-hidden transition-all duration-300",
                            activeImageIndex === index
                              ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xl"
                              : "opacity-60 hover:opacity-100"
                          )}
                        >
                          <Image
                            src={screenshot}
                            alt={`Screenshot ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          {activeImageIndex === index && (
                            <motion.div
                              layoutId="activeThumb"
                              className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
                            />
                          )}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}

                  {/* Floating Action Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-4 justify-center"
                  >
                    {/* Only show GitHub button if project is not private */}
                    {project.github && !project.isprivate && (
                      <motion.button
                        onClick={() => {
                          playClickSound();
                          window.open(project.github, "_blank");
                        }}
                        onMouseEnter={playHoverSound}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-6 py-3 rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20 transition-all overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2 font-medium">
                          <Github className="w-5 h-5" />
                          View Code
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    )}
                    
                    {/* Show private badge if project is private */}
                    {project.isprivate && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-6 py-3 rounded-2xl bg-amber-500/10 dark:bg-amber-500/10 backdrop-blur-xl border border-amber-500/20 dark:border-amber-500/20"
                      >
                        <span className="flex items-center gap-2 font-medium text-amber-600 dark:text-amber-400">
                          <Code2 className="w-5 h-5" />
                          Private Repository
                        </span>
                      </motion.div>
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
                        className="group relative px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-medium overflow-hidden shadow-lg hover:shadow-xl transition-all"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <ExternalLink className="w-5 h-5" />
                          Live Demo
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Side - Enhanced Project Details */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2 p-6 lg:p-10 overflow-y-auto max-h-[85vh] relative"
              >
                <div className="space-y-8">
                  {/* Title with Animated Gradient */}
                  <div className="hidden lg:block">
                    <motion.h2 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]"
                    >
                      {project.title}
                    </motion.h2>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-wrap gap-3"
                    >
                      <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{project.duration}</span>
                      </div>
                      <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-accent/10 to-primary/10 backdrop-blur-sm">
                        <User className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">{project.role}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Enhanced Overview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Overview</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {project.longDescription}
                    </p>
                  </motion.div>

                  {/* Enhanced Highlights with Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold">Key Achievements</h3>
                    <div className="space-y-3">
                      {project.highlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.07 }}
                          whileHover={{ x: 10 }}
                          className="group p-4 rounded-2xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                              <ChevronRight className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                              {highlight}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Enhanced Tech Stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0.6 + index * 0.05,
                            type: "spring",
                            stiffness: 200,
                          }}
                          whileHover={{ scale: 1.1, y: -3 }}
                        >
                          <Badge 
                            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 via-background to-accent/10 hover:from-primary/20 hover:to-accent/20 border-primary/20 transition-all cursor-default text-foreground"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
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
  const [selectedProject, setSelectedProject] = useState<
    (typeof PROJECTS)[0] | null
  >(null);

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
            Project
          </Badge>

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
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
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
                    {/* Only show GitHub link if not private */}
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
                    
                    {/* Show private indicator */}
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
                        View Case Study
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