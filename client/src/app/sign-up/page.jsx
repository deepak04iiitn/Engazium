"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { signUpStart, signUpSuccess, signUpFailure, signInSuccess } from "@/redux/user/userSlice";
import logo from "@/assets/Engazium_Logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { loading: isLoading } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      dispatch(signUpStart());

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signUpFailure(data.message || "Sign up failed"));
        toast.error(data.message || "Sign up failed");
        return;
      }

      dispatch(signUpSuccess());

      // Auto sign-in after successful sign-up
      const signInRes = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const signInData = await signInRes.json();

      if (signInRes.ok) {
        dispatch(signInSuccess(signInData));
        toast.success("Account created successfully! Welcome aboard!");
        router.push("/");
      } else {
        toast.success("Account created! Please sign in.");
        router.push("/sign-in");
      }
    } catch (error) {
      dispatch(signUpFailure(error.message));
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4 pt-28 pb-12">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-accent/6 rounded-full blur-[100px]" />
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
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Card */}
        <div className="glass-strong rounded-2xl p-8 gradient-border">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <Image
              src={logo}
              alt="Engazium"
              height={44}
              className="h-11 w-auto"
            />
            <span className="font-heading text-xl font-bold text-foreground">Engazium</span>
          </div>

          <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Join the community and start growing together
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground text-sm">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="your_username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground text-sm">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 h-11 rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-box h-11 rounded-xl font-heading font-semibold"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground text-center leading-relaxed">
            By signing up, you agree to our{" "}
            <span className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Terms of Service</span>{" "}
            and{" "}
            <span className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Privacy Policy</span>
          </p>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary hover:text-primary/80 transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
