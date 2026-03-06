"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  PenLine,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

// Helper — get initials from a name
const getInitials = (name) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const TestimonialCard = ({ t }) => (
  <div className="bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-border/40 dark:border-border/20 hover:border-primary/15 dark:hover:border-primary/15 transition-all duration-500 group">
    {/* Quote icon */}
    <Quote className="h-6 w-6 text-primary/12 dark:text-primary/18 mb-3 group-hover:text-primary/25 transition-colors duration-500" />

    {/* Quote text */}
    <p className="text-foreground/75 text-sm leading-relaxed mb-5">
      &ldquo;{t.quote}&rdquo;
    </p>

    {/* Rating */}
    <div className="flex items-center gap-0.5 mb-4">
      {Array.from({ length: t.rating }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
      ))}
    </div>

    {/* Author */}
    <div className="flex items-center">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-primary/8 dark:bg-primary/10 border border-border/30 dark:border-border/15 flex items-center justify-center shrink-0">
          <span className="text-[9px] font-bold text-primary font-heading">
            {t.initials || getInitials(t.name)}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-heading font-semibold text-foreground text-xs sm:text-sm truncate">
            {t.name}
          </p>
          <p className="text-muted-foreground text-[10px] sm:text-xs truncate">
            {t.niche}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const MIN_REAL_TESTIMONIALS = 10;

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        if (res.ok && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials);
        }
      } catch {
        // Keep empty state until enough verified testimonials are available.
      }
    };
    fetchTestimonials();
  }, []);

  const hasEnoughRealTestimonials = testimonials.length >= MIN_REAL_TESTIMONIALS;

  /* Split testimonials into 3 columns for vertical scroll */
  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  return (
    <section className="relative py-28 sm:py-36 md:py-44 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center mb-14 sm:mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 dark:bg-primary/10 border border-primary/12 dark:border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6">
            <MessageSquare className="h-3 w-3" />
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter">
            Creators are{" "}
            <span className="text-gradient-animated">loving it</span>
          </h2>
          <p className="text-muted-foreground mt-5 sm:mt-6 text-base sm:text-lg md:text-xl max-w-lg mx-auto">
            Honest feedback from early creators using Engazium in their weekly workflow.
          </p>
        </motion.div>
      </div>

      {hasEnoughRealTestimonials ? (
        <>
          {/* ═══════ Desktop — 3-column vertical scroll ═══════ */}
          <div className="hidden md:block relative max-w-6xl mx-auto px-5 sm:px-6">
            {/* Top and bottom fade masks */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

            <div className="h-[600px] lg:h-[650px] overflow-hidden">
              <div className="grid grid-cols-3 gap-4 lg:gap-5 h-full">
                {/* Column 1 — scrolls DOWN */}
                <div className="overflow-hidden">
                  <div className="animate-scroll-down">
                    {[...col1, ...col1].map((t, i) => (
                      <div key={`c1-${i}`} className="mb-4 lg:mb-5">
                        <TestimonialCard t={t} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2 — scrolls UP */}
                <div className="overflow-hidden">
                  <div className="animate-scroll-up">
                    {[...col2, ...col2].map((t, i) => (
                      <div key={`c2-${i}`} className="mb-4 lg:mb-5">
                        <TestimonialCard t={t} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3 — scrolls DOWN (slower) */}
                <div className="overflow-hidden">
                  <div className="animate-scroll-down-slow">
                    {[...col3, ...col3].map((t, i) => (
                      <div key={`c3-${i}`} className="mb-4 lg:mb-5">
                        <TestimonialCard t={t} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════ Mobile — swipeable carousel ═══════ */}
          <div className="md:hidden px-5 sm:px-6">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                >
                  <TestimonialCard t={testimonials[activeIndex]} />
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button className="cursor-pointer"
                  onClick={() =>
                    setActiveIndex(
                      (prev) =>
                        (prev - 1 + testimonials.length) % testimonials.length
                    )
                  }
                  className="w-10 h-10 rounded-full bg-card/80 dark:bg-card/50 border border-border/40 dark:border-border/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button className="cursor-pointer"
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? "w-6 bg-primary"
                          : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>

                <button className="cursor-pointer"
                  onClick={() =>
                    setActiveIndex((prev) => (prev + 1) % testimonials.length)
                  }
                  className="w-10 h-10 rounded-full bg-card/80 dark:bg-card/50 border border-border/40 dark:border-border/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.215, 0.61, 0.355, 1] }}
            className="relative overflow-hidden rounded-3xl border border-border/40 dark:border-border/20 bg-card/80 dark:bg-card/55 p-7 sm:p-10 text-center"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-primary/[0.03]" />
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="pointer-events-none absolute -top-20 right-6 h-36 w-36 rounded-full bg-primary/[0.08] blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-sm">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="mb-4 flex items-center justify-center gap-2">
                <span className="inline-flex items-center rounded-full border border-border/40 dark:border-border/20 bg-secondary/50 px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                  Verified creators only
                </span>
                <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-[10px] font-medium text-primary">
                  Public stories coming soon
                </span>
              </div>
              <p className="text-foreground font-heading font-semibold text-xl sm:text-2xl tracking-tight">
                Be the first public story
              </p>
              <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl mx-auto">
                We only show verified creator testimonials. Share your experience and help early visitors understand how Engazium feels in real use.
              </p>

              <Link
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_-10px_hsl(var(--primary)/0.6)]"
                href={currentUser ? "/dashboard" : `/sign-in?redirect=${encodeURIComponent("/dashboard")}`}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    sessionStorage.setItem("dashboard_tab", "testimonial");
                  }
                }}
              >
                <PenLine className="h-4 w-4" />
                Share Your Experience
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
