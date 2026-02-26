"use client";

import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Navigation } from "@/components/layout/navigation";
import { BackToTop } from "@/components/layout/back-to-top";
import { LoadingScreen } from "@/components/effects/loading-screen";
import { motion, AnimatePresence } from "framer-motion";

// 🛑 EDITORIAL DESIGN NOTE: 
// Particle backgrounds clash with high-contrast brutalism. 
// I've commented it out to keep the negative space completely clean.
// const ParticleBackground = dynamic(
//   () => import("@/components/effects/particle-background"),
//   { ssr: false }
// );

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen 
        onLoadingComplete={handleLoadingComplete}
        duration={3500} // Loading screen duration in milliseconds
      />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!isLoading && isContentReady && (
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            // Added custom selection colors for brutalist text highlighting
            className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-foreground selection:text-background"
          >
            {/* Navigation */}
            <Navigation />
            
            {/* Main Content Architecture */}
            <div className="relative z-10 flex flex-col w-full">
              <HeroSection />
              <AboutSection />
              <ExperienceSection />
              <ProjectsSection />
              <SkillsSection />
              <ContactSection />
            </div>
            
            {/* Back to Top Button */}
            <BackToTop />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}