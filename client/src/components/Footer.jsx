import Image from "next/image";
import { Instagram, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/Engazium_Logo.png";

const footerLinks = {
  Product: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Squads", href: "/squads" },
  ],
  Company: [
    { label: "About", href: "/about-us" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
    { label: "Guidelines", href: "#" },
    { label: "Safety", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/50 dark:bg-transparent">
      <div className="container mx-auto px-5 sm:px-6 py-14 sm:py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <Image
                src={logo}
                alt="Engazium"
                height={40}
                className="h-9 sm:h-10 w-auto"
              />
              <span className="font-heading text-lg sm:text-xl font-bold text-foreground">
                Engazium
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              The engagement & reach hub for creators. Build engagement, expand
              reach, grow together.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-secondary/70 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading font-semibold text-foreground text-sm mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Engazium. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
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
