"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "@/redux/user/userSlice";
import logo from "@/assets/Engazium_Logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { loading: isLoading } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message || "Sign in failed"));
        toast.error(data.message || "Sign in failed");
        return;
      }

      dispatch(signInSuccess(data));
      toast.success("Signed in successfully!");
      router.push("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4 sm:px-6 pt-24 sm:pt-28 pb-8 sm:pb-12">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-primary/8 rounded-full blur-[80px] sm:blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-accent/6 rounded-full blur-[70px] sm:blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-xl"
      >
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors mb-5 sm:mb-8 text-xs sm:text-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Back to Home
        </Link>

        {/* Card */}
        <div className="glass-strong rounded-2xl p-5 sm:p-8 gradient-border">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-5 sm:mb-8">
            <Image
              src={logo}
              alt="Engazium"
              height={44}
              className="h-9 sm:h-11 w-auto"
            />
            <span className="font-heading text-lg sm:text-xl font-bold text-foreground">Engazium</span>
          </div>

          <h1 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">Welcome back</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mb-5 sm:mb-8">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="email" className="text-foreground text-xs sm:text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 h-10 sm:h-11 rounded-xl text-sm"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground text-xs sm:text-sm">
                  Password
                </Label>
                <button
                  type="button"
                  className="text-[10px] sm:text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 h-10 sm:h-11 rounded-xl pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-box h-10 sm:h-11 rounded-xl font-heading font-semibold text-sm"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-muted-foreground text-xs sm:text-sm">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-primary hover:text-primary/80 transition-colors font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
