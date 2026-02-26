"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code2,
  Monitor,
  Server,
  Database,
  Cloud,
  Brain,
  CheckCircle,
  Terminal,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SKILLS } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";

// Strict, snappy animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] as const
    } 
  },
};

type CategoryConfig = {
  icon: React.ElementType;
  description: string;
};

const categoryConfig: Record<string, CategoryConfig> = {
  "Programming Languages": {
    icon: Code2,
    description: "Core programming languages for building robust applications",
  },
  "Frontend & Mobile": {
    icon: Monitor,
    description: "Creating beautiful, responsive interfaces that users love",
  },
  Backend: {
    icon: Server,
    description: "Architecting scalable server solutions and APIs",
  },
  Databases: {
    icon: Database,
    description: "Managing data efficiently with modern database systems",
  },
  "Cloud & DevOps": {
    icon: Cloud,
    description: "Deploying and scaling applications in the cloud",
  },
  "ML/AI & Data": {
    icon: Brain,
    description: "Integrating intelligent solutions and machine learning",
  },
  "Testing & Quality": {
    icon: CheckCircle,
    description: "Ensuring code quality through comprehensive testing",
  },
};

function getIconForCategory(categoryName: string): React.ElementType {
  return categoryConfig[categoryName]?.icon || Terminal;
}

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playHoverSound, playClickSound } = useSoundEffect();
  const categories = Object.keys(SKILLS);
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <section 
      id="skills" 
      className="relative min-h-screen bg-background pt-24 pb-32 overflow-hidden border-t border-border" 
      ref={ref}
    >
      {/* Massive Background Typography Watermark */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none flex justify-center">
        <h2 className="text-[clamp(8rem,20vw,25rem)] font-black leading-none whitespace-nowrap">
          SKILLS
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
              04 // The Arsenal
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              System <span className="text-transparent" style={{ WebkitTextStroke: "1.5px hsl(var(--foreground))" }}>Capabilities</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-mono text-muted-foreground uppercase flex flex-col items-start md:items-end"
          >
            <span>Comprehensive Toolkit</span>
            <span>Modern Application Stack</span>
          </motion.div>
        </div>

        {/* Brutalist Tabbed Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Category Grid (The Tabs) */}
            <TabsList className="w-full h-auto p-0 bg-transparent flex flex-wrap lg:grid lg:grid-cols-7 border-t border-l border-border mb-16 rounded-none">
              {categories.map((category) => {
                const Icon = getIconForCategory(category);
                const isActive = activeTab === category;

                return (
                  <TabsTrigger
                    key={category}
                    value={category}
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                    className={cn(
                      "flex-1 lg:flex-none flex flex-col items-center justify-center gap-3 p-6 min-h-[120px]",
                      "border-b border-r border-border rounded-none bg-background transition-all duration-300",
                      "data-[state=active]:bg-foreground data-[state=active]:text-background",
                      "hover:bg-secondary/20 data-[state=active]:hover:bg-foreground",
                      "group"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-6 h-6 transition-transform duration-300 group-hover:scale-110",
                        isActive ? "text-background" : "text-muted-foreground"
                      )}
                    />
                    <span className="font-mono text-[10px] tracking-widest uppercase text-center leading-tight">
                      {category.replace(" & ", " &\n")}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Content Area */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {categories.map((category) => {
                  if (activeTab !== category) return null;
                  
                  const config = categoryConfig[category];
                  const data = SKILLS[category as keyof typeof SKILLS];

                  return (
                    <TabsContent key={category} value={category} className="mt-0" asChild forceMount>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                        className="w-full"
                      >
                        {/* Active Category Meta */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-border pb-4 gap-4">
                          <div>
                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2">
                              {category}
                            </h3>
                            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                              {config?.description}
                            </p>
                          </div>
                          <div className="font-mono text-[10px] tracking-[0.2em] uppercase border border-foreground px-3 py-1 bg-foreground text-background">
                            {data.skills.length} Modules Indexed
                          </div>
                        </div>

                        {/* Brutalist Skills Grid */}
                        <motion.div 
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t border-l border-border"
                        >
                          {data.skills.map((skill, index) => (
                            <motion.div
                              key={skill}
                              variants={itemVariants}
                              onMouseEnter={playHoverSound}
                              className="group relative p-6 md:p-8 border-r border-b border-border hover:bg-foreground hover:text-background transition-colors duration-300 cursor-default flex flex-col justify-center items-center min-h-[120px] overflow-hidden"
                            >
                              {/* Hover scanning line effect */}
                              <div className="absolute top-0 left-0 w-full h-px bg-background/30 -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite]" />
                              
                              <span className="font-mono text-[10px] text-muted-foreground/50 absolute top-2 left-2 tracking-widest group-hover:text-background/50 transition-colors">
                                {(index + 1).toString().padStart(2, '0')}
                              </span>
                              
                              <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-center z-10">
                                {skill}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    </TabsContent>
                  );
                })}
              </AnimatePresence>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}