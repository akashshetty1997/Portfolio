// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactSection } from "@/components/sections/contact-section";
// import { VideoSection } from "@/components/sections/video-section";
// import { GitHubSection } from "@/components/sections/github-section";
// import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { Navigation } from "@/components/layout/navigation";
// import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { LoadingScreen } from "@/components/effects/loading-screen";
import { motion, AnimatePresence } from "framer-motion";

// Dynamic imports for heavy components
const ParticleBackground = dynamic(
  () => import("@/components/effects/particle-background"),
  { ssr: false }
);

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen overflow-x-hidden"
          >
            {/* Particle Background */}
            <ParticleBackground />
            
            {/* Navigation */}
            <Navigation />
            
            {/* Main Content */}
            <div className="relative z-10">
              {/* Hero Section */}
              <HeroSection />
              
              {/* Video Introduction */}
              {/* <VideoSection /> */}
              
              {/* About Section */}
              <AboutSection />
              
              {/* Experience Timeline */}
              <ExperienceSection />
              
              {/* Projects Showcase */}
              <ProjectsSection />
              
              {/* Skills & Technologies */}
              <SkillsSection />
              
              {/* GitHub Activity */}
              {/* <GitHubSection /> */}
              
              {/* Testimonials */}
              {/* <TestimonialsSection /> */}
              
              {/* Contact Section */}
              <ContactSection />
            </div>
            
            {/* Footer */}
            {/* <Footer /> */}
            
            {/* Back to Top Button */}
            <BackToTop />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}