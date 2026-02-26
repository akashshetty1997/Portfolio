// src/components/sections/skills-section.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Monitor,
  Server,
  Database,
  Cloud,
  Brain,
  CheckCircle,
  Layers,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SKILLS } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";

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
  return categoryConfig[categoryName]?.icon || Code2;
}

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playHoverSound, playClickSound } = useSoundEffect();
  const categories = Object.keys(SKILLS);
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <section id="skills" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
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
            Technical <span className="text-foreground">Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern applications
          </p>
        </motion.div>

        {/* Tabbed Interface */}
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
            <TabsList className="w-full h-auto p-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 mb-8 bg-secondary border border-border">
              {categories.map((category) => {
                const Icon = getIconForCategory(category);

                return (
                  <TabsTrigger
                    key={category}
                    value={category}
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-2.5 rounded-lg",
                      "data-[state=active]:bg-background",
                      "data-[state=active]:border data-[state=active]:border-border",
                      "hover:bg-background/60 transition-all duration-200",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 transition-colors",
                        activeTab === category
                          ? "text-foreground"
                          : "text-muted-foreground",
                      )}
                    />
                    <span className="text-xs font-medium text-center hidden md:block">
                      {category.split(" ")[0]}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map((category) => {
              const config = categoryConfig[category];
              const Icon = getIconForCategory(category);
              const data = SKILLS[category as keyof typeof SKILLS];

              return (
                <TabsContent key={category} value={category} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-card border-border hover:border-foreground/20 transition-colors duration-200">
                      <div className="p-6 border-b border-border">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-secondary">
                            <Icon className="w-5 h-5 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-2">
                              {category}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {config?.description}
                            </p>
                            <div className="flex items-center gap-3 mt-3">
                              <Badge
                                variant="outline"
                                className="text-xs px-2 py-0.5"
                              >
                                <Layers className="w-3 h-3 mr-1" />
                                {data.skills.length} skills
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

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
                              <div className="px-3 py-2 rounded-lg text-center bg-secondary border border-border hover:border-foreground/20 transition-colors duration-200 cursor-default group">
                                <span className="text-sm font-medium group-hover:text-foreground transition-colors">
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
