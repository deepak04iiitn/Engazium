"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Users,
  CreditCard,
  BarChart3,
  TrendingUp,
  Heart,
  MessageCircle,
  Eye,
  Settings,
  Camera,
  Save,
  XCircle,
  ChevronRight,
  Award,
  Zap,
  Calendar,
  Home,
  Target,
  Activity,
  Clock,
  ArrowUp,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import UserSidebar from "@/components/dashboard/UserSidebar";

const userProfile = {
  name: "Alex Creator",
  username: "@alexcreator",
  email: "alex@example.com",
  bio: "Tech content creator | 50K followers | Building in public",
  avatar: "",
  platform: "Instagram",
  niche: "Tech & SaaS",
  followers: "50K",
  joined: "Jan 2026",
};

const userSquads = [
  { id: 1, name: "Tech Creators Hub", niche: "Tech & SaaS", members: 10, role: "Member", creditsEarned: 245, creditsSpent: 180, weeklyEngagement: 87, postsEngaged: 34, status: "Active" },
  { id: 2, name: "SaaS Growth Squad", niche: "Tech & SaaS", members: 18, role: "Admin", creditsEarned: 520, creditsSpent: 390, weeklyEngagement: 92, postsEngaged: 67, status: "Active" },
  { id: 3, name: "Startup Builders", niche: "Tech & SaaS", members: 10, role: "Member", creditsEarned: 85, creditsSpent: 60, weeklyEngagement: 72, postsEngaged: 12, status: "Active" },
];

const subscriptions = [
  { id: 1, plan: "Growth Squad", squad: "Tech Creators Hub", price: "₹100/mo", nextBilling: "Mar 10, 2026", status: "Active", since: "Jan 2026" },
  { id: 2, plan: "Growth Squad", squad: "SaaS Growth Squad", price: "₹100/mo", nextBilling: "Mar 15, 2026", status: "Active", since: "Feb 2026" },
  { id: 3, plan: "Starter Squad", squad: "Startup Builders", price: "₹50/mo", nextBilling: "Mar 20, 2026", status: "Active", since: "Feb 2026" },
];

const overallAnalytics = {
  totalCreditsEarned: 850, totalCreditsSpent: 630, totalPostsEngaged: 113, avgWeeklyEngagement: 84,
  totalLikesGiven: 289, totalCommentsGiven: 156, totalSavesGiven: 78, engagementGrowth: "+18%",
  weeklyData: [
    { week: "W1", engagement: 62 }, { week: "W2", engagement: 71 }, { week: "W3", engagement: 78 },
    { week: "W4", engagement: 84 }, { week: "W5", engagement: 88 }, { week: "W6", engagement: 92 },
  ],
};

const recentActivity = [
  { id: 1, type: "engagement", action: "Engaged with 5 posts in Tech Creators Hub", time: "2 hours ago", credits: "+25" },
  { id: 2, type: "reward", action: "Received engagement from SaaS Growth Squad", time: "4 hours ago", credits: "+30" },
  { id: 3, type: "milestone", action: "Reached 85% weekly engagement goal", time: "1 day ago", credits: "+50" },
  { id: 4, type: "join", action: "Joined Startup Builders squad", time: "2 days ago", credits: "0" },
];

const sidebarItems = [
  { key: "overview", label: "Overview", icon: Home },
  { key: "profile", label: "Profile", icon: User },
  { key: "squads", label: "My Squads", icon: Users },
  { key: "subscriptions", label: "Subscriptions", icon: CreditCard },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
];

const Dashboard = () => {
  const [profile, setProfile] = useState(userProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSquadAnalytics, setSelectedSquadAnalytics] = useState(null);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <UserSidebar 
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
              {sidebarItems.find(i => i.key === activeSection) && (
                <>
                  {(() => {
                    const Icon = sidebarItems.find(i => i.key === activeSection).icon;
                    return <Icon className="h-5 w-5 text-primary" />;
                  })()}
                  <h1 className="font-heading font-bold text-xl text-foreground">
                    {sidebarItems.find(i => i.key === activeSection)?.label || "Dashboard"}
                  </h1>
                </>
              )}
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1.5 text-sm font-semibold">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                {overallAnalytics.totalCreditsEarned - overallAnalytics.totalCreditsSpent} Credits
              </Badge>
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
                          Welcome back, <span className="text-gradient">{userProfile.name.split(' ')[0]}</span>! 👋
                        </h2>
                        <p className="text-muted-foreground">Here's what's happening with your engagement today</p>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <Activity className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Credits", value: overallAnalytics.totalCreditsEarned - overallAnalytics.totalCreditsSpent, icon: Award, color: "text-primary", trend: "+12%", up: true },
                    { label: "Active Squads", value: userSquads.length, icon: Users, color: "text-primary", trend: "+1", up: true },
                    { label: "Weekly Engagement", value: `${overallAnalytics.avgWeeklyEngagement}%`, icon: TrendingUp, color: "text-primary", trend: "+5%", up: true },
                    { label: "Profile Complete", value: "75%", icon: Target, color: "text-primary", trend: "+25%", up: true },
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
                        <Badge className={`text-xs ${stat.up ? 'bg-primary/20 text-primary border-primary/30' : 'bg-secondary text-muted-foreground'}`}>
                          {stat.up && <ArrowUp className="h-3 w-3 mr-0.5" />}
                          {stat.trend}
                        </Badge>
                      </div>
                      <div className="text-2xl font-heading font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Activity */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 glass rounded-2xl p-6 gradient-border"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        Recent Activity
                      </h3>
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">View All</Button>
                    </div>
                    <div className="space-y-3">
                      {recentActivity.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                        >
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                            activity.type === 'engagement' ? 'bg-primary/20 text-primary' :
                            activity.type === 'reward' ? 'bg-primary/20 text-primary' :
                            activity.type === 'milestone' ? 'bg-primary/20 text-primary' :
                            'bg-secondary text-muted-foreground'
                          }`}>
                            {activity.type === 'engagement' && <Heart className="h-4 w-4" />}
                            {activity.type === 'reward' && <Zap className="h-4 w-4" />}
                            {activity.type === 'milestone' && <Award className="h-4 w-4" />}
                            {activity.type === 'join' && <Users className="h-4 w-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground font-medium">{activity.action}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" />
                              {activity.time}
                            </p>
                          </div>
                          {activity.credits !== "0" && (
                            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs shrink-0">
                              {activity.credits}
                            </Badge>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass rounded-2xl p-6 gradient-border"
                  >
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-5 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl glow-box justify-start" onClick={() => setActiveSection("squads")}>
                        <Users className="h-4 w-4 mr-2" />
                        View My Squads
                      </Button>
                      <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10 rounded-xl justify-start" onClick={() => setActiveSection("profile")}>
                        <User className="h-4 w-4 mr-2" />
                        Complete Profile
                      </Button>
                      <Button variant="outline" className="w-full border-border/50 hover:bg-secondary/50 rounded-xl justify-start" onClick={() => setActiveSection("analytics")}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                      <Button variant="outline" className="w-full border-border/50 hover:bg-secondary/50 rounded-xl justify-start" asChild>
                        <Link href="/squads">
                          <Users className="h-4 w-4 mr-2" />
                          Browse Squads
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Profile Section */}
            {activeSection === "profile" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="glass rounded-3xl p-8 gradient-border">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-heading font-bold text-2xl text-foreground">Complete Your Profile</h2>
                    <Button 
                      variant={isEditing ? "outline" : "default"}
                      size="sm" 
                      className={isEditing ? "border-destructive/30 text-destructive hover:bg-destructive/10" : "bg-primary text-primary-foreground hover:bg-primary/90 glow-box"}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? <><XCircle className="h-4 w-4 mr-2" />Cancel</> : <><Settings className="h-4 w-4 mr-2" />Edit Profile</>}
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-8 mb-8">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative group">
                        <Avatar className="h-32 w-32 border-4 border-primary/30 ring-4 ring-primary/10">
                          <AvatarImage src={profile.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-3xl font-heading font-bold">
                            {profile.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Camera className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                          <Camera className="h-3.5 w-3.5 mr-1.5" />
                          Change Photo
                        </Button>
                      )}
                    </div>

                    <div className="flex-1 space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { label: "Full Name", key: "name", icon: User },
                          { label: "Username", key: "username", icon: User },
                          { label: "Email", key: "email", icon: User },
                          { label: "Platform", key: "platform", icon: Activity },
                          { label: "Niche", key: "niche", icon: Target },
                          { label: "Followers", key: "followers", icon: Users },
                        ].map((field) => (
                          <div key={field.key}>
                            <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold flex items-center gap-1.5">
                              <field.icon className="h-3 w-3" />
                              {field.label}
                            </label>
                            <Input
                              value={profile[field.key]}
                              onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                              disabled={!isEditing}
                              className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70 focus:border-primary/50 transition-colors"
                            />
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold">Bio</label>
                        <Input 
                          value={profile.bio} 
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })} 
                          disabled={!isEditing} 
                          className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70 focus:border-primary/50 transition-colors" 
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end pt-6 border-t border-border/30">
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl glow-box px-8">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}

                  <div className="mt-8 pt-8 border-t border-border/30">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-heading font-semibold text-foreground flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        Profile Completion
                      </span>
                      <span className="text-primary font-heading font-bold text-lg">75%</span>
                    </div>
                    <Progress value={75} className="h-3 bg-secondary/50 rounded-full" />
                    <p className="text-muted-foreground text-xs mt-3 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      Add a profile photo and complete your bio to unlock full features!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Squads Section */}
            {activeSection === "squads" && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {userSquads.map((squad, index) => (
                  <motion.div 
                    key={squad.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: index * 0.1 }} 
                    className="glass rounded-3xl p-6 gradient-border hover:bg-card/60 transition-all group cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/10 transition-colors" />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex-1">
                          <h3 className="font-heading font-bold text-lg text-foreground mb-1 group-hover:text-gradient transition-colors">{squad.name}</h3>
                          <p className="text-muted-foreground text-sm">{squad.niche}</p>
                        </div>
                        <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-semibold">
                          {squad.role}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-secondary/30 rounded-xl p-4 text-center group-hover:bg-secondary/50 transition-colors">
                          <div className="text-foreground font-heading font-bold text-xl">{squad.creditsEarned}</div>
                          <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Earned</div>
                        </div>
                        <div className="bg-secondary/30 rounded-xl p-4 text-center group-hover:bg-secondary/50 transition-colors">
                          <div className="text-foreground font-heading font-bold text-xl">{squad.creditsSpent}</div>
                          <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Spent</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground flex items-center gap-1.5">
                            <TrendingUp className="h-3.5 w-3.5" />
                            Weekly Engagement
                          </span>
                          <span className="text-primary font-semibold">{squad.weeklyEngagement}%</span>
                        </div>
                        <Progress value={squad.weeklyEngagement} className="h-2 bg-secondary/50 rounded-full" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/20">
                        <span className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          {squad.members} members
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Activity className="h-3.5 w-3.5" />
                          {squad.postsEngaged} posts
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Add New Squad Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: userSquads.length * 0.1 }}
                  className="glass rounded-3xl p-6 gradient-border hover:bg-card/60 transition-all cursor-pointer border-dashed flex items-center justify-center min-h-[300px]"
                >
                  <Link href="/squads" className="flex flex-col items-center gap-4 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground mb-1">Join More Squads</h3>
                      <p className="text-muted-foreground text-sm">Discover and join squads in your niche</p>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl glow-box">
                      Browse Squads
                    </Button>
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Subscriptions Section */}
            {activeSection === "subscriptions" && (
              <div className="space-y-6">
                {subscriptions.map((sub, index) => (
                  <motion.div 
                    key={sub.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: index * 0.1 }} 
                    className="glass rounded-2xl p-6 gradient-border hover:bg-card/60 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <CreditCard className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-heading font-bold text-lg text-foreground">{sub.squad}</h3>
                            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                              {sub.plan}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <CreditCard className="h-3.5 w-3.5" />
                              {sub.price}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              Next billing: {sub.nextBilling}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              Since {sub.since}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-destructive/30 text-destructive hover:bg-destructive/10 rounded-xl"
                      >
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                ))}

                <div className="glass rounded-2xl p-6 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <p className="text-muted-foreground text-sm">
                      Total Monthly: <span className="text-foreground font-heading font-bold text-xl ml-2">₹250</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Section */}
            {activeSection === "analytics" && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Credits Earned", value: overallAnalytics.totalCreditsEarned, icon: Award },
                    { label: "Posts Engaged", value: overallAnalytics.totalPostsEngaged, icon: Zap },
                    { label: "Avg Weekly", value: `${overallAnalytics.avgWeeklyEngagement}%`, icon: TrendingUp },
                    { label: "Growth", value: overallAnalytics.engagementGrowth, icon: BarChart3 },
                  ].map((stat, i) => (
                    <motion.div 
                      key={stat.label} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: i * 0.08 }} 
                      className="glass rounded-2xl p-6 gradient-border text-center hover:bg-card/60 transition-all group"
                    >
                      <stat.icon className="h-6 w-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <div className="text-3xl font-heading font-bold text-foreground mb-2">{stat.value}</div>
                      <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="glass rounded-3xl p-8 gradient-border">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Engagement Breakdown
                  </h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-secondary/30 rounded-2xl p-6 text-center hover:bg-secondary/50 transition-colors">
                      <Heart className="h-6 w-6 text-destructive mx-auto mb-3" />
                      <div className="text-3xl font-heading font-bold text-foreground mb-2">{overallAnalytics.totalLikesGiven}</div>
                      <div className="text-muted-foreground text-sm">Likes Given</div>
                    </div>
                    <div className="bg-secondary/30 rounded-2xl p-6 text-center hover:bg-secondary/50 transition-colors">
                      <MessageCircle className="h-6 w-6 text-primary mx-auto mb-3" />
                      <div className="text-3xl font-heading font-bold text-foreground mb-2">{overallAnalytics.totalCommentsGiven}</div>
                      <div className="text-muted-foreground text-sm">Comments</div>
                    </div>
                    <div className="bg-secondary/30 rounded-2xl p-6 text-center hover:bg-secondary/50 transition-colors">
                      <Eye className="h-6 w-6 text-accent mx-auto mb-3" />
                      <div className="text-3xl font-heading font-bold text-foreground mb-2">{overallAnalytics.totalSavesGiven}</div>
                      <div className="text-muted-foreground text-sm">Saves</div>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-3xl p-8 gradient-border">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Weekly Engagement Trend
                  </h3>
                  <div className="flex items-end gap-4 h-56">
                    {overallAnalytics.weeklyData.map((w, index) => (
                      <motion.div 
                        key={w.week} 
                        initial={{ height: 0 }}
                        animate={{ height: `${w.engagement}%` }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                        className="flex-1 flex flex-col items-center gap-3"
                      >
                        <div className="w-full bg-gradient-to-t from-primary via-primary/80 to-primary/40 rounded-t-xl hover:from-primary hover:via-primary hover:to-primary/60 transition-all shadow-lg shadow-primary/20" style={{ height: `${w.engagement}%` }} />
                        <span className="text-muted-foreground text-sm font-semibold">{w.week}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-5 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Per Squad Analytics
                  </h3>
                  <div className="space-y-4">
                    {userSquads.map((squad) => (
                      <div 
                        key={squad.id} 
                        className="glass rounded-2xl p-6 gradient-border cursor-pointer hover:bg-card/60 transition-all" 
                        onClick={() => setSelectedSquadAnalytics(selectedSquadAnalytics === squad.id ? null : squad.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                              <Users className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-heading font-bold text-foreground">{squad.name}</h4>
                              <p className="text-muted-foreground text-sm">{squad.niche} · {squad.role}</p>
                            </div>
                          </div>
                          <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${selectedSquadAnalytics === squad.id ? "rotate-180" : ""}`} />
                        </div>
                        <AnimatePresence>
                          {selectedSquadAnalytics === squad.id && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }} 
                              animate={{ opacity: 1, height: "auto" }} 
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-6 pt-6 border-t border-border/30"
                            >
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="bg-secondary/30 rounded-xl p-4 text-center">
                                  <div className="text-foreground font-heading font-bold text-xl">{squad.creditsEarned}</div>
                                  <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Earned</div>
                                </div>
                                <div className="bg-secondary/30 rounded-xl p-4 text-center">
                                  <div className="text-foreground font-heading font-bold text-xl">{squad.creditsSpent}</div>
                                  <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Spent</div>
                                </div>
                                <div className="bg-secondary/30 rounded-xl p-4 text-center">
                                  <div className="text-foreground font-heading font-bold text-xl">{squad.weeklyEngagement}%</div>
                                  <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Engagement</div>
                                </div>
                                <div className="bg-secondary/30 rounded-xl p-4 text-center">
                                  <div className="text-foreground font-heading font-bold text-xl">{squad.postsEngaged}</div>
                                  <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Posts</div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
        </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
