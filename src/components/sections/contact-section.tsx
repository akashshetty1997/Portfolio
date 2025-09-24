// src/components/sections/contact-section.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Download,
  ExternalLink,
  Calendar,
  Clock,
  Eye,
  X,
  FileText,
  CheckCircle,
  Sparkles,
  Send,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { PERSONAL_INFO } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { playClickSound, playHoverSound, playSuccessSound } = useSoundEffect();

  const handleDownload = () => {
    playClickSound();
    const link = document.createElement('a');
    link.href = PERSONAL_INFO.resume;
    link.download = 'Akash_Shetty_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Resume download started!");
    playSuccessSound();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-[95vw] md:max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-border/50">
            {/* Close Button */}
            <motion.button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="absolute top-3 right-3 z-50 p-2 rounded-full bg-background/80 backdrop-blur border border-border/50 hover:bg-background/90 transition-all group"
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-4 h-4 text-foreground/80 group-hover:text-foreground transition-colors" />
            </motion.button>

            {/* Content Container */}
            <div className="relative flex flex-col h-full">
              {/* Header */}
              <div className="p-4 md:p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">
                    Resume Preview
                  </h2>
                </div>
              </div>

              {/* Resume Preview */}
              <div className="flex-1 p-3 md:p-4 overflow-hidden bg-muted/20">
                <div className="w-full h-full rounded-lg overflow-hidden" style={{ minHeight: '50vh' }}>
                  <iframe
                    src={`${PERSONAL_INFO.resume}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full border-0 rounded-lg bg-white"
                    title="Resume Preview"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 md:p-6 border-t border-border/50 bg-background/50">
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    Last updated: December 2024
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      onClick={() => {
                        playClickSound();
                        window.open(PERSONAL_INFO.resume, '_blank');
                      }}
                      onMouseEnter={playHoverSound}
                      className="w-full sm:w-auto"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in Tab
                    </Button>
                    
                    <Button
                      onClick={handleDownload}
                      onMouseEnter={playHoverSound}
                      className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playClickSound, playHoverSound, playSuccessSound } = useSoundEffect();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleCopy = (text: string, label: string) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    toast.success(`${label} copied to clipboard!`);
    playSuccessSound();

    setTimeout(() => {
      setCopiedItem(null);
    }, 2000);
  };

  return (
    <section id="contact" className="py-12 md:py-20 relative overflow-hidden" ref={ref}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 md:-left-48 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 md:-right-48 w-64 md:w-96 h-64 md:h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <Badge className="mb-4 px-3 md:px-4 py-1.5" variant="outline">
            <Sparkles className="w-3 h-3 mr-2" />
            Get in Touch
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 px-4">
            Ready to <span className="text-gradient">Collaborate?</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg md:max-w-2xl mx-auto px-4">
            I&apos;m actively seeking opportunities to contribute to innovative projects
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-6 md:gap-8">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Status Card */}
            <Card className="bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 border-green-500/20">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                  </span>
                  <div>
                    <p className="font-semibold text-green-700 dark:text-green-400">
                      Available for Hire
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Full-time • Contract • Remote
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="bg-background/60 backdrop-blur-sm border-border/50">
              <CardContent className="p-4 md:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{PERSONAL_INFO.location}</p>
                    <p className="text-xs text-muted-foreground">
                      Open to relocation
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Clock className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Response Time</p>
                    <p className="text-xs text-muted-foreground">
                      Within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Calendar className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-semibold">Available</p>
                    <p className="text-xs text-muted-foreground">
                      Immediately
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Contact Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3 space-y-4"
          >
            {/* Primary Contact Card */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
              <CardContent className="p-4 md:p-6 space-y-4 relative">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Send className="w-4 h-4 text-primary" />
                    Primary Contact
                  </h3>
                  
                  {/* Email Button - Fixed: Using motion.div instead of motion.button */}
                  <motion.div
                    onClick={() => handleCopy(PERSONAL_INFO.email, "Email")}
                    onMouseEnter={playHoverSound}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <div className="text-left">
                          <p className="font-medium text-sm md:text-base">
                            {PERSONAL_INFO.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Click to copy • Primary email
                          </p>
                        </div>
                      </div>
                      {copiedItem === "Email" ? (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                      className="block"
                    >
                      <Button variant="outline" className="w-full h-11 group relative overflow-hidden">
                        <span className="absolute inset-0 bg-[#0077b5]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Linkedin className="w-4 h-4 mr-2 group-hover:text-[#0077b5] transition-colors" />
                        LinkedIn
                      </Button>
                    </a>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                      className="block"
                    >
                      <Button variant="outline" className="w-full h-11 group relative overflow-hidden">
                        <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                    </a>
                  </motion.div>
                </div>

                {/* Resume Actions */}
                <div className="pt-2">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button 
                        variant="secondary" 
                        className="w-full h-11"
                        onClick={() => {
                          playClickSound();
                          setIsResumeModalOpen(true);
                        }}
                        onMouseEnter={playHoverSound}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Resume
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <a
                        href={PERSONAL_INFO.resume}
                        download
                        onClick={() => {
                          playClickSound();
                          toast.success("Resume download started!");
                        }}
                        onMouseEnter={playHoverSound}
                        className="block"
                      >
                        <Button className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-center p-4 rounded-lg bg-muted/30"
            >
              <p className="text-sm text-muted-foreground">
                💡 Feel free to reach out for collaborations or just a friendly chat about tech!
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Resume Modal */}
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      </div>
    </section>
  );
}