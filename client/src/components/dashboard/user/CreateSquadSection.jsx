"use client"

import { motion } from "framer-motion";
import {
  Zap,
  Plus,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NICHE_OPTIONS = [
  "Art & Creativity", "Technology", "Gaming", "Education", "Business & Finance",
  "Health & Fitness", "Lifestyle", "Fashion & Beauty", "Food & Cooking", "Travel",
  "Self Improvement", "Entertainment", "Music", "Photography & Videography",
  "Podcasting", "News & Commentary", "DIY & Crafts", "Sports", "Science",
  "Pets & Animals", "Nature & Environment", "Spirituality", "Parenting & Family",
  "Vlogs", "Automotive", "Real Estate", "Politics", "Non Profit & Social Impact", "Other"
];

const CreateSquadSection = ({
  createSquadForm,
  setCreateSquadForm,
  createSquadLoading,
  handleCreateSquad,
}) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 gradient-border"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-heading font-bold text-3xl text-foreground mb-2">Create Your Squad</h2>
          <p className="text-muted-foreground text-lg">Lead your own community and grow together</p>
        </div>

        <form onSubmit={handleCreateSquad} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Squad Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Squad Name</label>
              <Input
                placeholder="e.g. Tech Innovators"
                value={createSquadForm.name}
                onChange={(e) => setCreateSquadForm({ ...createSquadForm, name: e.target.value })}
                className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50"
                maxLength={60}
              />
            </div>

            {/* Niche */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Niche</label>
              <Select 
                value={createSquadForm.niche} 
                onValueChange={(value) => setCreateSquadForm({ ...createSquadForm, niche: value })}
              >
                <SelectTrigger className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50">
                  <SelectValue placeholder="Select niche" />
                </SelectTrigger>
                <SelectContent>
                  {NICHE_OPTIONS.map((n) => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Plan */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-foreground">Plan Type</label>
              <Select 
                value={createSquadForm.plan} 
                onValueChange={(value) => setCreateSquadForm({ ...createSquadForm, plan: value })}
              >
                <SelectTrigger className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Growth">Growth (1 post/day)</SelectItem>
                  <SelectItem value="Pro">Pro (2 posts/day)</SelectItem>
                  <SelectItem value="Momentum">Momentum (3 posts/day)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Description</label>
            <Input
              placeholder="What is your squad about?"
              value={createSquadForm.description}
              onChange={(e) => setCreateSquadForm({ ...createSquadForm, description: e.target.value })}
              className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50"
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={createSquadLoading}
              className="w-full h-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl glow-box font-semibold"
            >
              {createSquadLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Creating Squad...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Create Squad
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateSquadSection;

