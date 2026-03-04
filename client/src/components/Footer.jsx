"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Instagram,
  Twitter,
  Youtube,
  ArrowUpRight,
  Radio,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";
import logo from "@/assets/Engazium_Logo.png";

const footerLinks = {
  Product: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Pricing", href: "/pricing" },
    { label: "Squads", href: "/squads" },
  ],
  Company: [
    { label: "About", href: "/about-us" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "/contact-us" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
    { label: "Guidelines", href: "#" },
    { label: "Safety", href: "#" },
  ],
};

const USER_COUNT_POLL_INTERVAL = 30000;

const formatCompactNumber = (value) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value || 0);

const DIGIT_GLYPHS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const toSafeNumber = (value, fallback = null) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const RollingDigit = ({ digit }) => (
  <span className="relative inline-flex h-[1em] w-[0.64em] overflow-hidden align-baseline">
    <span
      className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ transform: `translateY(-${digit * 10}%)` }}
      aria-hidden="true"
    >
      {DIGIT_GLYPHS.map((glyph) => (
        <span
          key={glyph}
          className="inline-flex h-[1em] items-center justify-center leading-none"
        >
          {glyph}
        </span>
      ))}
    </span>
  </span>
);

const AnimatedCompactNumber = ({ value }) => {
  const formatted = formatCompactNumber(value);

  return (
    <span className="inline-flex items-baseline tabular-nums">
      {formatted.split("").map((char, index) =>
        /\d/.test(char) ? (
          <RollingDigit key={`digit-${index}`} digit={Number(char)} />
        ) : (
          <span key={`char-${index}`} className="leading-none">
            {char}
          </span>
        )
      )}
    </span>
  );
};

const Footer = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [liveUserCount, setLiveUserCount] = useState(10000);
  const [newUsersToday, setNewUsersToday] = useState(0);
  const [isCounterLoading, setIsCounterLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchLiveUserCount = async ({ silent } = { silent: false }) => {
      if (!silent && isMounted) setIsCounterLoading(true);

      try {
        const res = await fetch("/api/growth/live-user-count", {
          cache: "no-store",
        });
        const data = await res.json();

        if (res.ok && isMounted && data?.success !== false) {
          // Supports both:
          // - /api/growth/live-user-count => { totalUsers, newUsersToday }
          // - /api/admin/users => { pagination: { totalUsers } }
          const totalUsers =
            toSafeNumber(data?.totalUsers) ??
            toSafeNumber(data?.pagination?.totalUsers) ??
            toSafeNumber(data?.data?.totalUsers);

          const todayUsers =
            toSafeNumber(data?.newUsersToday) ??
            toSafeNumber(data?.data?.newUsersToday);

          if (totalUsers !== null) setLiveUserCount(totalUsers);
          if (todayUsers !== null) setNewUsersToday(todayUsers);
        }
      } catch {
        // Keep the existing value when API is unavailable.
      } finally {
        if (isMounted) setIsCounterLoading(false);
      }
    };

    fetchLiveUserCount();
    const pollInterval = setInterval(
      () => fetchLiveUserCount({ silent: true }),
      USER_COUNT_POLL_INTERVAL
    );

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, []);

  return (
    <footer className="relative border-t border-border/30 dark:border-border/15 overflow-hidden">
      {/* Subtle mesh gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-20" />

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        {/* Top CTA band */}
        <div className="py-12 sm:py-16 border-b border-border/20 dark:border-border/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Ready to grow your{" "}
                <span className="text-gradient">reach?</span>
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base mt-2">
                Join 10,000+ creators already using Engazium.
              </p>
            </div>
            <a
              href={currentUser ? "/dashboard" : "/sign-up"}
              className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-heading font-semibold text-sm sm:text-base glow-box hover:bg-primary/90 transition-all duration-300 shrink-0"
            >
              {currentUser ? "Go to Dashboard" : "Start Growing Free"}
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Main footer content */}
        <div className="py-14 sm:py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12">
            {/* Brand */}
            <div className="col-span-2">
              <a href="/" className="flex items-center gap-2.5 mb-5 group">
                <Image
                  src={logo}
                  alt="Engazium"
                  height={40}
                  className="h-9 sm:h-10 w-auto group-hover:scale-105 transition-transform duration-300"
                />
                <span className="font-heading text-lg sm:text-xl font-bold text-foreground tracking-tight">
                  Engazium
                </span>
              </a>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-7">
                The engagement & reach hub for creators. Build engagement,
                expand reach, grow together.
              </p>
              <div className="mb-6 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.09] via-primary/[0.03] to-transparent p-4 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                      Live creators
                    </span>
                  </div>
                  <Radio className="h-3.5 w-3.5 text-primary animate-pulse" />
                </div>

                <div className="mt-3 flex items-end gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-4 w-4" />
                  </span>
                  <p className="font-heading text-2xl font-bold tracking-tight text-foreground">
                    {isCounterLoading ? (
                      <span className="inline-block h-8 w-24 animate-pulse rounded-md bg-foreground/10" />
                    ) : (
                      <>
                        <AnimatedCompactNumber value={liveUserCount} />
                        <span className="ml-1 text-base text-primary">+</span>
                      </>
                    )}
                  </p>
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  Creators currently part of Engazium
                  {newUsersToday > 0 ? ` · +${newUsersToday} today` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                {[Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-secondary/70 dark:bg-secondary/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-heading font-semibold text-foreground text-sm mb-5 uppercase tracking-wider text-xs">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200 inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-50 group-hover:translate-y-0 transition-all duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/20 dark:border-border/10 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground/70 text-xs sm:text-sm">
            © 2026 Engazium. All rights reserved.
          </p>
          <div className="flex items-center gap-6 sm:gap-8">
            <a
              href="#"
              className="text-muted-foreground/70 text-xs sm:text-sm hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground/70 text-xs sm:text-sm hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
