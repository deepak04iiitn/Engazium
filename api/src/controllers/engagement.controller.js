import { errorHandler } from "../middlewares/errorHandler.js";
import Engagement from "../models/engagement.model.js";
import Post from "../models/post.model.js";
import SquadMember from "../models/squadMember.model.js";

// Minimum seconds a user must spend on the linked content
const MIN_ENGAGEMENT_SECONDS = 25;

// POST /api/engagement/start — record that user clicked a post link
export const startEngagement = async (req, res, next) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return next(errorHandler(400, "Post ID is required"));
    }

    const post = await Post.findById(postId);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }

    // Can't engage with own post
    if (post.author.toString() === req.user.id) {
      return next(errorHandler(400, "You cannot engage with your own post"));
    }

    // Check if user is a squad member
    const membership = await SquadMember.findOne({
      squad: post.squad,
      user: req.user.id,
    });

    if (!membership) {
      return next(errorHandler(403, "You must be a squad member to engage"));
    }

    // Check if already engaged with this post
    const existing = await Engagement.findOne({
      user: req.user.id,
      post: postId,
    });

    if (existing) {
      if (existing.isValid) {
        return next(errorHandler(400, "You have already engaged with this post"));
      }
      // If started but not validated, update clickedAt to restart
      existing.clickedAt = new Date();
      existing.isValid = false;
      existing.validatedAt = null;
      existing.timeSpent = 0;
      await existing.save();

      return res.status(200).json({
        success: true,
        message: "Engagement timer restarted",
        engagement: { id: existing._id, clickedAt: existing.clickedAt },
      });
    }

    const engagement = await Engagement.create({
      user: req.user.id,
      post: postId,
      squad: post.squad,
      clickedAt: new Date(),
      isValid: false,
    });

    res.status(201).json({
      success: true,
      message: "Engagement tracking started",
      engagement: { id: engagement._id, clickedAt: engagement.clickedAt },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/engagement/validate — validate engagement after time threshold
export const validateEngagement = async (req, res, next) => {
  try {
    const { engagementId, timeSpent } = req.body;

    if (!engagementId) {
      return next(errorHandler(400, "Engagement ID is required"));
    }

    const engagement = await Engagement.findById(engagementId);

    if (!engagement) {
      return next(errorHandler(404, "Engagement record not found"));
    }

    if (engagement.user.toString() !== req.user.id) {
      return next(errorHandler(403, "Not authorized"));
    }

    if (engagement.isValid) {
      return next(errorHandler(400, "Engagement already validated"));
    }

    // Server-side time validation
    const now = new Date();
    const elapsed = (now - engagement.clickedAt) / 1000; // seconds

    if (elapsed < MIN_ENGAGEMENT_SECONDS) {
      const remaining = Math.ceil(MIN_ENGAGEMENT_SECONDS - elapsed);
      return res.status(400).json({
        success: false,
        message: `Not enough time spent. Please spend at least ${remaining} more seconds on the content.`,
        remainingSeconds: remaining,
      });
    }

    // Validate the engagement
    engagement.isValid = true;
    engagement.validatedAt = now;
    engagement.timeSpent = Math.round(timeSpent || elapsed);
    await engagement.save();

    // Increment engagement count on the post
    await Post.findByIdAndUpdate(engagement.post, {
      $inc: { engagementCount: 1 },
    });

    res.status(200).json({
      success: true,
      message: "Engagement validated successfully!",
      engagement,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/engagement/stats/:squadId — get engagement stats for user in a squad
export const getEngagementStats = async (req, res, next) => {
  try {
    const { squadId } = req.params;

    const membership = await SquadMember.findOne({
      squad: squadId,
      user: req.user.id,
    });

    if (!membership) {
      return next(errorHandler(403, "You are not a member of this squad"));
    }

    // Total posts in squad by other members (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const totalOpportunities = await Post.countDocuments({
      squad: squadId,
      author: { $ne: req.user.id },
      createdAt: { $gte: sevenDaysAgo },
    });

    // Valid engagements by this user in this squad (last 7 days)
    const validEngagements = await Engagement.countDocuments({
      squad: squadId,
      user: req.user.id,
      isValid: true,
      createdAt: { $gte: sevenDaysAgo },
    });

    // Total engagements (all time)
    const totalValidEngagements = await Engagement.countDocuments({
      squad: squadId,
      user: req.user.id,
      isValid: true,
    });

    const engagementPercentage =
      totalOpportunities > 0
        ? Math.round((validEngagements / totalOpportunities) * 100)
        : 100;

    res.status(200).json({
      success: true,
      stats: {
        engagementPercentage,
        totalOpportunities,
        validEngagements,
        totalValidEngagements,
        lowEngagementSince: membership.lowEngagementSince,
        warningNotified: membership.warningNotified,
        memberSince: membership.joinedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/engagement/squad-overview/:squadId — admin view of all member engagement
export const getSquadEngagementOverview = async (req, res, next) => {
  try {
    const { squadId } = req.params;

    const members = await SquadMember.find({ squad: squadId })
      .populate("user", "username email")
      .sort({ engagementPercentage: -1 })
      .lean();

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const enrichedMembers = await Promise.all(
      members.map(async (m) => {
        const validEngagements = await Engagement.countDocuments({
          squad: squadId,
          user: m.user._id,
          isValid: true,
          createdAt: { $gte: sevenDaysAgo },
        });

        return {
          ...m,
          recentValidEngagements: validEngagements,
        };
      })
    );

    res.status(200).json({
      success: true,
      members: enrichedMembers,
    });
  } catch (error) {
    next(error);
  }
};

