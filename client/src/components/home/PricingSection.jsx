"use client";

import { motion } from "framer-motion";
import { Check, Zap, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Core",
    size: "10 Members",
    price: "₹50",
    period: "/month",
    description: "Perfect for creators starting their engagement journey.",
    features: [
      "Up to 10 members per squad",
      "1 post per day per person",
      "Engagement percentage tracking",
      "Meaningful comment guidelines",
      "Weekly progress tracking",
      "Community support access",
    ],
    popular: false,
  },
  {
    name: "Growth",
    size: "20 Members",
    price: "₹100",
    period: "/month",
    description: "Ideal for active creators who post frequently.",
    features: [
      "Up to 20 members per squad",
      "2 posts per day per person",
      "Engagement percentage tracking",
      "Meaningful comment guidelines",
      "Priority squad matching",
      "Advanced engagement analytics",
    ],
    popular: true,
  },
  {
    name: "Momentum",
    size: "30 Members",
    price: "₹150",
    period: "/month",
    description: "Maximum reach for power creators and brands.",
    features: [
      "Up to 30 members per squad",
      "3 posts per day per person",
      "Engagement percentage tracking",
      "Meaningful comment guidelines",
      "Priority squad matching",
      "Advanced engagement analytics",
      "Dedicated support",
    ],
    popular: false,
  },
];

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] },
});

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="relative py-28 sm:py-36 md:py-44 overflow-hidden"
    >
      {/* Background mesh */}
      <div className="absolute inset-0 mesh-gradient opacity-40" />

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        {/* Header */}
        <motion.div
          {...anim()}
          className="text-center mb-16 sm:mb-20 md:mb-24"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 dark:bg-primary/10 border border-primary/12 dark:border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6">
            <Sparkles className="h-3 w-3" />
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter">
            Simple,{" "}
            <span className="text-gradient-animated">creator-friendly</span>
            <br className="hidden sm:block" /> pricing
          </h2>
          <p className="text-muted-foreground mt-5 sm:mt-6 text-base sm:text-lg md:text-xl max-w-lg mx-auto">
            Pay per squad. No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 scrollbar-none">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...anim(0.08 * i)}
                className={`relative rounded-2xl p-5 min-w-[280px] snap-center shrink-0 border backdrop-blur-sm ${
                  plan.popular
                    ? "bg-card/90 dark:bg-card/70 border-primary/30 shadow-lg dark:shadow-none"
                    : "bg-card/70 dark:bg-card/50 border-border/40 dark:border-border/20 shadow-sm dark:shadow-none"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-heading font-semibold px-3 py-0.5 rounded-full glow-box">
                      <Zap className="h-2.5 w-2.5" />
                      Popular
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-heading font-bold text-foreground text-base">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {plan.size}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-3xl font-heading font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="h-2.5 w-2.5 text-primary" />
                      </div>
                      <span className="text-xs text-secondary-foreground leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/sign-up">
                  <Button
                    className={`w-full rounded-xl py-4 text-sm font-heading font-semibold ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-box"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Join {plan.name}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              {...anim(0.1 * i)}
              className={`group relative rounded-[1.75rem] p-7 lg:p-8 border transition-all duration-500 backdrop-blur-sm overflow-hidden ${
                plan.popular
                  ? "bg-card/90 dark:bg-card/70 border-primary/30 dark:border-primary/25 shadow-xl dark:shadow-none -mt-4 mb-[-16px] scale-[1.02]"
                  : "bg-card/70 dark:bg-card/50 border-border/40 dark:border-border/20 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none hover:border-primary/15 dark:hover:border-primary/15"
              }`}
            >
              {/* Animated gradient border for popular */}
              {plan.popular && (
                <>
                  <div className="absolute inset-0 rounded-[1.75rem] gradient-border-animated" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                </>
              )}

              {/* Subtle hover glow */}
              <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-b from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/[0.02] group-hover:via-transparent group-hover:to-primary/[0.01] transition-all duration-500 pointer-events-none" />

              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-heading font-semibold px-5 py-1.5 rounded-full glow-box-intense">
                    <Zap className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="relative z-10">
                <div className="mb-6 sm:mb-8">
                  <h3 className="font-heading font-bold text-foreground text-xl sm:text-2xl tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1.5">
                    {plan.size} · {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1.5 mb-8 sm:mb-10">
                  <span className="text-5xl font-heading font-bold text-foreground tracking-tighter">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3.5 mb-8 sm:mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          plan.popular
                            ? "bg-primary/15 dark:bg-primary/20"
                            : "bg-primary/10 dark:bg-primary/10"
                        }`}
                      >
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm text-secondary-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/sign-up">
                  <Button
                    className={`w-full rounded-xl py-5 sm:py-6 font-heading font-semibold text-sm sm:text-base group ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-box-intense"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Join {plan.name}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>

              {/* Decorative large plan initial */}
              <span className="absolute -bottom-6 -right-3 text-[10rem] font-heading font-bold text-foreground/[0.015] dark:text-foreground/[0.025] leading-none select-none pointer-events-none">
                {plan.name.charAt(0)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
