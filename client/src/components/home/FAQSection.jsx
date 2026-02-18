"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What exactly is an engagement squad?",
    answer:
      "An engagement squad is a group of 10–30 creators in the same niche who agree to engage with each other's content shortly after posting. This early engagement signals to social media algorithms that your content is valuable, boosting its organic reach.",
  },
  {
    question: "Is this safe for my social media account?",
    answer:
      "Absolutely. Unlike bots or spam pods, Engazium uses time-distributed engagement from real human creators. Squad sizes are capped, engagement is spread naturally over time, and we enforce quality guidelines to mimic organic behavior — keeping your account 100% safe.",
  },
  {
    question: "How is this different from WhatsApp or Telegram pods?",
    answer:
      "Traditional pods have no rules, no accountability, and are filled with freeloaders. Engazium solves this with a credit-based system — you must engage with others to earn the right to post. Plus, we match you by niche and follower range for maximum relevance.",
  },
  {
    question: "How does the credit system work?",
    answer:
      "You earn credits by engaging with squad members' content (liking, commenting, saving). You spend credits when you share your own post for engagement. This ensures everyone contributes equally and eliminates freeloaders.",
  },
  {
    question: "What platforms does Engazium support?",
    answer:
      "Engazium currently supports Instagram, LinkedIn, YouTube, and Twitter/X. We're actively working on adding support for more platforms based on community demand.",
  },
  {
    question: "How much does it cost?",
    answer:
      "We offer three plans: Core at ₹50/month (10-member squad, 1 post/day), Growth at ₹100/month (20-member squad, 2 posts/day), and Momentum at ₹150/month (30-member squad, 3 posts/day). All plans come with a free trial so you can experience the growth before committing.",
  },
  {
    question: "Can I switch squads or niches?",
    answer:
      "Yes! You can switch squads during your billing cycle. Higher-tier plans (Growth and Momentum) offer priority squad matching to help you find the best fit across different niches or platforms.",
  },
  {
    question: "What if someone in my squad doesn't engage?",
    answer:
      "Our credit system automatically handles this. Members who don't engage run out of credits and can't post their content for engagement. Consistently inactive members are rotated out and replaced with active creators.",
  },
];

const anim = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left — header + CTA */}
          <motion.div {...anim} className="lg:sticky lg:top-32 lg:self-start">
            <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mt-3 tracking-tight">
              Got{" "}
              <span className="text-gradient">questions?</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base md:text-lg max-w-md">
              Everything you need to know about Engazium and how it helps you
              grow.
            </p>

            {/* Integrated CTA */}
            <div className="mt-8 sm:mt-10 p-6 sm:p-7 bg-card rounded-2xl border border-border/50 shadow-sm dark:shadow-none dark:border-border/30">
              <h3 className="font-heading font-semibold text-foreground text-lg mb-2">
                Ready to grow together?
              </h3>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                Join thousands of micro creators boosting their engagement and
                reach.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/sign-up" className="flex-1">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl font-heading font-semibold group text-sm py-5">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary/80 rounded-xl font-heading text-sm py-5"
                >
                  Talk to Us
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right — Accordion */}
          <motion.div {...anim}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl sm:rounded-2xl px-5 sm:px-6 border border-border/50 shadow-sm dark:shadow-none dark:border-border/30 data-[state=open]:border-primary/20 dark:data-[state=open]:border-primary/20 transition-colors"
                >
                  <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-primary hover:no-underline py-4 sm:py-5 text-sm sm:text-[15px]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4 sm:pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
