"use client"

import { useState, useEffect } from "react";
import {
  Home,
  User,
  Users,
  BarChart3,
  LogOut,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Plus,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "@/redux/user/userSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/Engazium_Logo.png";

const UserSidebar = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        dispatch(logoutSuccess());
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsOpen]);

  const navItems = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "profile", label: "Profile", icon: User },
    { key: "squads", label: "My Squads", icon: Users },
    { key: "create-squad", label: "Create Squad", icon: Plus },
    { key: "testimonial", label: "Testimonial", icon: MessageSquare },
    { key: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  const bottomItems = [
    { key: "home", label: "Home Website", icon: Home, href: "/" },
    { key: "browse", label: "Browse Squads", icon: Users, href: "/squads" },
    { key: "settings", label: "Settings", icon: Settings },
    { key: "help", label: "Help Center", icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        className={cn(
          "fixed md:relative z-50 h-screen flex flex-col border-r border-border/20 bg-sidebar-background/95 backdrop-blur-xl transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-20 -translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="h-20 flex items-center px-4 border-b border-border/20">
          <Link href="/" className="flex items-center gap-3 overflow-hidden ml-1">
            <div className="relative h-10 w-10 shrink-0">
              <Image 
                src={logo} 
                alt="Engazium" 
                fill
                className="object-contain"
              />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col whitespace-nowrap"
                >
                  <span className="font-heading text-lg font-bold text-gradient">
                    Engazium
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    Dashboard
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Toggle Button (Desktop Only) */}
        {!isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -right-3 top-24 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
          >
            {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6 scrollbar-none">
          {/* Main Group */}
          <div>
            <div className={cn(
              "px-3 mb-2 text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest transition-opacity duration-300",
              !isOpen && "opacity-0 text-center"
            )}>
              Menu
            </div>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => setActiveSection(item.key)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                      activeSection === item.key
                        ? "bg-primary/10 text-primary shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {activeSection === item.key && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                    )}
                    <item.icon
                      className={cn(
                        "h-5 w-5 shrink-0 transition-transform duration-300",
                        activeSection === item.key ? "scale-110" : "group-hover:scale-110"
                      )}
                    />
                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="font-medium whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    
                    {/* Tooltip for collapsed state */}
                    {!isOpen && (
                      <div className="absolute left-16 bg-popover text-popover-foreground px-2 py-1 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-md border border-border/50">
                        {item.label}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Settings Group */}
          <div>
             <div className={cn(
              "px-3 mb-2 text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest transition-opacity duration-300",
              !isOpen && "opacity-0 text-center"
            )}>
              Support
            </div>
            <ul className="space-y-1">
              {bottomItems.map((item) => (
                <li key={item.key}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="w-full flex items-center gap-3 p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 group relative"
                    >
                      <item.icon className="h-5 w-5 shrink-0 group-hover:scale-110 transition-transform" />
                      <AnimatePresence>
                        {isOpen && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="font-medium whitespace-nowrap overflow-hidden"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      
                      {!isOpen && (
                        <div className="absolute left-16 bg-popover text-popover-foreground px-2 py-1 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-md border border-border/50">
                          {item.label}
                        </div>
                      )}
                    </Link>
                  ) : (
                    <button
                      onClick={() => setActiveSection(item.key)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 group relative"
                    >
                      <item.icon className="h-5 w-5 shrink-0 group-hover:scale-110 transition-transform" />
                      <AnimatePresence>
                        {isOpen && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="font-medium whitespace-nowrap overflow-hidden"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      
                      {!isOpen && (
                        <div className="absolute left-16 bg-popover text-popover-foreground px-2 py-1 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-md border border-border/50">
                          {item.label}
                        </div>
                      )}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/20 mt-auto">
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-xl transition-all duration-300",
            isOpen ? "bg-secondary/50 hover:bg-secondary" : "justify-center"
          )}>
            <div className="relative shrink-0">
              <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                  {currentUser?.username?.slice(0, 2).toUpperCase() || "??"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-background" />
            </div>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex-1 min-w-0 overflow-hidden"
                >
                  <p className="text-sm font-semibold truncate text-foreground">{currentUser?.username || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">{currentUser?.email || ""}</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {isOpen && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                onClick={handleLogout}
              >
                <LogOut size={16} />
              </Button>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default UserSidebar;
