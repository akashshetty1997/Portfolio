"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Github,
  Calendar,
  User,
  ChevronRight,
  ChevronLeft,
  X,
  Lock,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PROJECTS } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Strict animations
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

// Brutalist Image Component
function ProjectImage({
  project,
  className,
}: {
  project: (typeof PROJECTS)[0];
  className?: string;
}) {
  const [imgError, setImgError] = useState(false);

  if (!project.image || imgError) {
    return (
      <div className={cn("flex items-center justify-center bg-muted/50 border border-border w-full h-full", className)}>
        <div className="text-center px-4">
          <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-muted-foreground">
            {project.title}
          </h3>
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground mt-2 uppercase">NO IMAGE DATA</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-muted group", className)}>
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
        onError={() => setImgError(true)}
      />
      {/* Stark Overlay Border */}
      <div className="absolute inset-0 border-[8px] border-background mix-blend-overlay opacity-50 pointer-events-none" />
    </div>
  );
}

// Brutalist Modal/Dossier
interface ProjectModalProps {
  project: (typeof PROJECTS)[0];
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { playClickSound } = useSoundEffect();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const allImages = project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : project.image ? [project.image] : [];

  const totalSlides = Math.ceil(allImages.length / 2);

  const getCurrentImages = () => {
    const startIndex = currentSlideIndex * 2;
    return allImages.slice(startIndex, startIndex + 2);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-[100vw] sm:max-w-[95vw] md:max-w-6xl max-h-[100vh] md:max-h-[90vh] p-0 overflow-hidden bg-background border-border shadow-2xl rounded-none flex flex-col">
            
            {/* Hidden Title for Accessibility */}
            <DialogTitle className="sr-only">{project.title} Details</DialogTitle>

            {/* Brutalist Header Bar */}
            <div className="flex justify-between items-center border-b border-border px-4 py-3 bg-foreground text-background">
              <span className="font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-background animate-pulse" />
                System_Viewer: {project.title}
              </span>
              <button
                onClick={() => { playClickSound(); onClose(); }}
                className="hover:rotate-90 transition-transform duration-300 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden">
              
              {/* Left Column - Images */}
              <div className="lg:w-1/2 bg-muted/20 border-r border-border flex flex-col p-6 relative">
                <div className="flex-1 relative min-h-[300px] lg:min-h-0 w-full border border-border bg-background overflow-hidden group">
                   <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlideIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                        className="absolute inset-0 w-full h-full"
                      >
                        {allImages.length === 0 ? (
                           <div className="flex items-center justify-center w-full h-full">
                             <span className="font-mono text-xs text-muted-foreground tracking-widest">AWAITING_VISUALS</span>
                           </div>
                        ) : allImages.length === 1 ? (
                          <Image src={allImages[0]} alt={project.title} fill className="object-contain p-4 grayscale group-hover:grayscale-0 transition-all duration-700" />
                        ) : (
                          <div className="grid grid-cols-2 gap-px bg-border w-full h-full">
                            {getCurrentImages().map((image, idx) => (
                              <div key={idx} className="relative bg-background">
                                <Image src={image} alt={`Screenshot ${idx}`} fill className="object-contain p-4 grayscale group-hover:grayscale-0 transition-all duration-700" />
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                   </AnimatePresence>
                </div>

                {/* Slider Controls (if multiple) */}
                {totalSlides > 1 && (
                  <div className="flex justify-between items-center mt-4 border-t border-border pt-4">
                    <button onClick={() => { playClickSound(); setCurrentSlideIndex(p => p === 0 ? totalSlides - 1 : p - 1); }} className="font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1">
                      <ChevronLeft className="w-4 h-4" /> PREV
                    </button>
                    <span className="font-mono text-[10px] text-muted-foreground">{currentSlideIndex + 1} / {totalSlides}</span>
                    <button onClick={() => { playClickSound(); setCurrentSlideIndex(p => p === totalSlides - 1 ? 0 : p + 1); }} className="font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1">
                      NEXT <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column - Data Dossier */}
              <div className="lg:w-1/2 p-6 lg:p-10 overflow-y-auto">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                  {project.title}
                </h2>
                
                <div className="flex flex-wrap gap-4 border-b border-border pb-6 mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Deployment</span>
                    <span className="font-bold text-sm flex items-center gap-2"><Calendar className="w-3.5 h-3.5"/> {project.duration}</span>
                  </div>
                  <div className="w-px bg-border" />
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Role</span>
                    <span className="font-bold text-sm flex items-center gap-2"><User className="w-3.5 h-3.5"/> {project.role}</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-2">System Overview</span>
                    <p className="text-foreground/80 leading-relaxed text-sm md:text-base">{project.longDescription}</p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-4">Core Architecture</span>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <Badge key={i} variant="outline" className="rounded-none border-border bg-transparent text-[10px] font-mono tracking-widest uppercase">{tech}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-3">Execution Highlights</span>
                    <ul className="space-y-3 border-l-2 border-primary/30 pl-4">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="text-sm text-foreground/80 leading-relaxed">{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-2 gap-4 mt-10 pt-6 border-t border-border">
                   {project.github && !project.isprivate && (
                    <button onClick={() => { playClickSound(); window.open(project.github, "_blank"); }} className="p-4 border border-border hover:bg-foreground hover:text-background transition-colors flex flex-col items-center justify-center gap-2 group">
                      <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-xs uppercase tracking-widest">Source Code</span>
                    </button>
                   )}
                   {project.isprivate && (
                    <div className="p-4 border border-border bg-muted/20 flex flex-col items-center justify-center gap-2 text-muted-foreground opacity-70">
                      <Lock className="w-5 h-5" />
                      <span className="font-mono text-xs uppercase tracking-widest">Classified</span>
                    </div>
                   )}
                   {project.live && (
                    <button onClick={() => { playClickSound(); window.open(project.live!, "_blank"); }} className="p-4 bg-foreground text-background border border-foreground hover:bg-transparent hover:text-foreground transition-colors flex flex-col items-center justify-center gap-2 group">
                      <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-xs uppercase tracking-widest">Initialize Live Demo</span>
                    </button>
                   )}
                </div>
              </div>

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
  const [selectedProject, setSelectedProject] = useState<{ project: (typeof PROJECTS)[0]; index: number } | null>(null);

  // Split projects
  const featuredProject = PROJECTS[0];
  const gridProjects = PROJECTS.slice(1);

  return (
    <section id="projects" className="relative min-h-screen bg-background pt-24 pb-32 overflow-hidden border-t border-border" ref={ref}>
      {/* Massive Background Typography Watermark */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none flex justify-center">
        <h2 className="text-[clamp(8rem,20vw,25rem)] font-black leading-none whitespace-nowrap">
          PROJECTS
        </h2>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4 block">
              03 // The Work
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Selected <span className="text-transparent" style={{ WebkitTextStroke: "1.5px hsl(var(--foreground))" }}>Builds</span>
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-sm font-mono text-muted-foreground uppercase flex flex-col items-start md:items-end">
            <span>Architecture & Engineering</span>
            <span>Real-World Applications</span>
          </motion.div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="border-t-[2px] border-foreground">
          
          {/* Featured Project (Full Width Row) */}
          {featuredProject && (
            <motion.div variants={itemVariants} className="group border-b border-border flex flex-col lg:flex-row" onMouseEnter={playHoverSound}>
               {/* Featured Image */}
               <div 
                  className="w-full lg:w-3/5 aspect-video lg:aspect-auto relative border-b lg:border-b-0 lg:border-r border-border cursor-pointer overflow-hidden"
                  onClick={() => { playClickSound(); setSelectedProject({ project: featuredProject, index: 0 }); }}
               >
                 <ProjectImage project={featuredProject} />
                 <div className="absolute top-4 left-4 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase px-3 py-1 shadow-lg z-10">
                   Primary Output
                 </div>
               </div>
               
               {/* Featured Content */}
               <div className="w-full lg:w-2/5 flex flex-col justify-between p-6 lg:p-10 hover:bg-secondary/10 transition-colors">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                       <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none group-hover:text-primary transition-colors cursor-pointer" onClick={() => { playClickSound(); setSelectedProject({ project: featuredProject, index: 0 }); }}>
                         {featuredProject.title}
                       </h3>
                    </div>
                    <p className="text-foreground/80 leading-relaxed mb-8 text-sm md:text-base">
                      {featuredProject.description}
                    </p>
                    <div className="mb-8">
                       <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-3 border-b border-foreground/10 pb-2">Core Stack</span>
                       <div className="flex flex-wrap gap-2">
                         {featuredProject.technologies.slice(0, 6).map((tech, idx) => (
                           <Badge key={idx} variant="outline" className="rounded-none border-border bg-transparent text-[10px] font-mono tracking-widest uppercase">{tech}</Badge>
                         ))}
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-border">
                    <button onClick={() => { playClickSound(); setSelectedProject({ project: featuredProject, index: 0 }); }} className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors py-2 border border-transparent hover:border-primary">
                      Inspect <ArrowRight className="w-3 h-3" />
                    </button>
                    {featuredProject.live && (
                      <button onClick={() => { playClickSound(); window.open(featuredProject.live!, "_blank"); }} className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest bg-foreground text-background hover:bg-transparent hover:text-foreground border border-foreground transition-colors py-2">
                        Execute Live
                      </button>
                    )}
                  </div>
               </div>
            </motion.div>
          )}

          {/* Secondary Projects Grid (Strict CSS Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {gridProjects.map((project, index) => {
              const actualIndex = index + 1;
              return (
                <motion.div 
                  key={actualIndex} 
                  variants={itemVariants} 
                  className="group border-b border-r border-border hover:bg-secondary/10 transition-colors flex flex-col h-full cursor-pointer"
                  onMouseEnter={playHoverSound}
                  onClick={() => { playClickSound(); setSelectedProject({ project, index: actualIndex }); }}
                >
                  <div className="aspect-[4/3] w-full border-b border-border relative overflow-hidden">
                    <ProjectImage project={project} />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Build {actualIndex.toString().padStart(2, '0')}</span>
                        {project.isprivate && <Lock className="w-3 h-3 text-muted-foreground" />}
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tighter mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-foreground/70 line-clamp-2 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="font-mono text-[9px] uppercase tracking-widest border border-border px-1.5 py-0.5 text-muted-foreground">{tech}</span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground py-0.5">+{project.technologies.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject.project}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}