"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter Squad",
    size: "10 Members",
    price: "₹50",
    period: "/month",
    description: "Focused, high-quality engagement without overload.",
    features: [
      "10-member niche squad",
      "Credit-based engagement system",
      "Meaningful comment guidelines",
      "Weekly progress tracking",
      "Community support access",
    ],
    popular: false,
  },
  {
    name: "Growth Squad",
    size: "20 Members",
    price: "₹100",
    period: "/month",
    description: "Wider early engagement for frequent posters.",
    features: [
      "20-member niche squad",
      "Credit-based engagement system",
      "Meaningful comment guidelines",
      "Weekly progress tracking",
      "Priority squad matching",
      "Advanced engagement analytics",
    ],
    popular: true,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-heading text-sm font-semibold uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
            Simple,{" "}
            <span className="text-gradient">Creator-Friendly</span>{" "}
            Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Pay per squad. No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
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
