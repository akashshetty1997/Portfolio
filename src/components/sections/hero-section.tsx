// src/components/sections/hero-section.tsx
"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Download,
  MapPin,
  Code2,
  Zap,
  Globe,
  Rocket,
  User,
  Briefcase,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PERSONAL_INFO } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";
import { toast } from "sonner";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { playClickSound, playHoverSound } = useSoundEffect();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);

      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleDownloadResume = () => {
    playClickSound();
    toast.success("Resume download started!");
  };

  const handleCardClick = (sectionId: string) => {
    playClickSound();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  // Create typing animation sequence
  const typingSequence = PERSONAL_INFO.typingAnimationTexts.flatMap((text) => [
    text,
    2000,
  ]);

  // Parallax rotations
  const rotateLaptop = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);
  const rotatePhone = useTransform(mouseYSpring, [-0.5, 0.5], [-8, 8]);

  const cards = [
    {
      id: "experience",
      title: "Experience",
      icon: Briefcase,
      description: "4+ years of professional journey",
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      defaultX: -180,
      defaultRotate: -12,
    },
    {
      id: "about",
      title: "About Me",
      icon: User,
      description: "Discover my journey",
      gradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      defaultX: 0,
      defaultRotate: 0,
    },
    {
      id: "projects",
      title: "Projects",
      icon: FolderOpen,
      description: "Explore my creative works",
      gradient: "from-orange-600 to-red-600",
      bgGradient: "from-orange-500/20 to-red-500/20",
      defaultX: 180,
      defaultRotate: 12,
    },
  ] as const;

  // Compute motion targets for each card
  const getCardMotion = (cardId: string, index: number) => {
    if (hoveredCard === cardId) {
      return {
        x: 0,
        y: -40,
        scale: 1.15,
        rotateZ: 0,
        zIndex: 50,
        opacity: 1,
        filter: "none",
      } as const;
    }

    if (hoveredCard) {
      // When some other card is hovered, dim and push this one aside
      return {
        x: index === 0 ? -240 : index === 2 ? 240 : 0,
        y: 0,
        scale: 0.9,
        rotateZ: index === 0 ? -6 : index === 2 ? 6 : 0,
        zIndex: 5, // keep below the overlay (which is z-10)
        opacity: 0.35,
        filter: "blur(0.5px) saturate(0.7)",
      } as const;
    }

    // Default stacked layout
    return {
      x: cards[index].defaultX,
      y: 0,
      scale: index === 1 ? 1 : 0.92,
      rotateZ: cards[index].defaultRotate,
      zIndex: index === 1 ? 8 : index === 0 ? 7 : 6,
      opacity: 1,
      filter: "none",
    } as const;
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-background"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-red-500/5" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]" />

        {/* Floating Gradient Orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
            left: "5%",
            top: "10%",
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
          }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)",
            right: "5%",
            bottom: "10%",
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Tech Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[Code2, Zap, Globe, Rocket].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{ left: `${20 + index * 20}%`, top: `${20 + index * 15}%` }}
              animate={{ y: [0, -30, 0], rotate: [0, 360], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 10 + index * 2, repeat: Infinity, delay: index * 0.5 }}
            >
              <Icon className="w-8 h-8 text-primary/20" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Status Badge */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-block">
              <div className="relative">
                <Badge className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-red-500/10 border-purple-500/20 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent font-semibold">
                    {PERSONAL_INFO.status}
                  </span>
                </Badge>
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-500/20 to-red-500/20 -z-10" />
              </div>
            </motion.div>

            {/* Name */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight">
                <motion.span
                  className="block bg-gradient-to-br from-purple-600 via-red-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_200%]"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  {PERSONAL_INFO.firstName}
                </motion.span>
                <motion.span className="block text-4xl sm:text-5xl md:text-6xl mt-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  {PERSONAL_INFO.lastName}
                </motion.span>
              </h1>
            </motion.div>

            {/* Role with Typing Animation */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="h-16 flex items-center">
              <div className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light">
                <TypeAnimation sequence={typingSequence} wrapper="span" speed={50} repeat={Infinity} className="inline-block" />
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="ml-1 inline-block w-[3px] h-8 bg-gradient-to-b from-purple-500 to-red-500" />
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="inline-block">
              <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-red-500 p-[1px]">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{PERSONAL_INFO.location}</p>
                    <p className="text-xs text-muted-foreground">Open to Remote & Relocation</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleDownloadResume}
                  onMouseEnter={playHoverSound}
                  className="group relative px-8 py-6 text-base border-2 border-primary/20 hover:border-primary/40 backdrop-blur-sm"
                  asChild
                >
                  <a href={PERSONAL_INFO.resume} download>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Download Resume
                      <Badge variant="secondary" className="ml-2 text-xs">
                        PDF
                      </Badge>
                    </span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Visual Element - 3D Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative h-[500px]"
          >
            {/* Card stage */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d] perspective-[1200px] isolate"
            >
              {/* Dimmer overlay that darkens everything except the hovered card (hovered sits above via zIndex) */}
              <AnimatePresence>
                {hoveredCard && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.28 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background:
                        "radial-gradient(90% 70% at 50% 50%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%)",
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Cards */}
              {cards.map((card, index) => {
                const target = getCardMotion(card.id, index);
                const isHovered = hoveredCard === card.id;
                const isDimmed = !!hoveredCard && !isHovered;

                return (
                  <motion.div
                    key={card.id}
                    className="absolute w-72 h-96 cursor-pointer will-change-transform"
                    style={{
                      rotateY: isHovered ? 0 : (rotateLaptop as unknown as number),
                      rotateX: isHovered ? 0 : (rotatePhone as unknown as number),
                      zIndex: target.zIndex,
                      mixBlendMode: "normal", // prevent glow blending with siblings
                    }}
                    animate={{
                      x: target.x,
                      y: target.y,
                      scale: target.scale,
                      rotateZ: target.rotateZ,
                      opacity: target.opacity,
                      filter: target.filter,
                    }}
                    transition={{ type: "spring", damping: 22, stiffness: 180, mass: 1 }}
                    onClick={() => handleCardClick(card.id)}
                    onMouseEnter={() => {
                      setHoveredCard(card.id);
                      playHoverSound();
                    }}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Local stacking context to isolate internal glow */}
                    <div className="relative w-full h-full isolate">
                      {/* Soft halo on hover (contained to card) */}
                      <motion.div
                        className={`absolute inset-0 rounded-[28px] bg-gradient-to-r ${card.gradient}`}
                        style={{ filter: "blur(30px)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 0.35 : 0 }}
                        transition={{ duration: 0.35 }}
                      />

                      {/* Card body */}
                      <div
                        className="relative h-full rounded-[28px] overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/15 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                      >
                        {/* Top accent */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`} />

                        {/* Subtle internal background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-30`} />

                        {/* Content */}
                        <div className="relative p-8 h-full flex flex-col">
                          {/* Icon */}
                          <div className="relative mb-6">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} p-[1px]`}>
                              <div className="w-full h-full rounded-2xl bg-black/50 backdrop-blur flex items-center justify-center">
                                <card.icon className="w-8 h-8 text-white" />
                              </div>
                            </div>
                          </div>

                          {/* Title & description */}
                          <h3 className="text-2xl font-bold text-white mb-1">{card.title}</h3>
                          <p className="text-sm text-white/70 mb-3">{card.description}</p>

                          {/* CTA */}
                          <div className="mt-auto pt-2">
                            <button
                              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCardClick(card.id);
                              }}
                            >
                              <span className="text-sm font-medium">Open {card.title}</span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M13.5 4.5a.75.75 0 0 1 .75-.75h5.25a.75.75 0 0 1 .75.75V9.75a.75.75 0 0 1-1.5 0V6.31l-7.22 7.22a.75.75 0 1 1-1.06-1.06l7.22-7.22h-3.44a.75.75 0 0 1-.75-.75Z" />
                                <path d="M20.25 13.5a.75.75 0 0 1 .75.75v4.5A2.25 2.25 0 0 1 18.75 21H6a2.25 2.25 0 0 1-2.25-2.25V6a2.25 2.25 0 0 1 2.25-2.25h4.5a.75.75 0 0 1 0 1.5H6A.75.75 0 0 0 5.25 6v12.75c0 .414.336.75.75.75h12.75c.414 0 .75-.336.75-.75V14.25a.75.75 0 0 1 .75-.75Z" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Hover overlay for subtle depth */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
                          animate={{ opacity: isHovered ? 1 : isDimmed ? 0.6 : 0.25 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Background light particles */}
              <div className="absolute inset-0 pointer-events-none z-[1]">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: Math.random() * 4 + 2,
                      height: Math.random() * 4 + 2,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
                    }}
                    animate={{ y: [0, -30, 0], x: [0, Math.random() * 20 - 10, 0], opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.button
          className="relative group"
          onClick={() => {
            playClickSound();
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center p-2 group-hover:border-primary/60 transition-colors">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-purple-500 to-red-500" animate={{ y: [0, 16, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
          </div>
          <motion.div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/50 whitespace-nowrap" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
            Scroll to explore
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
