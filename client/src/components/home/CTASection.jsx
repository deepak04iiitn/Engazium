"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative py-14 sm:py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Glow effects - smaller on mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[150px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 sm:mb-6">
            Ready to{" "}
            <span className="text-gradient glow-text">
              Grow Together?
            </span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-7 sm:mb-10 max-w-xl mx-auto leading-relaxed px-2">
            Join thousands of micro creators who are boosting their engagement and reach through Engazium's community-driven platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-heading font-semibold group w-full sm:w-auto"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/50 text-foreground hover:bg-secondary/50 hover:text-foreground text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-heading w-full sm:w-auto"
            >
              Talk to Our Team
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
