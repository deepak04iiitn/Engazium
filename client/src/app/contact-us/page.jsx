"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  Headset,
  MessageSquareText,
  ArrowRight,
  SendHorizonal,
  CheckCircle,
  MessageCircleQuestion,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] },
});

const contactChannels = [
  {
    icon: Mail,
    title: "Email Support",
    detail: "support@engazium.com",
    helper: "Best for account, billing, and verification queries.",
    action: "mailto:support@engazium.com",
    cta: "Send Email",
    color: "from-blue-500/15 to-blue-500/5",
  },
  {
    icon: Phone,
    title: "Phone Line",
    detail: "+91 98765 43210",
    helper: "Available for priority and urgent business requests.",
    action: "tel:+919876543210",
    cta: "Call Now",
    color: "from-emerald-500/15 to-emerald-500/5",
  },
  {
    icon: MapPin,
    title: "Office",
    detail: "Bengaluru, India",
    helper: "Meetings by appointment for partnership discussions.",
    action: "#",
    cta: "Get Directions",
    color: "from-violet-500/15 to-violet-500/5",
  },
];

const supportInfo = [
  {
    icon: Clock3,
    title: "Support Hours",
    desc: "Monday to Saturday, 9:00 AM - 8:00 PM IST",
  },
  {
    icon: Headset,
    title: "Average Reply Time",
    desc: "Under 4 hours on business days",
  },
  {
    icon: MessageSquareText,
    title: "Best Contact Method",
    desc: "In-app or email for fastest ticket tracking",
  },
];

const faqs = [
  {
    q: "How quickly can I expect a response?",
    a: "Most requests receive a first response within 4 business hours.",
  },
  {
    q: "Can I contact you for partnerships or media?",
    a: "Yes. Choose 'Partnership' in the subject field and include your proposal details.",
  },
  {
    q: "Do you provide onboarding support for teams?",
    a: "Absolutely. We can schedule a guided onboarding session for your team.",
  },
];

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitted(false);
    setErrorMessage("");
    try {
      const res = await fetch("/api/feedback/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send message");
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setErrorMessage(error.message || "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <main>
        <section className="relative pt-28 sm:pt-32 md:pt-40 pb-20 sm:pb-24 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 dot-grid" />
          <div className="absolute top-20 right-1/4 w-[280px] sm:w-[420px] md:w-[600px] h-[280px] sm:h-[420px] md:h-[600px] rounded-full blur-[100px] md:blur-[180px] bg-primary/5 dark:bg-primary/10" />
          <div className="absolute bottom-0 left-1/4 w-[200px] sm:w-[320px] md:w-[500px] h-[200px] sm:h-[320px] md:h-[500px] rounded-full blur-[80px] md:blur-[150px] bg-glow-secondary/3 dark:bg-glow-secondary/8" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full blur-[200px] bg-primary/[0.02] dark:bg-primary/[0.04]" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div {...anim(0)}>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 dark:bg-primary/10 border border-primary/12 dark:border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6">
                  <MessageSquareText className="h-3.5 w-3.5" />
                  Contact Us
                </span>
              </motion.div>

              <motion.h1
                {...anim(0.1)}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter mb-6"
              >
                Let&apos;s build your{" "}
                <span className="text-gradient-animated">growth story</span>
              </motion.h1>

              <motion.p
                {...anim(0.2)}
                className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              >
                Questions, partnerships, onboarding help, or feedback. Our team
                is here to support you with quick and thoughtful responses.
              </motion.p>
            </div>
          </div>
        </section>

        <section className="relative py-4 sm:py-10 overflow-hidden">
          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div
              {...anim(0)}
              className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
            >
              {contactChannels.map((item) => (
                <div
                  key={item.title}
                  className="group relative rounded-2xl sm:rounded-3xl border border-border/40 dark:border-border/20 bg-card/80 dark:bg-card/50 backdrop-blur-sm p-6 sm:p-7 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />
                  <div className="relative z-10">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center mb-4">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-foreground/90 text-sm sm:text-base font-medium mb-1">
                      {item.detail}
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                      {item.helper}
                    </p>
                    <a
                      href={item.action}
                      className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:gap-2 transition-all"
                    >
                      {item.cta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div
              {...anim(0.05)}
              className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5"
            >
              <div className="lg:col-span-7 relative bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 border border-border/40 dark:border-border/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.03] pointer-events-none" />
                <div className="relative z-10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold tracking-tight mb-3">
                    Send us a message
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8 max-w-xl">
                    Tell us what you need and we will route your request to the
                    right person. The more context you share, the faster we can
                    help.
                  </p>

                  <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="h-11 sm:h-12 rounded-xl border-border/50 bg-background/70"
                      />
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Your email address"
                        className="h-11 sm:h-12 rounded-xl border-border/50 bg-background/70"
                      />
                    </div>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Subject (e.g. Partnership, Support, Feedback)"
                      className="h-11 sm:h-12 rounded-xl border-border/50 bg-background/70"
                    />
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Write your message..."
                      className="min-h-[140px] sm:min-h-[160px] rounded-xl border-border/50 bg-background/70 resize-none"
                    />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        We usually respond within 4 business hours.
                      </p>
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 sm:px-7 py-5 font-heading font-semibold w-full sm:w-auto"
                      >
                        <SendHorizonal className="mr-2 h-4 w-4" />
                        {submitting ? "Sending..." : "Send Message"}
                      </Button>
                    </div>
                  </form>

                  {submitted && (
                    <div className="mt-4 inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      Thanks! Your message has been queued successfully.
                    </div>
                  )}

                  {errorMessage && (
                    <div className="mt-4 text-sm text-destructive">
                      {errorMessage}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <div className="bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-3xl border border-border/40 dark:border-border/20 p-6 sm:p-7">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight mb-4">
                    Support details
                  </h3>
                  <div className="space-y-4">
                    {supportInfo.map((item) => (
                      <div key={item.title} className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <item.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {item.title}
                          </p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary rounded-3xl p-6 sm:p-7 md:p-8 text-primary-foreground relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.06] to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                      <MessageCircleQuestion className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                      Need quick answers?
                    </h3>
                    <p className="text-primary-foreground/80 text-sm sm:text-base mb-6">
                      Check common questions below, or message us directly for
                      tailored help.
                    </p>
                    <Link className="cursor-pointer" href="/how-it-works">
                      <Button
                        variant="secondary"
                        className="rounded-xl px-5 font-heading text-sm"
                      >
                        Explore Help Guides
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full blur-[100px] md:blur-[150px] bg-glow-secondary/[0.03] dark:bg-glow-secondary/[0.06]" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div
              {...anim(0)}
              className="max-w-4xl mx-auto text-center mb-10 sm:mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tighter">
                Frequently asked questions
              </h2>
            </motion.div>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  {...anim(0.06 * i)}
                  className="bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-border/40 dark:border-border/20"
                >
                  <h3 className="font-heading font-bold text-foreground text-base sm:text-lg mb-2 tracking-tight">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative pt-8 pb-20 sm:pb-28 md:pb-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full blur-[150px] md:blur-[250px] bg-primary/[0.04] dark:bg-primary/[0.08]" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div
              {...anim(0)}
              className="relative max-w-4xl mx-auto text-center"
            >
              <div className="relative bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-3xl sm:rounded-[2rem] p-10 sm:p-14 md:p-20 border border-border/40 dark:border-border/20 overflow-hidden">
                <div className="absolute inset-0 rounded-3xl sm:rounded-[2rem] bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center mx-auto mb-8"
                  >
                    <Headset className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  </motion.div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tighter mb-5">
                    Still need help?
                    <br />
                    <span className="text-gradient-animated">We&apos;re one click away</span>
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Reach out anytime and let us know what you are building.
                    We&apos;ll help you move forward faster.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="mailto:support@engazium.com">
                      <Button
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl sm:rounded-2xl px-8 sm:px-10 py-6 font-heading font-semibold w-full sm:w-auto text-[15px] sm:text-base"
                      >
                        <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Email Support
                      </Button>
                    </a>
                    <Link className="cursor-pointer" href="/how-it-works">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-border text-foreground hover:bg-secondary/80 rounded-xl sm:rounded-2xl px-8 sm:px-10 py-6 font-heading w-full sm:w-auto text-[15px] sm:text-base"
                      >
                        Visit Help Center
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;
