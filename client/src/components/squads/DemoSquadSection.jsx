import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  Coins,
  TrendingUp,
  Eye,
  Clock,
  BarChart3,
  CheckCircle2,
  Crown,
  Instagram,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const demoMembers = [
  { name: "Aisha K.", handle: "@aisha.creates", initials: "AK", credits: 42, role: "admin" },
  { name: "Rohan M.", handle: "@rohan.tech", initials: "RM", credits: 38, role: "member" },
  { name: "Priya S.", handle: "@priya.fit", initials: "PS", credits: 35, role: "member" },
  { name: "Dev P.", handle: "@dev.codes", initials: "DP", credits: 31, role: "member" },
  { name: "Neha T.", handle: "@neha.design", initials: "NT", credits: 28, role: "member" },
  { name: "Arjun R.", handle: "@arjun.vlogs", initials: "AR", credits: 25, role: "member" },
  { name: "Kavya L.", handle: "@kavya.writes", initials: "KL", credits: 22, role: "member" },
  { name: "Sami J.", handle: "@sami.shots", initials: "SJ", credits: 19, role: "member" },
  { name: "Meera D.", handle: "@meera.cooks", initials: "MD", credits: 16, role: "member" },
  { name: "Vikram B.", handle: "@vikram.travel", initials: "VB", credits: 14, role: "member" },
];

const demoFeed = [
  {
    author: "Aisha K.",
    initials: "AK",
    handle: "@aisha.creates",
    time: "2 min ago",
    content: "Just posted a new reel on productivity tools for creators 🚀 Would love your thoughts!",
    engagements: { likes: 8, comments: 6, saves: 3 },
    status: "active",
  },
  {
    author: "Rohan M.",
    initials: "RM",
    handle: "@rohan.tech",
    time: "15 min ago",
    content: "Carousel on '5 AI tools every creator needs' is live. Engage when you can — no rush 🙌",
    engagements: { likes: 10, comments: 7, saves: 5 },
    status: "completed",
  },
  {
    author: "Priya S.",
    initials: "PS",
    handle: "@priya.fit",
    time: "1 hr ago",
    content: "New workout transformation post up! Engaging with everyone's content today 💪",
    engagements: { likes: 9, comments: 8, saves: 4 },
    status: "completed",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const DemoSquadSection = () => {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-glow-secondary/5 rounded-full blur-[120px]" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div {...fadeUp} className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary px-4 py-1.5">
            <Eye className="h-3.5 w-3.5 mr-1.5" />
            Live Demo
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
            Inside a{" "}
            <span className="text-gradient">Squad Dashboard</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Here's what it looks like when you're part of a squad. Real engagement, real creators, real growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Squad Header Card */}
          <div className="glass rounded-2xl gradient-border overflow-hidden">
            {/* Top Bar */}
            <div className="px-6 py-4 border-b border-border/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Instagram className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-foreground text-lg">Tech Creators Hub</h3>
                    <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">
                      <Crown className="h-2.5 w-2.5 mr-1" />
                      Starter
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-xs">Tech & SaaS · 10 Members · Instagram</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-foreground font-heading font-bold text-lg">42</div>
                  <div className="text-muted-foreground text-[10px] uppercase tracking-wider">Your Credits</div>
                </div>
                <div className="text-center">
                  <div className="text-primary font-heading font-bold text-lg flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    4.2%
                  </div>
                  <div className="text-muted-foreground text-[10px] uppercase tracking-wider">Avg Eng</div>
                </div>
                <div className="text-center">
                  <div className="text-foreground font-heading font-bold text-lg">Week 6</div>
                  <div className="text-muted-foreground text-[10px] uppercase tracking-wider">Active</div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-6 pt-3 border-b border-border/30 flex gap-1">
              {["feed", "members", "stats"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-sm font-heading font-medium rounded-t-lg transition-all duration-200 capitalize ${
                    activeTab === tab
                      ? "bg-primary/10 text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "feed" && <MessageCircle className="h-3.5 w-3.5 inline mr-1.5" />}
                  {tab === "members" && <Users className="h-3.5 w-3.5 inline mr-1.5" />}
                  {tab === "stats" && <BarChart3 className="h-3.5 w-3.5 inline mr-1.5" />}
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 min-h-[400px]">
              {/* Feed Tab */}
              {activeTab === "feed" && (
                <div className="space-y-4">
                  {demoFeed.map((post, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-secondary/30 rounded-xl p-5 border border-border/20 hover:border-border/40 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-heading font-bold">
                            {post.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-heading font-semibold text-foreground text-sm">
                                {post.author}
                              </span>
                              <span className="text-muted-foreground text-xs">{post.handle}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground text-xs flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.time}
                              </span>
                              {post.status === "completed" && (
                                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                              )}
                            </div>
                          </div>
                          <p className="text-secondary-foreground text-sm leading-relaxed mb-3">
                            {post.content}
                          </p>
                          <div className="flex items-center gap-5">
                            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-red-400 transition-colors text-xs">
                              <Heart className="h-3.5 w-3.5" />
                              <span>{post.engagements.likes}</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-xs">
                              <MessageCircle className="h-3.5 w-3.5" />
                              <span>{post.engagements.comments}</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-amber-400 transition-colors text-xs">
                              <Bookmark className="h-3.5 w-3.5" />
                              <span>{post.engagements.saves}</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-xs ml-auto">
                              <Send className="h-3.5 w-3.5" />
                              <span>Engage</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Credit Earned Toast */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl px-4 py-3"
                  >
                    <Coins className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-heading font-semibold text-foreground">+3 Credits Earned Today</p>
                      <p className="text-xs text-muted-foreground">You engaged with 3 squad posts. Keep it up!</p>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Members Tab */}
              {activeTab === "members" && (
                <div className="space-y-3">
                  {demoMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between bg-secondary/30 rounded-xl px-4 py-3 border border-border/20 hover:border-border/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-heading font-bold">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-semibold text-foreground text-sm">
                              {member.name}
                            </span>
                            {member.role === "admin" && (
                              <Badge className="bg-primary/20 text-primary border-primary/30 text-[9px] px-1.5 py-0">
                                Admin
                              </Badge>
                            )}
                          </div>
                          <span className="text-muted-foreground text-xs">{member.handle}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Coins className="h-3.5 w-3.5 text-primary" />
                        <span className="font-heading font-bold text-foreground text-sm">{member.credits}</span>
                        <span className="text-muted-foreground text-[10px]">credits</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Stats Tab */}
              {activeTab === "stats" && (
                <div className="space-y-6">
                  {/* Weekly Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Total Engagements", value: "284", change: "+12%", icon: Heart },
                      { label: "Avg Reach Boost", value: "3.2x", change: "+0.4x", icon: TrendingUp },
                      { label: "Comments Given", value: "67", change: "+8", icon: MessageCircle },
                      { label: "Credits Circulated", value: "312", change: "+45", icon: Coins },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-secondary/30 rounded-xl p-4 border border-border/20 text-center"
                      >
                        <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                        <div className="font-heading font-bold text-foreground text-xl">{stat.value}</div>
                        <div className="text-muted-foreground text-[10px] uppercase tracking-wider mb-1">
                          {stat.label}
                        </div>
                        <span className="text-primary text-xs font-medium">{stat.change}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Weekly Progress */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-secondary/30 rounded-xl p-5 border border-border/20"
                  >
                    <h4 className="font-heading font-semibold text-foreground text-sm mb-4">Weekly Engagement Goal</h4>
                    <div className="space-y-4">
                      {[
                        { day: "Monday", progress: 100 },
                        { day: "Tuesday", progress: 100 },
                        { day: "Wednesday", progress: 100 },
                        { day: "Thursday", progress: 75 },
                        { day: "Friday", progress: 40 },
                        { day: "Saturday", progress: 0 },
                        { day: "Sunday", progress: 0 },
                      ].map((day) => (
                        <div key={day.day} className="flex items-center gap-3">
                          <span className="text-muted-foreground text-xs font-medium w-20 flex-shrink-0">
                            {day.day}
                          </span>
                          <Progress value={day.progress} className="h-2 flex-1 bg-secondary" />
                          <span
                            className={`text-xs font-heading font-bold w-10 text-right ${
                              day.progress === 100 ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            {day.progress}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Member Leaderboard */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-secondary/30 rounded-xl p-5 border border-border/20"
                  >
                    <h4 className="font-heading font-semibold text-foreground text-sm mb-4">
                      Top Contributors This Week
                    </h4>
                    <div className="space-y-3">
                      {demoMembers.slice(0, 5).map((member, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-heading font-bold ${
                              index === 0
                                ? "bg-primary/20 text-primary"
                                : index === 1
                                ? "bg-muted text-muted-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {index + 1}
                          </span>
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-heading font-bold">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-heading font-medium text-foreground text-sm flex-1">
                            {member.name}
                          </span>
                          <span className="text-primary text-xs font-heading font-bold">
                            {member.credits} credits
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          {/* Annotation */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center text-muted-foreground/60 text-xs mt-4 italic"
          >
            ✦ This is a demo preview — actual squads feature real-time engagement from verified creators.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSquadSection;
