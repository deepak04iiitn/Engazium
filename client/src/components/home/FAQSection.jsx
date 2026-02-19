"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Shield,
  Zap,
  Users,
  CreditCard,
  Plus,
  Minus,
} from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: HelpCircle },
  { id: "basics", label: "Basics", icon: Zap },
  { id: "safety", label: "Safety", icon: Shield },
  { id: "squads", label: "Squads", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
];

const faqs = [
  {
    id: 1,
    category: "basics",
    question: "What exactly is an engagement squad?",
    answer:
      "An engagement squad is a group of 10–30 creators in the same niche who agree to engage with each other's content shortly after posting. This early engagement signals to social media algorithms that your content is valuable, boosting its organic reach.",
  },
  {
    id: 2,
    category: "safety",
    question: "Is this safe for my social media account?",
    answer:
      "Absolutely. Unlike bots or spam pods, Engazium uses time-distributed engagement from real human creators. Squad sizes are capped, engagement is spread naturally over time, and we enforce quality guidelines to mimic organic behavior — keeping your account 100% safe.",
  },
  {
    id: 3,
    category: "basics",
    question: "How is this different from WhatsApp or Telegram pods?",
    answer:
      "Traditional pods have no rules, no accountability, and are filled with freeloaders. Engazium solves this with engagement percentage tracking — your participation rate is measured in real time, so inactive members are identified and rotated out. Plus, we match you by niche and follower range for maximum relevance.",
  },
  {
    id: 4,
    category: "squads",
    question: "How does engagement percentage tracking work?",
    answer:
      "Every member's engagement activity is tracked as a percentage. When squad members post content, your interactions (likes, comments, saves) are measured against expected participation. Staying above the threshold keeps you in good standing and ensures everyone contributes equally — no freeloaders.",
  },
  {
    id: 5,
    category: "basics",
    question: "What platforms does Engazium support?",
    answer:
      "Engazium currently supports Instagram, LinkedIn, YouTube, and Twitter/X. We're actively working on adding support for more platforms based on community demand.",
  },
  {
    id: 6,
    category: "billing",
    question: "How much does it cost?",
    answer:
      "We offer three plans: Core at ₹50/month (10-member squad, 1 post/day), Growth at ₹100/month (20-member squad, 2 posts/day), and Momentum at ₹150/month (30-member squad, 3 posts/day). All plans come with a free trial so you can experience the growth before committing.",
  },
  {
    id: 7,
    category: "squads",
    question: "Can I switch squads or niches?",
    answer:
      "Yes! You can switch squads during your billing cycle. Higher-tier plans (Growth and Momentum) offer priority squad matching to help you find the best fit across different niches or platforms.",
  },
  {
    id: 8,
    category: "squads",
    question: "What if someone in my squad doesn't engage?",
    answer:
      "Our engagement percentage tracking system automatically handles this. Members whose participation rate drops below the threshold are flagged and given a grace period to improve. Consistently inactive members are rotated out and replaced with active creators.",
  },
];

const anim = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
};

const FAQCard = ({ faq, index, isOpen, onToggle }) => {
  const CategoryIcon =
    categories.find((c) => c.id === faq.category)?.icon || HelpCircle;
  const categoryLabel =
    categories.find((c) => c.id === faq.category)?.label || "General";

  return (
    <motion.div
      layout
      className={`group relative bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl border transition-all duration-400 overflow-hidden cursor-pointer ${
        isOpen
          ? "border-primary/25 dark:border-primary/20 shadow-lg dark:shadow-none"
          : "border-border/40 dark:border-border/20 shadow-sm dark:shadow-none hover:border-primary/15 dark:hover:border-primary/15 hover:shadow-md dark:hover:shadow-none"
      }`}
      onClick={onToggle}
    >
      {/* Glow line at top when open */}
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent transition-opacity duration-400 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Main content area */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Number indicator */}
          <div
            className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-heading font-bold transition-all duration-400 ${
              isOpen
                ? "bg-primary text-primary-foreground"
                : "bg-primary/8 dark:bg-primary/10 text-primary group-hover:bg-primary/12 dark:group-hover:bg-primary/15"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Question + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors duration-400 ${
                  isOpen
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary/80 dark:bg-secondary/40 text-muted-foreground"
                }`}
              >
                <CategoryIcon className="h-2.5 w-2.5" />
                {categoryLabel}
              </span>
            </div>

            <h3
              className={`font-heading font-semibold text-sm sm:text-base leading-snug transition-colors duration-300 pr-8 ${
                isOpen ? "text-foreground" : "text-foreground/85 group-hover:text-foreground"
              }`}
            >
              {faq.question}
            </h3>
          </div>

          {/* Toggle icon */}
          <div className="shrink-0 mt-1">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-400 ${
                isOpen
                  ? "bg-primary/10 text-primary rotate-0"
                  : "bg-secondary/60 dark:bg-secondary/30 text-muted-foreground"
              }`}
            >
              {isOpen ? (
                <Minus className="h-3.5 w-3.5" />
              ) : (
                <Plus className="h-3.5 w-3.5" />
              )}
            </div>
          </div>
        </div>

        {/* Answer — animated expand */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 pl-14">
                <div className="h-px bg-gradient-to-r from-primary/15 via-border/30 to-transparent mb-4" />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState(null);

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative py-28 sm:py-36 md:py-44 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-20" />

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        {/* Header — centered */}
        <motion.div {...anim} className="text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 dark:bg-primary/10 border border-primary/12 dark:border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6">
            <HelpCircle className="h-3 w-3" />
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter">
            Got{" "}
            <span className="text-gradient-animated">questions?</span>
          </h2>
          <p className="text-muted-foreground mt-5 text-base sm:text-lg max-w-xl mx-auto">
            Everything you need to know about Engazium and how it helps you
            grow. Can&apos;t find what you&apos;re looking for? Reach out to us.
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div {...anim} className="flex justify-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-card/60 dark:bg-card/30 backdrop-blur-sm border border-border/30 dark:border-border/15 overflow-x-auto scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenId(null);
                  }}
                  className={`relative flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 dark:hover:bg-secondary/30"
                  }`}
                >
                  <cat.icon className="h-3.5 w-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* FAQ grid */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredFaqs.map((faq, i) => (
                <motion.div
                  key={faq.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.03,
                    layout: { duration: 0.3 },
                  }}
                  className={
                    openId === faq.id ? "md:col-span-2" : "md:col-span-1"
                  }
                >
                  <FAQCard
                    faq={faq}
                    index={faqs.indexOf(faq)}
                    isOpen={openId === faq.id}
                    onToggle={() => handleToggle(faq.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
