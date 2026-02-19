"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="relative py-20 sm:py-28 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 mesh-gradient opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/8 dark:bg-primary/12 rounded-full blur-[120px] md:blur-[200px]" />

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
            <Rocket className="h-5.5 w-5.5 text-primary" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tighter mb-5 sm:mb-6">
            Ready to{" "}
            <span className="text-gradient-animated">Grow Together?</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of micro creators who are boosting their engagement
            and reach through Engazium&apos;s community-driven platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <Link href="/sign-up" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box-intense px-8 py-6 rounded-2xl font-heading font-semibold group w-full sm:w-auto text-[15px]"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-border/60 dark:border-border/40 text-foreground hover:bg-card/80 dark:hover:bg-card/50 backdrop-blur-sm px-8 py-6 rounded-2xl font-heading w-full sm:w-auto text-[15px]"
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
