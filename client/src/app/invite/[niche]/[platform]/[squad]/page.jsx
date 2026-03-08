"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Users,
  Crown,
  Globe,
  Loader2,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import logo from "@/assets/Engazium_Logo.png";

const PLAN_COLORS = {
  Growth: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  Pro: "bg-primary/15 text-primary border-primary/25",
  Momentum: "bg-amber-400/15 text-amber-400 border-amber-400/25",
};

const InvitePage = () => {
  const { niche, platform, squad: squadSlug } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);

  const [squad, setSquad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [squadError, setSquadError] = useState(null);

  const invitePath = `/invite/${niche}/${platform}/${squadSlug}`;

  // Fetch squad info (public — no auth needed)
  useEffect(() => {
    const fetchSquad = async () => {
      try {
        const res = await fetch(`/api/squads/invite/${niche}/${squadSlug}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Squad not found");
        setSquad(data.squad);
      } catch (err) {
        setSquadError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSquad();
  }, [niche, squadSlug]);

  // Auto-join once squad is loaded and user is authenticated
  useEffect(() => {
    if (!currentUser || !squad || joined || joining) return;

    const autoJoin = async () => {
      setJoining(true);
      try {
        const res = await fetch(`/api/squads/${squad._id}/join`, {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          // Already a member — just redirect
          if (data.message?.toLowerCase().includes("already a member")) {
            toast.info(`You're already in ${squad.name}!`);
            router.replace(`/squads/${squad.nicheSlug}/${squad.slug}`);
            return;
          }
          throw new Error(data.message || "Failed to join squad");
        }

        setJoined(true);
        toast.success(`Welcome to ${squad.name}!`);
        setTimeout(() => {
          router.replace(`/squads/${squad.nicheSlug}/${squad.slug}`);
        }, 1400);
      } catch (err) {
        toast.error(err.message);
        setJoining(false);
      }
    };

    autoJoin();
  }, [currentUser, squad, joined, joining, router]);

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-7 w-7 text-primary animate-spin" />
      </div>
    );
  }

  // ── Squad not found ──
  if (squadError || !squad) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-destructive/70" />
          </div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">
            Invite link not found
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            This squad may have been deleted, or the link is no longer valid.
          </p>
          <Link href="/squads">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
              Browse Squads
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // ── Authenticated: show joining / joined state ──
  if (currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-[140px] bg-primary/5 dark:bg-primary/10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 flex flex-col items-center gap-6 text-center max-w-sm"
        >
          <div
            className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 ${
              joined
                ? "bg-primary/20 border-2 border-primary/40"
                : "bg-primary/10"
            }`}
          >
            {joined ? (
              <CheckCircle2 className="h-10 w-10 text-primary" />
            ) : (
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            )}
          </div>

          <div>
            <h2 className="font-heading font-bold text-2xl text-foreground mb-1">
              {joined ? `You're in!` : "Joining squad…"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {joined
                ? `Redirecting you to ${squad.name}…`
                : `Adding you to ${squad.name}`}
            </p>
          </div>

          <div className="glass rounded-2xl px-5 py-4 w-full flex items-center gap-3 text-left border border-border/40">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-heading font-semibold text-foreground text-sm truncate">
                {squad.name}
              </p>
              <p className="text-muted-foreground text-xs">
                {squad.niche} · {squad.memberCount}/{squad.maxMembers} members
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Unauthenticated: invite landing page ──
  const isFull = squad.status === "Full" || squad.memberCount >= squad.maxMembers;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-24 pb-12">
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[140px] bg-primary/5 dark:bg-primary/10" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[120px] bg-glow-secondary/3 dark:bg-glow-secondary/8" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Image src={logo} alt="Engazium" height={36} className="h-8 w-auto" />
          <span className="font-heading text-lg font-bold text-foreground">
            Engazium
          </span>
        </div>

        {/* Invite card */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-lg dark:shadow-none dark:border-border/30 overflow-hidden">
          {/* Header band */}
          <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

          <div className="p-6 sm:p-8">
            {/* Invited badge */}
            <div className="flex items-center justify-center mb-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                <UserPlus className="h-3 w-3" />
                You&apos;ve been invited
              </span>
            </div>

            {/* Squad card */}
            <div className="glass rounded-2xl p-5 border border-border/40 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-heading font-bold text-foreground text-lg leading-tight">
                      {squad.name}
                    </h2>
                    <Badge
                      className={`text-[10px] px-2 py-0.5 rounded-md font-heading font-semibold border ${
                        PLAN_COLORS[squad.plan] || PLAN_COLORS.Growth
                      }`}
                    >
                      <Crown className="h-2.5 w-2.5 mr-1" />
                      {squad.plan}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-[13px] mt-0.5">
                    {squad.niche}
                    {squad.platform && ` · ${squad.platform}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-3 border-t border-border/30">
                <div className="flex items-center gap-1.5 text-muted-foreground text-[13px]">
                  <Users className="h-3.5 w-3.5" />
                  <span>
                    <span className="font-semibold text-foreground">
                      {squad.memberCount}
                    </span>
                    /{squad.maxMembers} members
                  </span>
                </div>
                {isFull ? (
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[10px] px-2 py-0.5">
                    Full
                  </Badge>
                ) : (
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] px-2 py-0.5">
                    {squad.maxMembers - squad.memberCount} spots left
                  </Badge>
                )}
              </div>

              {squad.description && (
                <p className="text-muted-foreground text-[13px] leading-relaxed mt-3 pt-3 border-t border-border/30">
                  {squad.description}
                </p>
              )}
            </div>

            {isFull ? (
              <div className="text-center py-2">
                <p className="text-muted-foreground text-sm mb-4">
                  This squad is currently full. Check back later or explore
                  other squads.
                </p>
                <Link href="/squads">
                  <Button
                    variant="outline"
                    className="rounded-xl w-full border-border/50"
                  >
                    Browse Other Squads
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <p className="text-center text-muted-foreground text-sm mb-5">
                  Create a free account to join this squad and start growing
                  together.
                </p>

                <div className="space-y-3">
                  <Link
                    href={`/sign-up?redirect=${encodeURIComponent(invitePath)}`}
                    className="block"
                  >
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-box h-11 rounded-xl font-heading font-semibold text-sm">
                      Create Account &amp; Join
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>

                  <Link
                    href={`/sign-in?redirect=${encodeURIComponent(invitePath)}`}
                    className="block"
                  >
                    <Button
                      variant="outline"
                      className="w-full h-11 rounded-xl font-heading font-medium text-sm border-border/50"
                    >
                      I already have an account
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-muted-foreground/60 text-xs mt-6">
          Engazium · Grow together with your community
        </p>
      </motion.div>
    </div>
  );
};

export default InvitePage;
