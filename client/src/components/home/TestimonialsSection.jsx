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

const fallbackTestimonials = [
  {
    name: "Priya Sharma",
    handle: "@priyacreates",
    niche: "Lifestyle Creator",
    quote:
      "My reels used to get 200 views max. After joining an Engazium squad, my average jumped to 2,000+ within three weeks. The early engagement makes all the difference.",
    rating: 5,
    metric: "10x views",
  },
  {
    name: "Arjun Mehta",
    handle: "@arjuntalks",
    niche: "Tech Reviewer",
    quote:
      "I was skeptical at first, but the engagement tracking keeps everyone honest. No freeloaders, just real creators supporting each other. My follower growth has been insane.",
    rating: 5,
    metric: "3x followers",
  },
  {
    name: "Sneha Reddy",
    handle: "@snehastyle",
    niche: "Fashion & Beauty",
    quote:
      "Unlike WhatsApp pods where people ghost, Engazium squads are accountable. My engagement rate doubled and I landed my first brand deal through the network.",
    rating: 5,
    metric: "2x engagement",
  },
  {
    name: "Karthik Nair",
    handle: "@karthikfitness",
    niche: "Fitness Creator",
    quote:
      "The niche matching is brilliant. I'm in a squad with other fitness creators so the engagement actually looks natural and helps the algorithm push my content.",
    rating: 5,
    metric: "5x reach",
  },
  {
    name: "Ananya Das",
    handle: "@ananyaeats",
    niche: "Food Blogger",
    quote:
      "From 500 followers to 5K in two months. The weekly accountability tracking keeps me consistent and motivated. Best ₹50 I've ever spent.",
    rating: 5,
    metric: "10x growth",
  },
  {
    name: "Rohan Gupta",
    handle: "@rohanvisuals",
    niche: "Photography",
    quote:
      "The time-distributed engagement feature is what sold me. My account feels safe and the growth is 100% organic. Highly recommend to any micro creator.",
    rating: 5,
    metric: "100% safe",
  },
  {
    name: "Meera Joshi",
    handle: "@meerawrites",
    niche: "Content Writer",
    quote:
      "I was stuck at 800 followers for months. After two weeks in my Engazium squad, I crossed 2K. The structured engagement is a game-changer for micro creators.",
    rating: 5,
    metric: "2.5x growth",
  },
  {
    name: "Vikram Singh",
    handle: "@vikramvlogs",
    niche: "Travel Vlogger",
    quote:
      "What I love most is the accountability. Everyone in my squad genuinely engages because the tracking system keeps everyone on their toes. It's fair and effective.",
    rating: 5,
    metric: "4x reach",
  },
  {
    name: "Divya Patel",
    handle: "@divyadesigns",
    niche: "Graphic Designer",
    quote:
      "The time-distributed engagement means my account stays safe. No weird spikes, just consistent organic growth. Already recommended it to three other creators.",
    rating: 5,
    metric: "100% organic",
  },
];

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

    {/* Author + metric */}
    <div className="flex items-center justify-between">
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
      {t.metric && (
        <span className="text-[10px] sm:text-xs font-heading font-semibold text-primary bg-primary/8 dark:bg-primary/10 px-2.5 py-0.5 rounded-full shrink-0">
          {t.metric}
        </span>
      )}
    </div>
  </div>
);

const MIN_REAL_TESTIMONIALS = 10;

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        // Only show real testimonials once we have 10+ approved
        if (
          res.ok &&
          data.testimonials &&
          data.testimonials.length >= MIN_REAL_TESTIMONIALS
        ) {
          setTestimonials(data.testimonials);
        }
      } catch {
        // Silently fall back to hardcoded testimonials
      }
    };
    fetchTestimonials();
  }, []);

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
            Don&apos;t take our word for it — hear from creators who&apos;ve
            transformed their growth.
          </p>

          {/* CTA — write a testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-7 sm:mt-8"
          >
            <Link
              href={currentUser ? "/dashboard" : "/sign-in"}
              onClick={() => {
                // If user is logged in, set the dashboard to open the testimonial tab
                if (currentUser && typeof window !== "undefined") {
                  sessionStorage.setItem("dashboard_tab", "testimonial");
                }
              }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
            >
              <PenLine className="h-4 w-4" />
              Share Your Experience
            </Link>
          </motion.div>
        </motion.div>
      </div>

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
            <button
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
                <button
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

            <button
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
    </section>
  );
};

export default TestimonialsSection;
