import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, Plus } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const SquadsHero = ({ onBrowseClick, onCreateClick }) => {
  return (
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-20 left-1/4 w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] bg-primary/5 rounded-full blur-[80px] md:blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-glow-secondary/5 rounded-full blur-[60px] md:blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
        <motion.div {...fadeUp}>
          <Badge
            variant="outline"
            className="mb-4 sm:mb-6 border-primary/30 text-primary px-3 sm:px-4 py-1 sm:py-1.5 text-xs"
          >
            <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-1.5" />
            Engagement-Based Squads
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold mb-4 sm:mb-6">
            Find Your <span className="text-gradient">Perfect Squad</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-6 sm:mb-10 px-2">
            Join a niche-matched squad of real creators. Engage authentically,
            grow together, and boost your reach — no credits, just real
            engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl px-6 sm:px-8 font-heading font-semibold text-sm sm:text-base w-full sm:w-auto"
              onClick={onBrowseClick}
            >
              Browse Squads
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl px-6 sm:px-8 font-heading font-semibold border border-primary/20 text-sm sm:text-base w-full sm:w-auto"
              onClick={onCreateClick}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Squad
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SquadsHero;
