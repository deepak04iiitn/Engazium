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
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      {/* Glow */}
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[250px] h-[250px] bg-glow-secondary/5 rounded-full blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-heading text-sm font-semibold uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
            Creators Are{" "}
            <span className="text-gradient">Loving It</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Don't take our word for it — hear from creators who've transformed their growth with Engazium.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                "{testimonial.quote}"
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
