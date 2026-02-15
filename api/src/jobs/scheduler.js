import cron from "node-cron";
import Squad from "../models/squad.model.js";
import SquadMember from "../models/squadMember.model.js";
import Post from "../models/post.model.js";
import Engagement from "../models/engagement.model.js";

const LOW_ENGAGEMENT_THRESHOLD = 30; // percent
const WARNING_DAYS = 7; // days before removal

/**
 * Recalculate engagement percentages for all squad members.
 * Engagement % = (valid engagements / total engagement opportunities) × 100
 * Opportunities = posts by OTHER members in the last 7 days
 */
async function recalculateEngagement() {
  try {
    const squads = await Squad.find({}).lean();
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    for (const squad of squads) {
      const members = await SquadMember.find({ squad: squad._id });

      // Get all posts in squad in last 7 days
      const recentPosts = await Post.find({
        squad: squad._id,
        createdAt: { $gte: sevenDaysAgo },
      }).lean();

      for (const member of members) {
        // Posts by OTHER members (opportunities for this user)
        const opportunities = recentPosts.filter(
          (p) => p.author.toString() !== member.user.toString()
        );

        if (opportunities.length === 0) {
          // No opportunities → keep engagement at 100%
          member.engagementPercentage = 100;
        } else {
          // Count valid engagements by this user on those posts
          const opportunityPostIds = opportunities.map((p) => p._id);
          const validCount = await Engagement.countDocuments({
            user: member.user,
            post: { $in: opportunityPostIds },
            isValid: true,
          });

          member.engagementPercentage = Math.round(
            (validCount / opportunities.length) * 100
          );
        }

        // Handle low engagement warnings
        if (member.engagementPercentage < LOW_ENGAGEMENT_THRESHOLD) {
          if (!member.lowEngagementSince) {
            member.lowEngagementSince = new Date();
            member.warningNotified = true;
            console.log(
              `[Scheduler] Warning: User ${member.user} in squad ${squad.name} dropped below ${LOW_ENGAGEMENT_THRESHOLD}%`
            );
          } else {
            // Check if 7 days have passed since warning
            const daysSinceWarning =
              (Date.now() - member.lowEngagementSince.getTime()) /
              (1000 * 60 * 60 * 24);

            if (daysSinceWarning >= WARNING_DAYS) {
              // Remove member from squad
              console.log(
                `[Scheduler] Removing user ${member.user} from squad ${squad.name} — low engagement for ${WARNING_DAYS}+ days`
              );

              await SquadMember.findByIdAndDelete(member._id);

              // Update squad member count
              await Squad.findByIdAndUpdate(squad._id, {
                $inc: { memberCount: -1 },
              });

              // Update squad status if needed
              const updatedSquad = await Squad.findById(squad._id);
              if (updatedSquad && updatedSquad.memberCount < updatedSquad.maxMembers) {
                updatedSquad.status = "Recruiting";
                await updatedSquad.save();
              }

              continue; // Skip saving this member since they've been removed
            }
          }
        } else {
          // Engagement is healthy — clear warnings
          member.lowEngagementSince = null;
          member.warningNotified = false;
        }

        await member.save();
      }
    }

    console.log("[Scheduler] Engagement recalculation complete");
  } catch (error) {
    console.error("[Scheduler] Error recalculating engagement:", error);
  }
}

/**
 * Delete posts older than 15 days.
 * Note: We also have a TTL index as backup, but this ensures clean deletion
 * of related engagement records as well.
 */
async function cleanupOldPosts() {
  try {
    const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);

    const oldPosts = await Post.find({ createdAt: { $lt: fifteenDaysAgo } });

    if (oldPosts.length > 0) {
      const postIds = oldPosts.map((p) => p._id);

      // Delete related engagements
      const engResult = await Engagement.deleteMany({ post: { $in: postIds } });

      // Delete old posts
      const postResult = await Post.deleteMany({ createdAt: { $lt: fifteenDaysAgo } });

      console.log(
        `[Scheduler] Cleaned up ${postResult.deletedCount} old posts and ${engResult.deletedCount} related engagements`
      );
    }
  } catch (error) {
    console.error("[Scheduler] Error cleaning up old posts:", error);
  }
}

/**
 * Initialize all cron jobs
 */
export function initScheduler() {
  // Recalculate engagement every hour
  cron.schedule("0 * * * *", () => {
    console.log("[Scheduler] Running hourly engagement recalculation...");
    recalculateEngagement();
  });

  // Clean up old posts daily at midnight UTC
  cron.schedule("0 0 * * *", () => {
    console.log("[Scheduler] Running daily old post cleanup...");
    cleanupOldPosts();
  });

  console.log("[Scheduler] Cron jobs initialized");

  // Run initial recalculation on startup (delayed by 10s to let DB connect)
  setTimeout(() => {
    recalculateEngagement();
  }, 10000);
}

