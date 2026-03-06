"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Send } from "lucide-react";

const WHATSAPP_LINK = "https://chat.whatsapp.com/H0FkMBg2Ein2wZQbiqwR2k?mode=hq1tcla";
const TELEGRAM_LINK = "https://t.me/+rJ0KtCJd5UsyZGQ1";

const loopItems = [
  {
    label: "WhatsApp Creator Community",
    href: WHATSAPP_LINK,
    icon: MessageCircle,
    tint: "text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Telegram Growth Community",
    href: TELEGRAM_LINK,
    icon: Send,
    tint: "text-sky-600 dark:text-sky-400",
  },
  {
    label: "Daily Growth Signals",
    href: WHATSAPP_LINK,
    icon: MessageCircle,
    tint: "text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Creator Networking Drops",
    href: TELEGRAM_LINK,
    icon: Send,
    tint: "text-sky-600 dark:text-sky-400",
  },
];

const CommunityJoinSection = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="absolute top-0 left-1/3 w-[240px] sm:w-[380px] md:w-[540px] h-[240px] sm:h-[380px] md:h-[540px] rounded-full blur-[100px] md:blur-[170px] bg-primary/[0.04] dark:bg-primary/[0.08]" />
      <div className="absolute bottom-0 right-0 w-[220px] sm:w-[340px] md:w-[500px] h-[220px] sm:h-[340px] md:h-[500px] rounded-full blur-[90px] md:blur-[150px] bg-glow-secondary/[0.03] dark:bg-glow-secondary/[0.08]" />

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.215, 0.61, 0.355, 1] }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-3xl sm:rounded-[2rem] border border-border/40 dark:border-border/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-primary/[0.03] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

            <div className="relative z-10 p-6 sm:p-8 md:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-7 mb-7">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1.5 text-xs font-medium text-primary mb-4">
                    Community Access
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.9rem] font-heading font-bold tracking-tighter">
                    Join our live communities.
                    <br />
                    <span className="text-gradient">Stay in the growth loop 24/7.</span>
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed max-w-xl">
                    Get instant strategy updates, collaboration threads, and
                    momentum reminders directly through WhatsApp and Telegram.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 min-w-[240px]">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.08] hover:bg-emerald-500/[0.13] px-4 sm:px-5 py-3.5 transition-all duration-300"
                  >
                    <span className="inline-flex items-center gap-2.5 text-sm font-semibold text-foreground">
                      <MessageCircle className="h-4.5 w-4.5 text-emerald-500" />
                      Join WhatsApp
                    </span>
                    <ArrowRight className="h-4 w-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href={TELEGRAM_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center justify-between gap-3 rounded-2xl border border-sky-500/25 bg-sky-500/[0.08] hover:bg-sky-500/[0.13] px-4 sm:px-5 py-3.5 transition-all duration-300"
                  >
                    <span className="inline-flex items-center gap-2.5 text-sm font-semibold text-foreground">
                      <Send className="h-4.5 w-4.5 text-sky-500" />
                      Join Telegram
                    </span>
                    <ArrowRight className="h-4 w-4 text-sky-500 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-border/35 dark:border-border/20 overflow-hidden">
                <div className="py-3.5 sm:py-4 bg-secondary/35 dark:bg-secondary/20">
                  <div className="flex animate-marquee-fast">
                    {[...loopItems, ...loopItems, ...loopItems].map((item, i) => (
                      <a
                        key={`community-loop-1-${i}`}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 mx-3 sm:mx-4 inline-flex items-center gap-2.5 rounded-full border border-border/40 dark:border-border/25 bg-background/70 dark:bg-background/40 px-4 sm:px-5 py-2 hover:border-primary/30 transition-colors"
                      >
                        <item.icon className={`h-3.5 w-3.5 ${item.tint}`} />
                        <span className="text-xs sm:text-sm font-medium text-foreground/85 whitespace-nowrap">
                          {item.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="py-3.5 sm:py-4 bg-primary/[0.02] dark:bg-primary/[0.03] border-t border-border/30 dark:border-border/15">
                  <div className="flex animate-marquee-reverse">
                    {[...loopItems, ...loopItems, ...loopItems].map((item, i) => (
                      <a
                        key={`community-loop-2-${i}`}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 mx-3 sm:mx-4 inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                      >
                        <item.icon className={`h-3.5 w-3.5 ${item.tint}`} />
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityJoinSection;

