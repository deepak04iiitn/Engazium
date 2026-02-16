"use client";

import { motion } from "framer-motion";
import {
  User,
  Users,
  Settings,
  Save,
  XCircle,
  AlertTriangle,
  X,
  Target,
  Pencil,
  Activity,
  Plus,
  Minus,
  BarChart3,
  Heart,
  MessageCircle,
  CheckCircle2,
  Info,
  KeyRound,
  Lock,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const NICHE_OPTIONS = [
  "Art & Creativity", "Technology", "Gaming", "Education", "Business & Finance",
  "Health & Fitness", "Lifestyle", "Fashion & Beauty", "Food & Cooking", "Travel",
  "Self Improvement", "Entertainment", "Music", "Photography & Videography",
  "Podcasting", "News & Commentary", "DIY & Crafts", "Sports", "Science",
  "Pets & Animals", "Nature & Environment", "Spirituality", "Parenting & Family",
  "Vlogs", "Automotive", "Real Estate", "Politics", "Non Profit & Social Impact", "Other"
];

const PLATFORM_OPTIONS = [
  "Instagram", "YouTube", "TikTok", "Facebook", "X", "LinkedIn", "Twitch", "Snapchat", "Other"
];

const UserProfile = ({
  currentUser,
  profile,
  setProfile,
  isEditing,
  setIsEditing,
  profileLoading,
  profileSaving,
  profileError,
  setProfileError,
  profileSuccess,
  handleSaveProfile,
  handleCancelEdit,
  profileCompletion,
  formatJoinDate,
  togglePlatform,
  updatePlatformStat,
  selectedPlatforms,
  passwordForm,
  setPasswordForm,
  passwordLoading,
  handleChangePassword,
  deleteDialogOpen,
  setDeleteDialogOpen,
  deletePassword,
  setDeletePassword,
  deleteLoading,
  handleDeleteAccount
}) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

      {/* Error / Success Messages */}
      {profileError && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-4 border border-destructive/30 bg-destructive/5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
            <p className="text-destructive text-sm flex-1">{profileError}</p>
            <Button variant="ghost" size="sm" onClick={() => setProfileError(null)} className="text-destructive hover:bg-destructive/10"><X className="h-4 w-4" /></Button>
          </div>
        </motion.div>
      )}

      {/* ── Profile Card ── */}
      <div className="glass rounded-3xl p-8 gradient-border">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-bold text-2xl text-foreground">Your Profile</h2>
          {!isEditing ? (
            <Button 
              size="sm" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box"
              onClick={() => setIsEditing(true)}
            >
              <Settings className="h-4 w-4 mr-2" />Edit Profile
            </Button>
          ) : (
            <Button 
              variant="outline"
              size="sm" 
              className="border-destructive/30 text-destructive hover:bg-destructive/10"
              onClick={handleCancelEdit}
            >
              <XCircle className="h-4 w-4 mr-2" />Cancel
            </Button>
          )}
        </div>

        {profileLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-muted-foreground text-sm">Loading profile...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-8 mb-8">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-32 w-32 border-4 border-primary/30 ring-4 ring-primary/10">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-3xl font-heading font-bold">
                    {profile.username?.slice(0, 2).toUpperCase() || "??"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-heading font-bold text-foreground">{profile.username}</p>
                  <p className="text-muted-foreground text-xs">Joined {formatJoinDate(currentUser?.createdAt)}</p>
                </div>
              </div>

              <div className="flex-1 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Username */}
                  <div>
                    <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold flex items-center gap-1.5">
                      <User className="h-3 w-3" /> Username
                    </label>
                    <Input
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      disabled={!isEditing}
                      className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70 focus:border-primary/50 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold flex items-center gap-1.5">
                      <User className="h-3 w-3" /> Email
                    </label>
                    <Input
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                      className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70 focus:border-primary/50 transition-colors"
                    />
                  </div>

                  {/* Niche */}
                  <div>
                    <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold flex items-center gap-1.5">
                      <Target className="h-3 w-3" /> Niche
                    </label>
                    {isEditing ? (
                      <Select value={profile.niche} onValueChange={(value) => setProfile({ ...profile, niche: value })}>
                        <SelectTrigger className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {NICHE_OPTIONS.map((n) => (
                            <SelectItem key={n} value={n}>{n}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input value={profile.niche} disabled className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70" />
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold flex items-center gap-1.5">
                    <Pencil className="h-3 w-3" /> Bio
                  </label>
                  <Input 
                    value={profile.bio} 
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })} 
                    disabled={!isEditing} 
                    placeholder="Tell others about yourself..."
                    maxLength={300}
                    className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70 focus:border-primary/50 transition-colors" 
                  />
                  {isEditing && (
                    <p className="text-muted-foreground text-xs mt-1 text-right">{profile.bio?.length || 0}/300</p>
                  )}
                </div>

                {/* Platforms Selection */}
                <div>
                  <label className="text-muted-foreground text-xs uppercase tracking-wider mb-3 block font-semibold flex items-center gap-1.5">
                    <Activity className="h-3 w-3" /> Your Platforms
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORM_OPTIONS.map((platform) => (
                      <button
                        key={platform}
                        type="button"
                        disabled={!isEditing}
                        onClick={() => togglePlatform(platform)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-1.5 ${
                          selectedPlatforms.includes(platform)
                            ? "bg-primary/20 text-primary border-primary/30"
                            : "bg-secondary/30 text-muted-foreground border-border/50 hover:bg-secondary/50"
                        } ${!isEditing ? "opacity-70 cursor-default" : "cursor-pointer"}`}
                      >
                        {selectedPlatforms.includes(platform) ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Per-Platform Stats */}
                {profile.platformStats.length > 0 && (
                  <div className="space-y-4">
                    <label className="text-muted-foreground text-xs uppercase tracking-wider block font-semibold flex items-center gap-1.5">
                      <BarChart3 className="h-3 w-3" /> Platform Stats
                    </label>
                    {profile.platformStats.map((ps) => (
                      <div key={ps.platform} className="bg-secondary/20 rounded-2xl p-5 border border-border/30">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-semibold">{ps.platform}</Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="text-muted-foreground text-xs mb-1.5 block font-medium flex items-center gap-1">
                              <Users className="h-3 w-3" /> Followers
                            </label>
                            <Input
                              type="number"
                              min="0"
                              value={ps.numberOfFollowers}
                              onChange={(e) => updatePlatformStat(ps.platform, "numberOfFollowers", e.target.value)}
                              disabled={!isEditing}
                              placeholder="0"
                              className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70 focus:border-primary/50 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-muted-foreground text-xs mb-1.5 block font-medium flex items-center gap-1">
                              <Heart className="h-3 w-3" /> Avg Likes
                            </label>
                            <Input
                              type="number"
                              min="0"
                              value={ps.avgLikes}
                              onChange={(e) => updatePlatformStat(ps.platform, "avgLikes", e.target.value)}
                              disabled={!isEditing}
                              placeholder="0"
                              className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70 focus:border-primary/50 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-muted-foreground text-xs mb-1.5 block font-medium flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" /> Avg Comments
                            </label>
                            <Input
                              type="number"
                              min="0"
                              value={ps.avgComments}
                              onChange={(e) => updatePlatformStat(ps.platform, "avgComments", e.target.value)}
                              disabled={!isEditing}
                              placeholder="0"
                              className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70 focus:border-primary/50 transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end pt-6 border-t border-border/30">
                <Button 
                  onClick={handleSaveProfile} 
                  disabled={profileSaving}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl glow-box px-8"
                >
                  {profileSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Changes
                </Button>
              </div>
            )}

            {/* Profile Completion */}
            <div className="mt-8 pt-8 border-t border-border/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-heading font-semibold text-foreground flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Profile Completion
                </span>
                <span className="text-primary font-heading font-bold text-lg">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-3 bg-secondary/50 rounded-full" />
              <p className="text-muted-foreground text-xs mt-3 flex items-center gap-1.5">
                {profileCompletion === 100
                  ? <><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Your profile is complete! You&apos;re all set.</>
                  : <><Info className="h-3.5 w-3.5 text-primary" /> Complete your bio, niche, and add platform stats to unlock full features!</>
                }
              </p>
            </div>
          </>
        )}
      </div>

      {/* ── Change Password Card ── */}
      <div className="glass rounded-3xl p-8 gradient-border">
        <h3 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" />
          Change Password
        </h3>
        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold">Current Password</label>
            <Input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              placeholder="••••••••"
              className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50"
            />
          </div>
          <div>
            <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold">New Password</label>
            <Input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              placeholder="••••••••"
              className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50"
            />
            <p className="text-muted-foreground text-xs mt-1">Must be at least 8 characters</p>
          </div>
          <div>
            <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold">Confirm New Password</label>
            <Input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              placeholder="••••••••"
              className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50"
            />
          </div>
          <Button type="submit" disabled={passwordLoading} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6">
            {passwordLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Lock className="h-4 w-4 mr-2" />}
            Update Password
          </Button>
        </form>
      </div>

      {/* ── Danger Zone ── */}
      <div className="glass rounded-3xl p-8 border border-destructive/20">
        <h3 className="font-heading font-bold text-xl text-destructive mb-2 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Danger Zone
        </h3>
        <p className="text-muted-foreground text-sm mb-6">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <Button
          variant="outline"
          className="border-destructive/30 text-destructive hover:bg-destructive/10 rounded-xl"
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Account
        </Button>
      </div>

      {/* Delete Account Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="glass border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete Account
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your account, profile, and all data. This action cannot be undone. Enter your password to confirm.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <Input
              type="password"
              placeholder="Enter your password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="bg-secondary/50 border-border/50 rounded-xl"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading} onClick={() => setDeletePassword("")}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={deleteLoading || !deletePassword}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Delete My Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default UserProfile;
