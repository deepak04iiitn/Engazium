"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Glow effects - smaller on mobile */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[150px] h-[150px] md:w-[300px] md:h-[300px] bg-glow-secondary/10 rounded-full blur-[60px] md:blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 sm:px-4 sm:py-2 mb-5 sm:mb-8"
        >
          <Users className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs sm:text-sm text-muted-foreground">
            The engagement & reach hub for creators
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight max-w-4xl mx-auto mb-4 sm:mb-6"
        >
          Build Engagement.{" "}
          <span className="text-gradient glow-text">Expand Reach.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl md:max-w-2xl mx-auto mb-7 sm:mb-10 leading-relaxed px-2"
        >
          Join a community-driven engagement ecosystem where micro creators grow
          together through meaningful, safe, and structured interactions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-heading font-semibold group w-full sm:w-auto"
          >
            <Sparkles className="mr-2 h-4 w-4 sm:hidden" />
            Start Growing Free
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border/50 text-foreground hover:bg-secondary/50 hover:text-foreground text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-heading w-full sm:w-auto"
          >
            See How It Works
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex items-center justify-center gap-6 sm:gap-8 md:gap-16 mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-border/30"
        >
          {[
            { value: "10K+", label: "Active Creators" },
            { value: "500+", label: "Squads Formed" },
            { value: "3x", label: "Avg Reach Boost" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-primary glow-text">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
