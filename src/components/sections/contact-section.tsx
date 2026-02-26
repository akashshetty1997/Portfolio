"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
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
  Check,
  Terminal,
  ArrowRight,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PERSONAL_INFO } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";
import { toast } from "sonner";

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

// Brutalist Resume Modal
interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { playClickSound, playHoverSound, playSuccessSound } = useSoundEffect();
  const [pdfError, setPdfError] = useState(false);

  const handleDownload = () => {
    playClickSound();
    const link = document.createElement('a');
    link.href = PERSONAL_INFO.resume;
    link.download = 'Akash_Shetty_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Resume sequence initiated.");
    playSuccessSound();
  };

  const handleOpenExternal = () => {
    playClickSound();
    window.open(PERSONAL_INFO.resume, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-[98vw] w-full md:max-w-[90vw] lg:max-w-7xl max-h-[98vh] h-[98vh] p-0 overflow-hidden bg-background border-2 border-border shadow-2xl rounded-none flex flex-col">
            <DialogTitle className="sr-only">Resume Document</DialogTitle>

            {/* Brutalist Header Bar */}
            <div className="flex justify-between items-center border-b border-border px-4 py-3 bg-foreground text-background shrink-0">
              <span className="font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-background animate-pulse" />
                Doc_Viewer: Resume.pdf
              </span>
              <button
                onClick={() => { playClickSound(); onClose(); }}
                className="hover:rotate-90 transition-transform duration-300 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Container */}
            <div className="flex-1 bg-muted/20 relative w-full min-h-0">
              {!pdfError ? (
                <div className="absolute inset-0 p-2 md:p-4">
                  <embed
                    src={`${PERSONAL_INFO.resume}#toolbar=0`}
                    type="application/pdf"
                    className="w-full h-full border border-border bg-white shadow-2xl"
                    onError={() => setPdfError(true)}
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center max-w-md">
                    <FileText className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
                    <h3 className="text-xl font-black uppercase mb-3">Preview Unavailable</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Your browser doesn't support inline PDF viewing. Use the buttons below to view or download the resume.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={handleOpenExternal}
                        onMouseEnter={playHoverSound}
                        className="px-4 py-2 border border-border hover:bg-foreground hover:text-background transition-colors font-mono text-xs uppercase tracking-widest"
                      >
                        Open in New Tab
                      </button>
                      <button
                        onClick={handleDownload}
                        onMouseEnter={playHoverSound}
                        className="px-4 py-2 bg-foreground text-background hover:bg-foreground/90 transition-colors font-mono text-xs uppercase tracking-widest"
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Brutalist Footer Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-border bg-background shrink-0">
              <button
                onClick={handleOpenExternal}
                onMouseEnter={playHoverSound}
                className="p-4 border-b sm:border-b-0 sm:border-r border-border hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest group"
              >
                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Open External
              </button>
              
              <button
                onClick={handleDownload}
                onMouseEnter={playHoverSound}
                className="p-4 bg-foreground text-background hover:bg-transparent hover:text-foreground border border-transparent hover:border-foreground transition-colors flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest group"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                Execute Download
              </button>
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
    <section 
      id="contact" 
      className="relative min-h-[90vh] bg-background pt-24 pb-32 overflow-hidden border-t border-border flex flex-col" 
      ref={ref}
    >
      {/* Massive Background Typography Watermark */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none flex justify-center">
        <h2 className="text-[clamp(6rem,18vw,22rem)] font-black leading-none whitespace-nowrap">
          CONTACT
        </h2>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 flex-1 flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4 block">
              05 // Handshake
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Initiate <span className="text-transparent" style={{ WebkitTextStroke: "1.5px hsl(var(--foreground))" }}>Contact</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-mono text-muted-foreground uppercase flex flex-col items-start md:items-end"
          >
            <span>Network Open</span>
            <span>Awaiting Transmission</span>
          </motion.div>
        </div>

        {/* Brutalist Contact Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="border-t-[2px] border-foreground grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left Column: Terminal / Status */}
          <motion.div variants={itemVariants} className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-10 flex flex-col justify-between bg-muted/10 relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-px bg-primary/20 -translate-y-full group-hover:animate-[scan_3s_ease-in-out_infinite]" />
             
             <div className="space-y-12">
               <div className="flex items-center gap-4">
                  <Terminal className="w-8 h-8 text-foreground" />
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">System Status</span>
                    <div className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 bg-green-500 rounded-none animate-pulse" />
                       <span className="font-black uppercase tracking-tight">Available for Hire</span>
                    </div>
                  </div>
               </div>

               <div className="space-y-6 border-l-2 border-border pl-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground flex items-center gap-2"><MapPin className="w-3 h-3"/> Location Coordinates</span>
                    <span className="font-bold text-sm uppercase">{PERSONAL_INFO.location} <span className="text-muted-foreground font-normal ml-2 hidden sm:inline">/// Open to Relocation</span></span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground flex items-center gap-2"><Clock className="w-3 h-3"/> Ping Response</span>
                    <span className="font-bold text-sm uppercase">&lt; 24 Hours</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground flex items-center gap-2"><Calendar className="w-3 h-3"/> Deployment Date</span>
                    <span className="font-bold text-sm uppercase">Immediate</span>
                  </div>
               </div>
             </div>

             <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mt-12 pt-6 border-t border-border/50">
               // Ready to architect solutions. Transmit message to begin.
             </p>
          </motion.div>

          {/* Right Column: Interactive Elements */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col">
            
            {/* Massive Email Copy Block */}
            <div 
              onClick={() => handleCopy(PERSONAL_INFO.email, "Email")}
              onMouseEnter={playHoverSound}
              className="group p-6 sm:p-8 md:p-16 border-b border-border hover:bg-foreground hover:text-background transition-colors duration-500 cursor-pointer flex flex-col justify-center items-center text-center h-full relative min-h-[200px]"
            >
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6 opacity-50 block w-full text-left absolute top-4 left-4 sm:top-6 sm:left-6">
                Primary_Comms_Link
              </span>
              
              {/* Responsive email with proper wrapping */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight transition-transform duration-300 group-hover:scale-105 mb-4 break-words w-full px-2 mt-8 sm:mt-0 leading-tight">
                {PERSONAL_INFO.email}
              </h3>
              
              <div className="font-mono text-[10px] sm:text-xs tracking-widest uppercase flex items-center gap-2 mt-4 opacity-70 group-hover:opacity-100">
                {copiedItem === "Email" ? (
                  <><Check className="w-4 h-4" /> Data Copied to Clipboard</>
                ) : (
                  <>Click to Copy Address <ArrowRight className="w-4 h-4" /></>
                )}
              </div>
            </div>

            {/* Links & Resume Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4">
               {/* LinkedIn */}
               <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} onClick={playClickSound} className="group p-6 border-b lg:border-b-0 border-r border-border hover:bg-[#0077b5] hover:text-white transition-colors flex flex-col items-center justify-center gap-3 aspect-square lg:aspect-auto">
                 <Linkedin className="w-6 h-6 group-hover:scale-125 transition-transform" />
                 <span className="font-mono text-[10px] tracking-widest uppercase mt-2">LinkedIn</span>
               </a>

               {/* GitHub */}
               <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} onClick={playClickSound} className="group p-6 border-b lg:border-b-0 border-r border-border hover:bg-foreground hover:text-background transition-colors flex flex-col items-center justify-center gap-3 aspect-square lg:aspect-auto">
                 <Github className="w-6 h-6 group-hover:scale-125 transition-transform" />
                 <span className="font-mono text-[10px] tracking-widest uppercase mt-2">GitHub</span>
               </a>

               {/* Preview Resume */}
               <button onClick={() => { playClickSound(); setIsResumeModalOpen(true); }} onMouseEnter={playHoverSound} className="group p-6 border-r border-border hover:bg-secondary transition-colors flex flex-col items-center justify-center gap-3 aspect-square lg:aspect-auto">
                 <Eye className="w-6 h-6 group-hover:scale-125 transition-transform text-foreground" />
                 <span className="font-mono text-[10px] tracking-widest uppercase mt-2">View Doc</span>
               </button>

               {/* Download Resume */}
               <a href={PERSONAL_INFO.resume} download onClick={() => { playClickSound(); toast.success("Resume sequence initiated."); }} onMouseEnter={playHoverSound} className="group p-6 bg-foreground text-background hover:bg-background hover:text-foreground border-l border-transparent hover:border-border transition-colors flex flex-col items-center justify-center gap-3 aspect-square lg:aspect-auto">
                 <Download className="w-6 h-6 group-hover:-translate-y-2 transition-transform" />
                 <span className="font-mono text-[10px] tracking-widest uppercase mt-2 text-center">Fetch PDF</span>
               </a>
            </div>

          </motion.div>
        </motion.div>
      </div>

      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </section>
  );
}