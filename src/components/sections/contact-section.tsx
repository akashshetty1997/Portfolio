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
  MessageCircle,
  Calendar,
  Clock,
  Eye,
  X,
  FileText,
  CheckCircle,
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
          <DialogContent className="max-w-[95vw] md:max-w-5xl lg:max-w-6xl max-h-[90vh] p-0 overflow-hidden bg-gradient-to-br from-background/98 via-background/95 to-background/90 backdrop-blur-2xl border-0 shadow-2xl">
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
            </div>

            {/* Glass morphism overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.35_0.15_280/0.1),transparent_70%)] pointer-events-none" />

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
            <div className="relative flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                        Resume Preview
                      </h2>
                    </div>
                  </div>
                  

                </div>
              </div>

              {/* Resume Preview */}
              <div className="flex-1 p-4 overflow-hidden">
                <div className="w-full h-full rounded-2xl shadow-2xl overflow-hidden" style={{ height: '60vh' }}>
                  <iframe
                    src={`${PERSONAL_INFO.resume}#toolbar=0&navpanes=0&scrollbar=0&zoom=90`}
                    className="w-full h-full border-0 rounded-2xl"
                    title="Resume Preview"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span>PDF Document • Last updated: September 2025</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        playClickSound();
                        window.open(PERSONAL_INFO.resume, '_blank');
                      }}
                      onMouseEnter={playHoverSound}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in New Tab
                    </Button>
                    
                    <Button
                      onClick={handleDownload}
                      onMouseEnter={playHoverSound}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
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
    <section id="contact" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Subtle gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        {/* Floating orbs for ambiance */}
        <motion.div
          className="absolute top-1/3 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 -right-48 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 px-4 py-1.5" variant="outline">
            <MessageCircle className="w-3 h-3 mr-2" />
            Contact
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&#39;s Build Something <span className="text-gradient">Amazing Together</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Currently seeking full-time opportunities where I can contribute to innovative projects
            and grow with a dynamic team
          </p>
        </motion.div>

        {/* Main Contact Card - Centered and Clean */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-background/60 backdrop-blur-sm border-border/50 overflow-hidden">
            {/* Status Banner */}
            <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 p-4 border-b border-border/50">
              <div className="flex items-center justify-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                </span>
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  Available for immediate opportunities
                </span>
              </div>
            </div>

            <CardContent className="p-8 space-y-8">
              {/* Quick Info Pills */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Badge variant="secondary" className="px-4 py-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {PERSONAL_INFO.location}
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Open to Remote
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Ready to Start
                </Badge>
              </div>

              {/* Contact Options */}
              <div className="space-y-4">
                {/* Email - Primary Contact */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div
                    onClick={() => handleCopy(PERSONAL_INFO.email, "Email")}
                    onMouseEnter={playHoverSound}
                    className="relative p-5 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-border/50 hover:border-primary/30 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">
                            Email Address
                          </p>
                          <p className="font-medium text-lg">
                            {PERSONAL_INFO.email}
                          </p>
                        </div>
                      </div>
                      {copiedItem === "Email" ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-all">
                          Click to copy
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Phone */}
                {/* <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleCopy(PERSONAL_INFO.phone, "Phone")}
                  onMouseEnter={playHoverSound}
                  className="p-5 rounded-xl bg-muted/30 border border-border/30 hover:border-border/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-lg bg-muted">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          Phone Number
                        </p>
                        <p className="font-medium">
                          {PERSONAL_INFO.phone}
                        </p>
                      </div>
                    </div>
                    {copiedItem === "Phone" ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-all">
                        Click to copy
                      </span>
                    )}
                  </div>
                </motion.div> */}
              </div>

              {/* Primary CTA Buttons */}
              <div className="space-y-4">


                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={playHoverSound}
                    onClick={playClickSound}
                  >
                    <Button variant="outline" className="w-full h-12 group">
                      <Linkedin className="w-4 h-4 mr-2 group-hover:text-[#0077b5] transition-colors" />
                      LinkedIn
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </motion.a>

                  <motion.a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={playHoverSound}
                    onClick={playClickSound}
                  >
                    <Button variant="outline" className="w-full h-12 group">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </motion.a>
                </div>

                {/* Resume Preview */}
                <motion.button
                  onClick={() => {
                    playClickSound();
                    setIsResumeModalOpen(true);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={playHoverSound}
                  className="w-full"
                >
                  <Button variant="secondary" className="w-full h-12 group">
                    <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    View Resume
                    <Badge variant="outline" className="ml-2 text-xs">PDF</Badge>
                  </Button>
                </motion.button>
              </div>


            </CardContent>
          </Card>
        </motion.div>

        {/* Resume Modal */}
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      </div>
    </section>
  );
}