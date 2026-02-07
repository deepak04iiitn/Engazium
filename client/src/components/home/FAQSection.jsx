"use client";

import { motion } from "framer-motion";
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
      "An engagement squad is a group of 10–20 creators in the same niche who agree to engage with each other's content shortly after posting. This early engagement signals to social media algorithms that your content is valuable, boosting its organic reach.",
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
      "We offer two plans: Starter Squad at ₹50/month (one squad, one platform) and Growth Squad at ₹100/month (up to three squads, multi-platform support, plus weekly analytics). Both plans come with a free trial so you can experience the growth before committing.",
  },
  {
    question: "Can I switch squads or niches?",
    answer:
      "Yes! You can switch squads during your billing cycle. Growth plan members can join up to three squads simultaneously across different niches or platforms.",
  },
  {
    question: "What if someone in my squad doesn't engage?",
    answer:
      "Our credit system automatically handles this. Members who don't engage run out of credits and can't post their content for engagement. Consistently inactive members are rotated out and replaced with active creators.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-heading text-sm font-semibold uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
            Got{" "}
            <span className="text-gradient">Questions?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Everything you need to know about Engazium and how it helps you grow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass rounded-xl px-6 gradient-border border-none"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-primary hover:no-underline py-5 text-sm md:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
