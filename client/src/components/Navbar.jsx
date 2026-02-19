"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LogOut,
  User,
  ChevronDown,
  LayoutDashboard,
  Sun,
  Moon,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "@/redux/user/userSlice";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Engazium_Logo.png";

const navLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Squads", href: "/squads" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const profileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll for background change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setProfileOpen(false);
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        dispatch(logoutSuccess());
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/80 dark:bg-card/60 backdrop-blur-xl border-b border-border/30 dark:border-border/15 shadow-sm dark:shadow-none"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
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

        {/* Desktop Nav — pill container */}
        <div className="hidden md:flex items-center">
          <div
            className={`flex items-center gap-0.5 rounded-full px-1.5 py-1 transition-all duration-500 ${
              scrolled
                ? "bg-transparent"
                : "bg-card/50 dark:bg-card/30 backdrop-blur-md border border-border/20 dark:border-border/10"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-secondary/50 dark:hover:bg-secondary/30"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="relative h-9 w-9 rounded-full bg-secondary/60 dark:bg-secondary/40 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300"
              aria-label="Toggle theme"
            >
              <Sun
                className={`h-[15px] w-[15px] absolute transition-all duration-300 ${
                  theme === "dark"
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <Moon
                className={`h-[15px] w-[15px] absolute transition-all duration-300 ${
                  theme === "dark"
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                }`}
              />
            </button>
          )}

          {currentUser ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-full hover:bg-secondary/60 dark:hover:bg-secondary/30 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary uppercase">
                    {currentUser.username?.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
                  {currentUser.username}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2.5 w-56 bg-card/95 dark:bg-card/90 backdrop-blur-xl rounded-2xl border border-border/40 dark:border-border/20 shadow-xl dark:shadow-none overflow-hidden"
                  >
                    <div className="px-4 py-3.5 border-b border-border/30 dark:border-border/15">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {currentUser.username}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {currentUser.email}
                      </p>
                    </div>
                    <div className="p-1.5">
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-foreground hover:bg-secondary/60 dark:hover:bg-secondary/30 rounded-xl transition-colors"
                      >
                        <User className="h-4 w-4 text-muted-foreground" />
                        My Profile
                      </Link>
                      <Link
                        href={
                          currentUser.isUserAdmin
                            ? "/admin-dashboard"
                            : "/dashboard"
                        }
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-foreground hover:bg-secondary/60 dark:hover:bg-secondary/30 rounded-xl transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                        {currentUser.isUserAdmin
                          ? "Admin Dashboard"
                          : "Dashboard"}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 rounded-xl transition-colors w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:bg-secondary/60 dark:hover:bg-secondary/30 font-medium text-sm px-4 rounded-full"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box font-heading font-semibold text-sm px-6 rounded-full"
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Right */}
        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="relative h-9 w-9 rounded-full bg-secondary/60 dark:bg-secondary/40 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
              aria-label="Toggle theme"
            >
              <Sun
                className={`h-[15px] w-[15px] absolute transition-all duration-300 ${
                  theme === "dark"
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <Moon
                className={`h-[15px] w-[15px] absolute transition-all duration-300 ${
                  theme === "dark"
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                }`}
              />
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="h-9 w-9 flex items-center justify-center text-foreground rounded-full hover:bg-secondary/60 dark:hover:bg-secondary/30 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-card/95 dark:bg-card/90 backdrop-blur-xl border-t border-border/30 dark:border-border/15 overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 dark:hover:bg-secondary/30 transition-colors text-sm font-medium px-3 py-2.5 rounded-xl"
                >
                  {link.label}
                </a>
              ))}

              <div className="border-t border-border/30 dark:border-border/15 mt-3 pt-4 flex flex-col gap-2.5">
                {currentUser ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-primary uppercase">
                          {currentUser.username?.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {currentUser.username}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border/60 dark:border-border/30 text-foreground hover:bg-secondary/60 w-full rounded-xl"
                      >
                        <User className="mr-1.5 h-4 w-4" />
                        My Profile
                      </Button>
                    </Link>
                    <Link
                      href={
                        currentUser.isUserAdmin
                          ? "/admin-dashboard"
                          : "/dashboard"
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border/60 dark:border-border/30 text-foreground hover:bg-secondary/60 w-full rounded-xl"
                      >
                        <LayoutDashboard className="mr-1.5 h-4 w-4" />
                        {currentUser.isUserAdmin
                          ? "Admin Dashboard"
                          : "Dashboard"}
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="border-destructive/30 text-destructive hover:bg-destructive/10 w-full rounded-xl"
                    >
                      <LogOut className="mr-1.5 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border/60 dark:border-border/30 text-foreground hover:bg-secondary/60 w-full rounded-xl"
                      >
                        Log In
                      </Button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-xl font-heading font-semibold"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
