"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      "Credit-based engagement system",
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
      "Credit-based engagement system",
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
      "Credit-based engagement system",
      "Meaningful comment guidelines",
      "Priority squad matching",
      "Advanced engagement analytics",
      "Dedicated support",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-14 sm:py-20 md:py-24 overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 sm:mt-3 mb-3 sm:mb-4">
            Simple,{" "}
            <span className="text-gradient">Creator-Friendly</span>{" "}
            Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            Pay per squad. No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll | Tablet+: grid */}
        {/* Mobile View - Horizontal Scroll */}
        <div className="md:hidden">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-none">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative rounded-xl p-5 min-w-[280px] snap-center flex-shrink-0 ${
                  plan.popular
                    ? "glass glow-box gradient-border"
                    : "glass gradient-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-heading font-semibold px-2.5 py-0.5 rounded-full">
                      <Zap className="h-2.5 w-2.5" />
                      Popular
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-heading font-semibold text-foreground text-base">
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

                <ul className="space-y-2 mb-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <Check className="h-2.5 w-2.5 text-primary" />
                      </div>
                      <span className="text-xs text-secondary-foreground leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full rounded-lg py-4 text-sm font-heading font-semibold ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Join {plan.name}
                </Button>
              </motion.div>
            ))}
          </div>
          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {plans.map((plan) => (
              <div key={plan.name} className={`w-1.5 h-1.5 rounded-full ${plan.popular ? 'bg-primary' : 'bg-border'}`} />
            ))}
          </div>
        </div>

        {/* Desktop View - Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "glass glow-box gradient-border"
                  : "glass gradient-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-heading font-semibold px-3 py-1 rounded-full">
                    <Zap className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-heading font-semibold text-foreground text-xl">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {plan.size} · {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-heading font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground text-sm">
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-secondary-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-xl py-5 font-heading font-semibold ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                Join {plan.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
