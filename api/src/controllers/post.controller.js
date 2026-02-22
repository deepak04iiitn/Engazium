import { errorHandler } from "../middlewares/errorHandler.js";
import Squad from "../models/squad.model.js";
import SquadMember from "../models/squadMember.model.js";
import Post from "../models/post.model.js";

// Plan limits
const PLAN_LIMITS = {
  Growth: 1,
  Pro: 2,
  Momentum: 3,
};

// POST /api/posts — create a post in a squad
export const createPost = async (req, res, next) => {
  try {
    const { squadId, link, caption } = req.body;

    if (!squadId || !link) {
      return next(errorHandler(400, "Squad ID and link are required"));
    }

    // Validate URL format
    try {
      new URL(link);
    } catch {
      return next(errorHandler(400, "Invalid URL format"));
    }

    // Check squad exists
    const squad = await Squad.findById(squadId);
    if (!squad) {
      return next(errorHandler(404, "Squad not found"));
    }

    // Check user is a member
    const membership = await SquadMember.findOne({
      squad: squadId,
      user: req.user.id,
    });

    if (!membership) {
      return next(errorHandler(403, "You are not a member of this squad"));
    }

    // Check if user has accepted squad rules
    if (!membership.rulesAccepted) {
      return next(
        errorHandler(
          403,
          "You must accept the squad rules before creating your first post"
        )
      );
    }

    // Server-side daily post limit validation
    const dailyLimit = PLAN_LIMITS[squad.plan] || 1;

    // Get start and end of today (UTC)
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setUTCHours(23, 59, 59, 999);

    const todayPostCount = await Post.countDocuments({
      author: req.user.id,
      squad: squadId,
      createdAt: { $gte: todayStart, $lte: todayEnd },
    });

    if (todayPostCount >= dailyLimit) {
      return next(
        errorHandler(
          429,
          `Daily post limit reached. ${squad.plan} plan allows ${dailyLimit} post(s) per day.`
        )
      );
    }

    const post = new Post({
      squad: squadId,
      author: req.user.id,
      link: link.trim(),
      caption: caption?.trim() || "",
    });

    await post.save();

    // Populate author info for response
    await post.populate("author", "username email");

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/posts/squad/:squadId — get posts for a squad
export const getSquadPosts = async (req, res, next) => {
  try {
    const { squadId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Check membership
    const membership = await SquadMember.findOne({
      squad: squadId,
      user: req.user.id,
    });

    if (!membership) {
      return next(errorHandler(403, "You are not a member of this squad"));
    }

    const total = await Post.countDocuments({ squad: squadId });
    const posts = await Post.find({ squad: squadId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "username email")
      .lean();

    // For each post, check if current user has already engaged
    const postIds = posts.map((p) => p._id);
    const { default: Engagement } = await import("../models/engagement.model.js");
    const userEngagements = await Engagement.find({
      user: req.user.id,
      post: { $in: postIds },
    }).lean();

    const engagementMap = {};
    userEngagements.forEach((e) => {
      engagementMap[e.post.toString()] = {
        isValid: e.isValid,
        clickedAt: e.clickedAt,
        engagementId: e._id,
      };
    });

    const enrichedPosts = posts.map((p) => ({
      ...p,
      userEngagement: engagementMap[p._id.toString()] || null,
      isOwnPost: p.author._id.toString() === req.user.id,
    }));

    res.status(200).json({
      success: true,
      posts: enrichedPosts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/posts/my-count/:squadId — get user's post count today
export const getMyPostCount = async (req, res, next) => {
  try {
    const { squadId } = req.params;

    const squad = await Squad.findById(squadId);
    if (!squad) {
      return next(errorHandler(404, "Squad not found"));
    }

    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setUTCHours(23, 59, 59, 999);

    const count = await Post.countDocuments({
      author: req.user.id,
      squad: squadId,
      createdAt: { $gte: todayStart, $lte: todayEnd },
    });

    const dailyLimit = PLAN_LIMITS[squad.plan] || 1;

    res.status(200).json({
      success: true,
      postsToday: count,
      dailyLimit,
      remaining: Math.max(0, dailyLimit - count),
      plan: squad.plan,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/posts/:id — delete a post (author or squad admin)
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }

    // Check if user is author or squad admin
    const isAuthor = post.author.toString() === req.user.id;
    const isSquadAdmin = await SquadMember.findOne({
      squad: post.squad,
      user: req.user.id,
      role: "admin",
    });

    if (!isAuthor && !isSquadAdmin && !req.user.isUserAdmin) {
      return next(errorHandler(403, "Not authorized to delete this post"));
    }

    // Clean up engagements
    const { default: Engagement } = await import("../models/engagement.model.js");
    await Engagement.deleteMany({ post: post._id });
    await Post.findByIdAndDelete(post._id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

