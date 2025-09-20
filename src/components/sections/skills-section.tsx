// src/components/sections/skills-section.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Smartphone,
  Monitor,
  Server,
  Database,
  Cloud,
  Brain,
  Wrench,
  Layers,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SKILLS } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";

// Icon mapping
type CategoryConfig = {
  icon: React.ElementType;
  color: string;
  description: string;
};
const categoryConfig: Record<string, CategoryConfig> = {
  "Mobile Development": {
    icon: Smartphone,
    color: "text-blue-500",
    description:
      "Building cross-platform mobile experiences with modern frameworks",
  },
  Frontend: {
    icon: Monitor,
    color: "text-purple-500",
    description: "Creating beautiful, responsive interfaces that users love",
  },
  Backend: {
    icon: Server,
    color: "text-green-500",
    description: "Architecting scalable server solutions and APIs",
  },
  Database: {
    icon: Database,
    color: "text-orange-500",
    description: "Managing data efficiently with modern database systems",
  },
  "Cloud & DevOps": {
    icon: Cloud,
    color: "text-sky-500",
    description: "Deploying and scaling applications in the cloud",
  },
  "ML/AI": {
    icon: Brain,
    color: "text-pink-500",
    description: "Integrating intelligent solutions and machine learning",
  },
  Tools: {
    icon: Wrench,
    color: "text-slate-500",
    description: "Essential tools for productivity and development",
  },
};

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playHoverSound, playClickSound } = useSoundEffect();
  const categories = Object.keys(SKILLS);
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <section id="skills" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Standardized Background - SAME as other sections */}
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
            <Code2 className="w-3 h-3 mr-2" />
            Skills
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern applications
          </p>
        </motion.div>

        {/* Tabbed Interface - standardized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Tab List - standardized styling */}
            <TabsList className="w-full h-auto p-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-8 bg-muted/30 border border-border/30">
              {categories.map((category) => {
                const config = categoryConfig[category];
                const Icon = config?.icon || Code2;

                return (
                  <TabsTrigger
                    key={category}
                    value={category}
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-2.5 rounded-lg",
                      "data-[state=active]:bg-background/60",
                      "data-[state=active]:border data-[state=active]:border-primary/20",
                      "hover:bg-background/40 transition-all duration-200"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 transition-colors",
                        activeTab === category
                          ? config?.color
                          : "text-muted-foreground"
                      )}
                    />
                    <span className="text-xs font-medium text-center hidden md:block">
                      {category.split(" ")[0]}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Tab Content - standardized card styling */}
            {categories.map((category) => {
              const config = categoryConfig[category];
              const Icon = config?.icon || Code2;
              const data = SKILLS[category as keyof typeof SKILLS];

              return (
                <TabsContent key={category} value={category} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Standardized Card - matching other sections */}
                    <Card className="bg-background/60 backdrop-blur-sm border-border/50 hover:border-border/80 transition-all duration-300">
                      {/* Category Header */}
                      <div className="p-6 border-b border-border/50">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className={cn("w-5 h-5", config?.color)} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">
                              {category}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {config?.description}
                            </p>
                            <div className="flex items-center gap-3 mt-3">
                              <Badge
                                variant="secondary"
                                className="text-xs px-2 py-0.5"
                              >
                                <Layers className="w-3 h-3 mr-1" />
                                {data.skills.length} skills
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Skills Grid - standardized */}
                      <CardContent className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {data.skills.map((skill, index) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: index * 0.05,
                                type: "spring",
                                stiffness: 300,
                              }}
                              whileHover={{ scale: 1.05 }}
                              onHoverStart={playHoverSound}
                            >
                              <div className="px-3 py-2 rounded-lg text-center bg-muted/30 border border-border/30 hover:border-border/50 transition-all duration-200 cursor-default group">
                                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                                  {skill}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              );
            })}
          </Tabs>
        </motion.div>


      </div>
    </section>
  );
}
