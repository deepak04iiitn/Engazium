"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Priya Sharma",
    handle: "@priyacreates",
    avatar: "",
    initials: "PS",
    niche: "Lifestyle Creator",
    quote:
      "My reels used to get 200 views max. After joining an Engazium squad, my average jumped to 2,000+ within three weeks. The early engagement makes all the difference.",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    handle: "@arjuntalks",
    avatar: "",
    initials: "AM",
    niche: "Tech Reviewer",
    quote:
      "I was skeptical at first, but the credit system keeps everyone honest. No freeloaders, just real creators supporting each other. My follower growth has been insane.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    handle: "@snehastyle",
    avatar: "",
    initials: "SR",
    niche: "Fashion & Beauty",
    quote:
      "Unlike WhatsApp pods where people ghost, Engazium squads are accountable. My engagement rate doubled and I landed my first brand deal through the network.",
    rating: 5,
  },
  {
    name: "Karthik Nair",
    handle: "@karthikfitness",
    avatar: "",
    initials: "KN",
    niche: "Fitness Creator",
    quote:
      "The niche matching is brilliant. I'm in a squad with other fitness creators so the engagement actually looks natural and helps the algorithm push my content.",
    rating: 5,
  },
  {
    name: "Ananya Das",
    handle: "@ananyaeats",
    avatar: "",
    initials: "AD",
    niche: "Food Blogger",
    quote:
      "From 500 followers to 5K in two months. The weekly accountability tracking keeps me consistent and motivated. Best ₹50 I've ever spent.",
    rating: 5,
  },
  {
    name: "Rohan Gupta",
    handle: "@rohanvisuals",
    avatar: "",
    initials: "RG",
    niche: "Photography",
    quote:
      "The time-distributed engagement feature is what sold me. My account feels safe and the growth is 100% organic. Highly recommend to any micro creator.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-14 sm:py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      {/* Glow */}
      <div className="absolute top-0 right-1/4 w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[150px] h-[150px] md:w-[250px] md:h-[250px] bg-glow-secondary/5 rounded-full blur-[60px] md:blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 sm:mt-3 mb-3 sm:mb-4">
            Creators Are{" "}
            <span className="text-gradient">Loving It</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            Don't take our word for it — hear from creators who've transformed their growth with Engazium.
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll cards | Desktop: grid */}
        {/* Mobile View */}
        <div className="md:hidden">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-none">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass rounded-xl p-4 gradient-border min-w-[260px] snap-center flex-shrink-0 flex flex-col"
              >
                <Quote className="h-5 w-5 text-primary/20 mb-2" />

                <p className="text-muted-foreground text-xs leading-relaxed mb-3 flex-1 line-clamp-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-primary text-primary"
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border border-border/50">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-heading font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-heading font-semibold text-foreground text-xs truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-muted-foreground text-[10px] truncate">
                      {testimonial.niche}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 gradient-border group hover:bg-card/60 transition-all duration-300 flex flex-col"
            >
              <Quote className="h-8 w-8 text-primary/20 mb-4" />

              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-border/50">
                  <AvatarImage src={testimonial.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-heading font-semibold">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.niche} · {testimonial.handle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
