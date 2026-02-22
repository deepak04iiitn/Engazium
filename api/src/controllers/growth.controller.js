import { errorHandler } from "../middlewares/errorHandler.js";
import GrowthSnapshot from "../models/growthSnapshot.model.js";
import User from "../models/user.model.js";

/**
 * Get the Monday (start) of the current ISO week.
 */
function getCurrentWeekStart() {
  const now = new Date();
  const day = now.getUTCDay(); // 0 = Sunday
  const diff = day === 0 ? 6 : day - 1; // days since Monday
  const monday = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - diff)
  );
  monday.setUTCHours(0, 0, 0, 0);
  return monday;
}

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/growth/snapshot — Submit weekly growth data for all platforms
// Body: { platforms: [{ platform, followers, avgLikes, avgComments, avgReach }] }
// ──────────────────────────────────────────────────────────────────────────────
export const submitGrowthSnapshot = async (req, res, next) => {
  try {
    const { platforms } = req.body;

    if (!platforms || !Array.isArray(platforms) || platforms.length === 0) {
      return next(
        errorHandler(400, "Please provide platform data for at least one platform")
      );
    }

    const weekStart = getCurrentWeekStart();
    const userId = req.user.id;

    // Check user has these platforms in their profile
    const user = await User.findById(userId).lean();
    if (!user) return next(errorHandler(404, "User not found"));

    const userPlatforms = (user.platformStats || []).map((ps) => ps.platform);

    const snapshots = [];

    for (const entry of platforms) {
      if (!entry.platform) {
        return next(errorHandler(400, "Each entry must have a platform name"));
      }

      if (!userPlatforms.includes(entry.platform)) {
        return next(
          errorHandler(
            400,
            `Platform "${entry.platform}" is not in your profile. Add it to your profile first.`
          )
        );
      }

      // Check if baseline exists for this platform
      const hasBaseline = await GrowthSnapshot.exists({
        user: userId,
        platform: entry.platform,
        isBaseline: true,
      });

      // Upsert: update if already submitted this week, create otherwise
      const snapshot = await GrowthSnapshot.findOneAndUpdate(
        { user: userId, platform: entry.platform, weekStart },
        {
          followers: Number(entry.followers) || 0,
          avgLikes: Number(entry.avgLikes) || 0,
          avgComments: Number(entry.avgComments) || 0,
          avgReach: Number(entry.avgReach) || 0,
          isBaseline: !hasBaseline, // First ever snapshot becomes baseline
        },
        { new: true, upsert: true }
      );

      snapshots.push(snapshot);
    }

    // Also update the user's platformStats with latest numbers
    const updatedStats = user.platformStats.map((ps) => {
      const submitted = platforms.find((p) => p.platform === ps.platform);
      if (submitted) {
        return {
          ...ps,
          numberOfFollowers: Number(submitted.followers) || ps.numberOfFollowers,
          avgLikes: Number(submitted.avgLikes) || ps.avgLikes,
          avgComments: Number(submitted.avgComments) || ps.avgComments,
        };
      }
      return ps;
    });

    await User.findByIdAndUpdate(userId, { platformStats: updatedStats });

    res.status(200).json({
      success: true,
      message: "Weekly growth data submitted successfully!",
      snapshots,
    });
  } catch (error) {
    // Handle duplicate key gracefully
    if (error.code === 11000) {
      return res.status(200).json({
        success: true,
        message: "Growth data already submitted for this week and updated.",
      });
    }
    next(error);
  }
};

// ──────────────────────────────────────────────────────────────────────────────
// GET /api/growth/check-in-status — Has user submitted data this week?
// ──────────────────────────────────────────────────────────────────────────────
export const getCheckInStatus = async (req, res, next) => {
  try {
    const weekStart = getCurrentWeekStart();
    const userId = req.user.id;

    const user = await User.findById(userId).lean();
    if (!user) return next(errorHandler(404, "User not found"));

    const userPlatforms = (user.platformStats || []).map((ps) => ps.platform);

    if (userPlatforms.length === 0) {
      return res.status(200).json({
        success: true,
        needsCheckIn: false,
        reason: "no_platforms",
        message: "Add platforms to your profile first",
      });
    }

    // Check how many platforms have been submitted this week
    const submittedCount = await GrowthSnapshot.countDocuments({
      user: userId,
      weekStart,
    });

    const needsCheckIn = submittedCount < userPlatforms.length;

    res.status(200).json({
      success: true,
      needsCheckIn,
      totalPlatforms: userPlatforms.length,
      submittedPlatforms: submittedCount,
      platforms: userPlatforms,
      weekStart,
    });
  } catch (error) {
    next(error);
  }
};

// ──────────────────────────────────────────────────────────────────────────────
// GET /api/growth/history — Get user's growth history (for charts)
// Query: ?platform=Instagram&limit=12  (limit = number of weeks)
// ──────────────────────────────────────────────────────────────────────────────
export const getGrowthHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { platform, limit } = req.query;
    const weekLimit = parseInt(limit) || 12;

    const filter = { user: userId };
    if (platform) filter.platform = platform;

    const snapshots = await GrowthSnapshot.find(filter)
      .sort({ weekStart: -1 })
      .limit(platform ? weekLimit : weekLimit * 9) // if no platform filter, get more
      .lean();

    // Group by platform
    const grouped = {};
    for (const snap of snapshots) {
      if (!grouped[snap.platform]) grouped[snap.platform] = [];
      grouped[snap.platform].push(snap);
    }

    // Reverse each group so oldest first (for charts)
    for (const key of Object.keys(grouped)) {
      grouped[key].reverse();
    }

    // Get baselines
    const baselines = await GrowthSnapshot.find({
      user: userId,
      isBaseline: true,
    }).lean();

    const baselineMap = {};
    for (const b of baselines) {
      baselineMap[b.platform] = b;
    }

    // Calculate growth per platform
    const growthSummary = {};
    for (const [plat, snaps] of Object.entries(grouped)) {
      const baseline = baselineMap[plat];
      const latest = snaps[snaps.length - 1];
      if (baseline && latest && baseline._id.toString() !== latest._id.toString()) {
        const followerGrowth = latest.followers - baseline.followers;
        const followerPct =
          baseline.followers > 0
            ? Math.round((followerGrowth / baseline.followers) * 100)
            : latest.followers > 0
            ? 100
            : 0;

        const likeGrowth = latest.avgLikes - baseline.avgLikes;
        const likePct =
          baseline.avgLikes > 0
            ? Math.round((likeGrowth / baseline.avgLikes) * 100)
            : latest.avgLikes > 0
            ? 100
            : 0;

        growthSummary[plat] = {
          followerGrowth,
          followerPct,
          likeGrowth,
          likePct,
          baselineFollowers: baseline.followers,
          latestFollowers: latest.followers,
          baselineLikes: baseline.avgLikes,
          latestLikes: latest.avgLikes,
          weeks: snaps.length,
        };
      }
    }

    res.status(200).json({
      success: true,
      history: grouped,
      baselines: baselineMap,
      growthSummary,
    });
  } catch (error) {
    next(error);
  }
};

// ──────────────────────────────────────────────────────────────────────────────
// GET /api/growth/achievements — Public endpoint for landing page
// Returns users who grew significantly after joining Engazium
// ──────────────────────────────────────────────────────────────────────────────
export const getGrowthAchievements = async (req, res, next) => {
  try {
    // Find all users who have baseline snapshots
    const baselines = await GrowthSnapshot.find({ isBaseline: true }).lean();

    // Group baselines by user
    const userBaselines = {};
    for (const b of baselines) {
      const uid = b.user.toString();
      if (!userBaselines[uid]) userBaselines[uid] = {};
      userBaselines[uid][b.platform] = b;
    }

    const achievements = [];

    for (const [userId, platformBaselines] of Object.entries(userBaselines)) {
      for (const [platform, baseline] of Object.entries(platformBaselines)) {
        // Get latest snapshot for this user + platform
        const latest = await GrowthSnapshot.findOne({
          user: userId,
          platform,
          isBaseline: false,
        })
          .sort({ weekStart: -1 })
          .lean();

        if (!latest) continue;

        const followerGrowth = latest.followers - baseline.followers;
        const followerPct =
          baseline.followers > 0
            ? Math.round((followerGrowth / baseline.followers) * 100)
            : 0;

        const likeGrowth = latest.avgLikes - baseline.avgLikes;
        const reachGrowth = latest.avgReach - baseline.avgReach;

        // Only include if there's meaningful growth (>10% followers OR >20% likes)
        if (followerPct < 10 && likeGrowth <= 0) continue;

        // Get user info
        const user = await User.findById(userId)
          .select("username niche createdAt")
          .lean();
        if (!user) continue;

        // Calculate days since joining
        const daysSinceJoin = Math.floor(
          (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        );

        achievements.push({
          username: user.username,
          niche: user.niche,
          platform,
          followerGrowth,
          followerPct,
          likeGrowth,
          reachGrowth,
          baselineFollowers: baseline.followers,
          latestFollowers: latest.followers,
          daysSinceJoin,
          metric: followerPct >= 100
            ? `${Math.round(latest.followers / Math.max(baseline.followers, 1))}x followers`
            : followerPct > 0
            ? `+${followerPct}% followers`
            : `+${likeGrowth} avg likes`,
        });
      }
    }

    // Sort by follower percentage growth, descending
    achievements.sort((a, b) => b.followerPct - a.followerPct);

    // Return top 12 achievements
    res.status(200).json({
      success: true,
      achievements: achievements.slice(0, 12),
    });
  } catch (error) {
    next(error);
  }
};

