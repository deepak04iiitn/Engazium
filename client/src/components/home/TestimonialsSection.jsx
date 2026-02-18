"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    handle: "@priyacreates",
    initials: "PS",
    niche: "Lifestyle Creator",
    quote:
      "My reels used to get 200 views max. After joining an Engazium squad, my average jumped to 2,000+ within three weeks. The early engagement makes all the difference.",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    handle: "@arjuntalks",
    initials: "AM",
    niche: "Tech Reviewer",
    quote:
      "I was skeptical at first, but the credit system keeps everyone honest. No freeloaders, just real creators supporting each other. My follower growth has been insane.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    handle: "@snehastyle",
    initials: "SR",
    niche: "Fashion & Beauty",
    quote:
      "Unlike WhatsApp pods where people ghost, Engazium squads are accountable. My engagement rate doubled and I landed my first brand deal through the network.",
    rating: 5,
  },
  {
    name: "Karthik Nair",
    handle: "@karthikfitness",
    initials: "KN",
    niche: "Fitness Creator",
    quote:
      "The niche matching is brilliant. I'm in a squad with other fitness creators so the engagement actually looks natural and helps the algorithm push my content.",
    rating: 5,
  },
  {
    name: "Ananya Das",
    handle: "@ananyaeats",
    initials: "AD",
    niche: "Food Blogger",
    quote:
      "From 500 followers to 5K in two months. The weekly accountability tracking keeps me consistent and motivated. Best ₹50 I've ever spent.",
    rating: 5,
  },
  {
    name: "Rohan Gupta",
    handle: "@rohanvisuals",
    initials: "RG",
    niche: "Photography",
    quote:
      "The time-distributed engagement feature is what sold me. My account feels safe and the growth is 100% organic. Highly recommend to any micro creator.",
    rating: 5,
  },
];

const TestimonialCard = ({ t }) => (
  <div className="shrink-0 w-[300px] sm:w-[340px] bg-card rounded-2xl p-5 sm:p-6 border border-border/50 shadow-sm dark:shadow-none dark:border-border/30 mx-2 sm:mx-2.5">
    <Quote className="h-5 w-5 text-primary/20 mb-3" />
    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-4">
      &ldquo;{t.quote}&rdquo;
    </p>
    <div className="flex items-center gap-1 mb-3">
      {Array.from({ length: t.rating }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
      ))}
    </div>
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-full bg-primary/8 dark:bg-primary/10 border border-border/40 flex items-center justify-center shrink-0">
        <span className="text-[10px] font-bold text-primary font-heading">
          {t.initials}
        </span>
      </div>
      <div className="min-w-0">
        <p className="font-heading font-semibold text-foreground text-sm truncate">
          {t.name}
        </p>
        <p className="text-muted-foreground text-xs truncate">
          {t.niche} · {t.handle}
        </p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3, 6);

  return (
    <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mt-3 tracking-tight">
            Creators are{" "}
            <span className="text-gradient">loving it</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-sm sm:text-base md:text-lg max-w-lg">
            Don&apos;t take our word for it — hear from creators who&apos;ve
            transformed their growth.
          </p>
        </motion.div>
      </div>

      {/* Row 1 — scroll left */}
      <div className="mb-4 sm:mb-5">
        <div className="flex animate-marquee">
          {[...row1, ...row1, ...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scroll right */}
      <div>
        <div className="flex animate-marquee-reverse">
          {[...row2, ...row2, ...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
