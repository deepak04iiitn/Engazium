"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  CreditCard,
  Shield,
  Search,
  Eye,
  Home,
  Settings,
  TrendingUp,
  Activity,
  Award,
  Clock,
  ArrowUp,
  Sparkles,
  BarChart3,
  Target,
  UserCheck,
  UserX,
  ChevronRight,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";

const allUsers = [
  { id: 1, name: "Alex Creator", email: "alex@example.com", niche: "Tech & SaaS", squads: 3, credits: 850, joined: "Jan 2026", status: "Active" },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", niche: "Fitness", squads: 2, credits: 420, joined: "Jan 2026", status: "Active" },
  { id: 3, name: "Raj Patel", email: "raj@example.com", niche: "Finance", squads: 1, credits: 210, joined: "Feb 2026", status: "Active" },
  { id: 4, name: "Maya Singh", email: "maya@example.com", niche: "Fashion", squads: 2, credits: 680, joined: "Jan 2026", status: "Active" },
  { id: 5, name: "Arjun Dev", email: "arjun@example.com", niche: "Gaming", squads: 1, credits: 150, joined: "Feb 2026", status: "Inactive" },
  { id: 6, name: "Neha Gupta", email: "neha@example.com", niche: "Food & Cooking", squads: 2, credits: 390, joined: "Jan 2026", status: "Active" },
  { id: 7, name: "Karan Mehta", email: "karan@example.com", niche: "Travel", squads: 1, credits: 275, joined: "Feb 2026", status: "Active" },
  { id: 8, name: "Simran Kaur", email: "simran@example.com", niche: "Art & Design", squads: 2, credits: 510, joined: "Jan 2026", status: "Active" },
];

const earnings = {
  lifetime: "₹1,24,500", thisMonth: "₹18,750", lastMonth: "₹15,200", growth: "+23.4%",
  monthlyBreakdown: [
    { month: "Sep", amount: 8200 }, { month: "Oct", amount: 9800 }, { month: "Nov", amount: 12400 },
    { month: "Dec", amount: 14100 }, { month: "Jan", amount: 15200 }, { month: "Feb", amount: 18750 },
  ],
};

const adminSubscriptions = [
  { id: 1, user: "Alex Creator", squad: "Tech Creators Hub", plan: "Growth", price: "₹100", status: "Active", since: "Jan 2026" },
  { id: 2, user: "Priya Sharma", squad: "Fitness Growth Circle", plan: "Growth", price: "₹100", status: "Active", since: "Jan 2026" },
  { id: 3, user: "Raj Patel", squad: "Finance Gurus", plan: "Starter", price: "₹50", status: "Active", since: "Feb 2026" },
  { id: 4, user: "Maya Singh", squad: "Fashion Forward", plan: "Growth", price: "₹100", status: "Active", since: "Jan 2026" },
  { id: 5, user: "Alex Creator", squad: "SaaS Growth Squad", plan: "Growth", price: "₹100", status: "Active", since: "Feb 2026" },
  { id: 6, user: "Neha Gupta", squad: "Foodie Network", plan: "Starter", price: "₹50", status: "Active", since: "Jan 2026" },
  { id: 7, user: "Arjun Dev", squad: "Gaming Legends", plan: "Starter", price: "₹50", status: "Cancelled", since: "Jan 2026" },
  { id: 8, user: "Simran Kaur", squad: "Art & Design Collective", plan: "Growth", price: "₹100", status: "Active", since: "Jan 2026" },
];

const adminSquads = [
  { id: 1, name: "Tech Creators Hub", niche: "Tech & SaaS", members: 10, max: 10, revenue: "₹1,000/mo", status: "Active", type: "Starter" },
  { id: 2, name: "Fitness Growth Circle", niche: "Fitness", members: 17, max: 20, revenue: "₹1,700/mo", status: "Active", type: "Growth" },
  { id: 3, name: "Foodie Network", niche: "Food & Cooking", members: 9, max: 10, revenue: "₹450/mo", status: "Recruiting", type: "Starter" },
  { id: 4, name: "Fashion Forward", niche: "Fashion", members: 20, max: 20, revenue: "₹2,000/mo", status: "Active", type: "Growth" },
  { id: 5, name: "SaaS Growth Squad", niche: "Tech & SaaS", members: 18, max: 20, revenue: "₹1,800/mo", status: "Active", type: "Growth" },
  { id: 6, name: "Finance Gurus", niche: "Finance", members: 15, max: 20, revenue: "₹750/mo", status: "Recruiting", type: "Growth" },
];

const sidebarItems = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "users", label: "All Users", icon: Users },
  { key: "earnings", label: "Earnings", icon: DollarSign },
  { key: "subscriptions", label: "Subscriptions", icon: CreditCard },
  { key: "squads", label: "All Squads", icon: Shield },
];

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [userSearch, setUserSearch] = useState("");
  const [subSearch, setSubSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const filteredUsers = allUsers.filter(
    (u) => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
  );
  const filteredSubs = adminSubscriptions.filter(
    (s) => s.user.toLowerCase().includes(subSearch.toLowerCase()) || s.squad.toLowerCase().includes(subSearch.toLowerCase())
  );

  const activeUsers = allUsers.filter(u => u.status === "Active").length;
  const activeSubs = adminSubscriptions.filter(s => s.status === "Active").length;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <AdminSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative transition-all duration-300">
        <div className="flex-1 overflow-y-auto">
          <header className="sticky top-0 z-30 glass-strong border-b border-border/20 h-16 flex items-center px-4 md:px-6 gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-muted-foreground mr-2" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </Button>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <h1 className="font-heading font-bold text-xl text-foreground">
                {sidebarItems.find(i => i.key === activeSection)?.label || "Admin"}
              </h1>
            </div>
          </header>

          <div className="p-6">
            {/* Overview Section */}
            {activeSection === "overview" && (
              <div className="space-y-6">
                {/* Welcome Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative overflow-hidden rounded-3xl glass p-8 gradient-border"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                          Admin <span className="text-gradient">Dashboard</span> 🛡️
                        </h2>
                        <p className="text-muted-foreground">Platform overview and management</p>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <Shield className="h-3 w-3 mr-1" />
                        Administrator
                      </Badge>
                    </div>
                  </div>
                </motion.div>

                {/* Platform Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Users", value: allUsers.length.toString(), icon: Users, color: "text-primary", trend: `${activeUsers} active`, up: true },
                    { label: "Lifetime Earnings", value: earnings.lifetime, icon: DollarSign, color: "text-primary", trend: earnings.growth, up: true },
                    { label: "Active Subscriptions", value: activeSubs.toString(), icon: CreditCard, color: "text-primary", trend: `${adminSubscriptions.length} total`, up: true },
                    { label: "Total Squads", value: adminSquads.length.toString(), icon: Shield, color: "text-primary", trend: `${adminSquads.filter(s => s.status === "Active").length} active`, up: true },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass rounded-2xl p-5 gradient-border hover:bg-card/60 transition-all group cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                          <stat.icon className="h-5 w-5" />
                        </div>
                        <Badge className="text-xs bg-primary/20 text-primary border-primary/30">
                          {stat.up && <ArrowUp className="h-3 w-3 mr-0.5" />}
                          {stat.trend}
                        </Badge>
                      </div>
                      <div className="text-2xl font-heading font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Revenue Chart & Quick Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Revenue Chart */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 glass rounded-3xl p-8 gradient-border"
                  >
                    <h3 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Monthly Revenue
                    </h3>
                    <div className="flex items-end gap-4 h-64">
                      {earnings.monthlyBreakdown.map((m, index) => {
                        const maxAmount = Math.max(...earnings.monthlyBreakdown.map(x => x.amount));
                        const heightPercent = (m.amount / maxAmount) * 100;
                        return (
                          <motion.div 
                            key={m.month} 
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPercent}%` }}
                            transition={{ delay: 0.8 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                            className="flex-1 flex flex-col items-center gap-3"
                          >
                            <span className="text-foreground text-sm font-heading font-semibold">₹{(m.amount / 1000).toFixed(1)}K</span>
                            <div className="w-full bg-gradient-to-t from-primary via-primary/80 to-primary/40 rounded-t-xl hover:from-primary hover:via-primary hover:to-primary/60 transition-all shadow-lg shadow-primary/20" style={{ height: `${heightPercent}%` }} />
                            <span className="text-muted-foreground text-sm font-semibold">{m.month}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Revenue Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass rounded-3xl p-6 gradient-border"
                  >
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-5 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      Revenue Stats
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: "Lifetime", value: earnings.lifetime, icon: Award },
                        { label: "This Month", value: earnings.thisMonth, icon: Calendar },
                        { label: "Last Month", value: earnings.lastMonth, icon: Clock },
                        { label: "Growth", value: earnings.growth, icon: TrendingUp },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-secondary/30 rounded-xl p-4 hover:bg-secondary/50 transition-colors">
                          <div className="flex items-center gap-2 mb-1">
                            <stat.icon className="h-4 w-4 text-primary" />
                            <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
                          </div>
                          <div className="text-xl font-heading font-bold text-foreground">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Users Section */}
            {activeSection === "users" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-1">User Management</h2>
                    <p className="text-muted-foreground text-sm">{allUsers.length} total users · {activeUsers} active</p>
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users by name or email..." 
                    value={userSearch} 
                    onChange={(e) => setUserSearch(e.target.value)} 
                    className="pl-11 bg-card/50 border-border/50 rounded-xl h-12"
                  />
                </div>

                <div className="space-y-3">
                  {filteredUsers.map((user, index) => (
                    <motion.div 
                      key={user.id} 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: index * 0.05 }} 
                      className="glass rounded-2xl p-5 gradient-border hover:bg-card/60 transition-all group"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-primary/30 ring-2 ring-primary/10 shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-heading text-sm font-bold">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-heading font-semibold text-foreground truncate">{user.name}</h3>
                            <Badge className={`text-xs ${user.status === "Active" ? "bg-primary/20 text-primary border-primary/30" : "bg-secondary text-muted-foreground"}`}>
                              {user.status === "Active" ? <UserCheck className="h-3 w-3 mr-1" /> : <UserX className="h-3 w-3 mr-1" />}
                              {user.status}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <span>{user.email}</span>
                            <span>·</span>
                            <span>{user.niche}</span>
                            <span>·</span>
                            <span>Joined {user.joined}</span>
                          </div>
                        </div>
                        <div className="flex gap-6 text-center">
                          <div>
                            <div className="text-foreground font-heading font-bold text-lg">{user.squads}</div>
                            <div className="text-muted-foreground text-xs">Squads</div>
                          </div>
                          <div>
                            <div className="text-foreground font-heading font-bold text-lg">{user.credits}</div>
                            <div className="text-muted-foreground text-xs">Credits</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 shrink-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Earnings Section */}
            {activeSection === "earnings" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Earnings Dashboard</h2>
                  <p className="text-muted-foreground text-sm">Revenue analytics and insights</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Lifetime", value: earnings.lifetime, icon: Award },
                    { label: "This Month", value: earnings.thisMonth, icon: Target },
                    { label: "Last Month", value: earnings.lastMonth, icon: Clock },
                    { label: "Growth", value: earnings.growth, icon: TrendingUp },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass rounded-2xl p-6 gradient-border text-center hover:bg-card/60 transition-all group"
                    >
                      <stat.icon className="h-6 w-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <div className="text-2xl font-heading font-bold text-foreground mb-2">{stat.value}</div>
                      <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="glass rounded-3xl p-8 gradient-border">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Monthly Revenue Breakdown
                  </h3>
                  <div className="flex items-end gap-4 h-72">
                    {earnings.monthlyBreakdown.map((m, index) => {
                      const maxAmount = Math.max(...earnings.monthlyBreakdown.map(x => x.amount));
                      const heightPercent = (m.amount / maxAmount) * 100;
                      return (
                        <motion.div 
                          key={m.month}
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPercent}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                          className="flex-1 flex flex-col items-center gap-3"
                        >
                          <span className="text-foreground text-sm font-heading font-semibold">₹{(m.amount / 1000).toFixed(1)}K</span>
                          <div className="w-full bg-gradient-to-t from-primary via-primary/80 to-primary/40 rounded-t-xl hover:from-primary hover:via-primary hover:to-primary/60 transition-all cursor-pointer shadow-lg shadow-primary/20" style={{ height: `${heightPercent}%` }} />
                          <span className="text-muted-foreground text-sm font-semibold">{m.month}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Subscriptions Section */}
            {activeSection === "subscriptions" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Subscription Management</h2>
                    <p className="text-muted-foreground text-sm">{adminSubscriptions.length} total · {activeSubs} active</p>
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search subscriptions..." 
                    value={subSearch} 
                    onChange={(e) => setSubSearch(e.target.value)} 
                    className="pl-11 bg-card/50 border-border/50 rounded-xl h-12"
                  />
                </div>

                <div className="space-y-3">
                  {filteredSubs.map((sub, index) => (
                    <motion.div 
                      key={sub.id} 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: index * 0.05 }} 
                      className="glass rounded-2xl p-5 gradient-border hover:bg-card/60 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <CreditCard className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-heading font-semibold text-foreground">{sub.user}</h3>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{sub.squad}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge className={`text-xs ${sub.status === "Active" ? "bg-primary/20 text-primary border-primary/30" : "bg-destructive/20 text-destructive border-destructive/30"}`}>
                                {sub.status}
                              </Badge>
                              <Badge className="text-xs bg-secondary text-muted-foreground">{sub.plan}</Badge>
                              <span className="text-xs text-muted-foreground">Since {sub.since}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-heading font-bold text-foreground">{sub.price}</div>
                          <div className="text-xs text-muted-foreground">per month</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Squads Section */}
            {activeSection === "squads" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Squad Management</h2>
                  <p className="text-muted-foreground text-sm">{adminSquads.length} squads · {adminSquads.filter(s => s.status === "Active").length} active</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {adminSquads.map((squad, index) => (
                    <motion.div 
                      key={squad.id} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: index * 0.08 }} 
                      className="glass rounded-3xl p-6 gradient-border hover:bg-card/60 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/10 transition-colors" />
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex-1">
                            <h3 className="font-heading font-bold text-lg text-foreground mb-1">{squad.name}</h3>
                            <p className="text-muted-foreground text-sm">{squad.niche}</p>
                          </div>
                          <Badge className={`text-xs font-semibold ${squad.status === "Recruiting" ? "bg-primary/20 text-primary border-primary/30" : "bg-secondary text-muted-foreground"}`}>
                            {squad.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-5">
                          <div className="text-center bg-secondary/30 rounded-xl p-3 group-hover:bg-secondary/50 transition-colors">
                            <div className="text-foreground font-heading font-bold text-lg">{squad.members}/{squad.max}</div>
                            <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Members</div>
                          </div>
                          <div className="text-center bg-secondary/30 rounded-xl p-3 group-hover:bg-secondary/50 transition-colors">
                            <div className="text-foreground font-heading font-bold text-sm">{squad.revenue}</div>
                            <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Revenue</div>
                          </div>
                          <div className="text-center bg-secondary/30 rounded-xl p-3 group-hover:bg-secondary/50 transition-colors">
                            <div className="text-foreground font-heading font-bold text-sm">{squad.type}</div>
                            <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Type</div>
                          </div>
                        </div>

                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(squad.members / squad.max) * 100}%` }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full" 
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
          </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
