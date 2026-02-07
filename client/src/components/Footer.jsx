import Image from "next/image";
import { Instagram, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/Engazium_Logo.png";

const footerLinks = {
  Product: ["How It Works", "Features", "Pricing", "Squads"],
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
    <footer className="relative border-t border-border/30 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <Image
                src={logo}
                alt="Engazium"
                height={44}
                className="h-11 w-auto"
              />
              <span className="font-heading text-xl font-bold text-foreground">
                Engazium
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              The engagement & reach hub for creators. Build engagement, expand reach, grow together.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading font-semibold text-foreground text-sm mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => {
                  const label = typeof link === "string" ? link : link.label;
                  const href = typeof link === "string" ? "#" : link.href;
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-muted-foreground text-sm hover:text-primary transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Engazium. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
