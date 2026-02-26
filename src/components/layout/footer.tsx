// src/components/layout/footer.tsx
"use client";

import { motion } from "framer-motion";
import { Heart, Code2 } from "lucide-react";
import { PERSONAL_INFO, NAVIGATION_ITEMS } from "@/lib/constants";
import { useSoundEffect } from "@/hooks/use-sound";

export function Footer() {
  const { playHoverSound } = useSoundEffect();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border/50 bg-background/50 backdrop-blur">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-gradient mb-4">
              {PERSONAL_INFO.firstName} {PERSONAL_INFO.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {PERSONAL_INFO.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ x: 5 }}
                  onHoverStart={playHoverSound}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{PERSONAL_INFO.email}</p>
              <p>{PERSONAL_INFO.phone}</p>
              <p>{PERSONAL_INFO.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
            </p>

            <motion.p
              className="text-sm text-muted-foreground flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Built with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-foreground inline" />
              </motion.span>
              and
              <Code2 className="w-4 h-4 inline" />
              using Next.js & Tailwind CSS
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
