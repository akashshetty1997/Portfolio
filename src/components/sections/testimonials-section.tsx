// src/components/sections/testimonials-section.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star, Linkedin, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSoundEffect } from "@/hooks/use-sound";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Project Manager",
    company: "TechCorp",
    content:
      "Akash is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.",
    rating: 5,
    linkedinUrl: "#",
  },
  {
    name: "Michael Chen",
    role: "Senior Developer",
    company: "StartupXYZ",
    content:
      "Working with Akash was a great experience. He brings creative solutions to complex problems and is always eager to learn new technologies.",
    rating: 5,
    linkedinUrl: "#",
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "DesignStudio",
    content:
      "Akash has a great eye for design and user experience. He transformed our designs into pixel-perfect, responsive interfaces.",
    rating: 5,
    linkedinUrl: "#",
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playClickSound, playHoverSound } = useSoundEffect();

  return (
    <section id="testimonials" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">
            <Quote className="w-3 h-3 mr-1" />
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What People <span className="text-gradient">Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feedback from colleagues and clients I&#39;ve had the pleasure of
            working with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              onHoverStart={playHoverSound}
            >
              <Card className="h-full bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>

                  <Quote className="w-8 h-8 text-primary/20 mb-3" />

                  <p className="text-muted-foreground mb-6 italic">
                    &quot;{testimonial.content}&quot;
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        playClickSound();
                        window.open(testimonial.linkedinUrl, "_blank");
                      }}
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            onClick={() => {
              playClickSound();
              window.open(
                "https://www.linkedin.com/in/akashshetty1997",
                "_blank"
              );
            }}
            onMouseEnter={playHoverSound}
            variant="outline"
            className="group"
          >
            View LinkedIn Recommendations
            <Sparkles className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
