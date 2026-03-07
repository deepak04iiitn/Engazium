"use client";

import Image from "next/image";
import { Send, MessageCircle, Linkedin, ArrowUpRight } from "lucide-react";
import { useSelector } from "react-redux";
import logo from "@/assets/Engazium_Logo.png";

const WHATSAPP_LINK = "https://chat.whatsapp.com/H0FkMBg2Ein2wZQbiqwR2k?mode=hq1tcla";
const TELEGRAM_LINK = "https://t.me/+rJ0KtCJd5UsyZGQ1";
const LINKEDIN_LINK = "https://www.linkedin.com/in/deepak-kumar-yadav-a0653b248/";

const socialLinks = [
  { label: "Telegram", href: TELEGRAM_LINK, icon: Send },
  { label: "WhatsApp", href: WHATSAPP_LINK, icon: MessageCircle },
  { label: "LinkedIn", href: LINKEDIN_LINK, icon: Linkedin },
];

const footerLinks = {
  Product: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Squads", href: "/squads" },
  ],
  Company: [
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  Support: [
    { label: "Sign In", href: "/sign-in" },
    { label: "Sign Up", href: "/sign-up" },
    { label: "Dashboard", href: "/dashboard" },
  ],
};

const Footer = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <footer className="relative border-t border-border/30 dark:border-border/15 overflow-hidden">
      {/* Subtle mesh gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      {/* Brand mist wordmark */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center overflow-hidden px-4 sm:px-8">
        <div
          className="select-none whitespace-nowrap font-heading font-black uppercase tracking-[0.16em] sm:tracking-[0.2em] leading-none text-[clamp(3.2rem,14vw,13rem)] text-transparent bg-clip-text bg-gradient-to-t from-primary/20 via-primary/12 to-transparent blur-[0.2px]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, rgba(255,255,255,0.9) 35%, rgba(255,255,255,0.55) 58%, rgba(255,255,255,0.18) 76%, rgba(255,255,255,0) 100%)",
            maskImage:
              "linear-gradient(to top, rgba(255,255,255,0.9) 35%, rgba(255,255,255,0.55) 58%, rgba(255,255,255,0.18) 76%, rgba(255,255,255,0) 100%)",
            transform: "translateY(18%)",
          }}
          aria-hidden="true"
        >
          ENGAZIUM
        </div>
      </div>

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
              <div className="flex items-center gap-2.5">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-secondary/70 dark:bg-secondary/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <a
                href="https://www.producthunt.com/products/engazium?utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-engazium"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block"
              >
                <img
                  alt="Engazium - The engagement pod - done right. No bots. No chaos. | Product Hunt"
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1092155&theme=light&t=1772901940878"
                  style={{ width: "200px", height: "auto" }}
                />
              </a>
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
              href="/privacy-policy"
              className="text-muted-foreground/70 text-xs sm:text-sm hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
