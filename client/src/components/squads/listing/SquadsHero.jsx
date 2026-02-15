import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, Plus } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const SquadsHero = ({ onBrowseClick, onCreateClick }) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-glow-secondary/5 rounded-full blur-[120px]" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div {...fadeUp}>
          <Badge
            variant="outline"
            className="mb-6 border-primary/30 text-primary px-4 py-1.5"
          >
            <Users className="h-3.5 w-3.5 mr-1.5" />
            Engagement-Based Squads
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Find Your <span className="text-gradient">Perfect Squad</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Join a niche-matched squad of real creators. Engage authentically,
            grow together, and boost your reach — no credits, just real
            engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl px-8 font-heading font-semibold"
              onClick={onBrowseClick}
            >
              Browse Squads
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl px-8 font-heading font-semibold border border-primary/20"
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
