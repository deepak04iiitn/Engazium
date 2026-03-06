import mongoose from "mongoose";
import { errorHandler } from "../middlewares/errorHandler.js";
import Squad from "../models/squad.model.js";
import SquadMember from "../models/squadMember.model.js";
import Post from "../models/post.model.js";
import Engagement from "../models/engagement.model.js";

// Plan limits
const PLAN_LIMITS = {
  Growth: 1,
  Pro: 2,
  Momentum: 3,
};
const MIN_POST_ENGAGEMENT_PERCENT = 30;

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

    // Recalculate engagement in real-time so new members are not penalized
    // for posts that existed before they joined, and to avoid stale scheduler values.
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const engagementWindowStart =
      membership.joinedAt && membership.joinedAt > sevenDaysAgo
        ? membership.joinedAt
        : sevenDaysAgo;

    const [totalOpportunities, validEngagements] = await Promise.all([
      Post.countDocuments({
        squad: squadId,
        author: { $ne: req.user.id },
        createdAt: { $gte: engagementWindowStart },
      }),
      Engagement.countDocuments({
        squad: squadId,
        user: req.user.id,
        isValid: true,
        createdAt: { $gte: engagementWindowStart },
      }),
    ]);

    const currentEngagementPercentage =
      totalOpportunities > 0
        ? Math.round((validEngagements / totalOpportunities) * 100)
        : 100;

    // Keep persisted value in sync to reduce UI/backend drift between scheduler runs.
    if (membership.engagementPercentage !== currentEngagementPercentage) {
      membership.engagementPercentage = currentEngagementPercentage;
      await membership.save();
    }

    // Block posting when engagement is below threshold
    if (currentEngagementPercentage < MIN_POST_ENGAGEMENT_PERCENT) {
      return next(
        errorHandler(
          403,
          `Posting is disabled while your engagement is below ${MIN_POST_ENGAGEMENT_PERCENT}%. Your current engagement is ${currentEngagementPercentage}%. Increase it to at least ${MIN_POST_ENGAGEMENT_PERCENT}% to share posts again.`
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
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Search, filter, sort params
    const search = (req.query.search || "").trim();
    const sortBy = req.query.sortBy || "pending_first";
    const filter = req.query.filter || ""; // mine, engaged, not_engaged
    const timeRange = req.query.timeRange || ""; // today, week, month

    // Check membership
    const membership = await SquadMember.findOne({
      squad: squadId,
      user: req.user.id,
    });

    if (!membership) {
      return next(errorHandler(403, "You are not a member of this squad"));
    }

    const { default: Engagement } = await import("../models/engagement.model.js");

    // ObjectId references for aggregation compatibility
    const squadObjId = new mongoose.Types.ObjectId(squadId);
    const userObjId = new mongoose.Types.ObjectId(req.user.id);

    // Always fetch engaged post IDs for this user in this squad
    // (needed for pending count, pending_first sort, and engagement filters)
    const engagedDocs = await Engagement.find(
      { user: req.user.id, squad: squadId, isValid: true },
      "post"
    ).lean();
    const engagedPostIds = engagedDocs.map((e) => e.post);

    // Build query filter (using ObjectId for aggregation compatibility)
    const query = { squad: squadObjId };

    // Author filter
    if (filter === "mine") {
      query.author = userObjId;
    }

    // Time range filter
    if (timeRange) {
      const now = new Date();
      let startDate;
      if (timeRange === "today") {
        startDate = new Date(now);
        startDate.setUTCHours(0, 0, 0, 0);
      } else if (timeRange === "week") {
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 7);
      } else if (timeRange === "month") {
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 30);
      }
      if (startDate) {
        query.createdAt = { $gte: startDate };
      }
    }

    // Search — match caption or author username
    let authorIdsFromSearch = null;
    if (search) {
      const { default: User } = await import("../models/user.model.js");
      const matchingUsers = await User.find(
        { username: { $regex: search, $options: "i" } },
        "_id"
      ).lean();
      authorIdsFromSearch = matchingUsers.map((u) => u._id);
    }

    if (search) {
      const searchConditions = [
        { caption: { $regex: search, $options: "i" } },
      ];
      if (authorIdsFromSearch && authorIdsFromSearch.length > 0) {
        searchConditions.push({ author: { $in: authorIdsFromSearch } });
      }
      // If there's already an author filter (mine), combine with $and
      if (query.author) {
        query.$and = [
          { author: query.author },
          { $or: searchConditions },
        ];
        delete query.author;
      } else {
        query.$or = searchConditions;
      }
    }

    // Engagement filter
    if (filter === "engaged") {
      query._id = { $in: engagedPostIds };
    } else if (filter === "not_engaged") {
      query._id = { $nin: engagedPostIds };
      // Also exclude own posts for "not engaged" since you can't engage your own
      if (!query.author) {
        query.author = { $ne: userObjId };
      }
    }

    // Pending engagement count — always calculated independently of current filters
    // (posts NOT by user AND NOT engaged by user)
    const pendingEngagementCount = await Post.countDocuments({
      squad: squadObjId,
      author: { $ne: userObjId },
      _id: { $nin: engagedPostIds },
    });

    const total = await Post.countDocuments(query);

    let posts;

    if (sortBy === "pending_first") {
      // Use aggregation pipeline for custom priority sort
      // Priority 0 = not engaged & not own post (show first)
      // Priority 1 = already engaged or own post (show after)
      const pipeline = [
        { $match: query },
        {
          $addFields: {
            _sortPriority: {
              $cond: {
                if: {
                  $and: [
                    { $not: [{ $in: ["$_id", engagedPostIds] }] },
                    { $ne: ["$author", userObjId] },
                  ],
                },
                then: 0,
                else: 1,
              },
            },
          },
        },
        { $sort: { _sortPriority: 1, createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "_authorInfo",
            pipeline: [{ $project: { username: 1, email: 1 } }],
          },
        },
        { $unwind: "$_authorInfo" },
        {
          $addFields: {
            author: {
              _id: "$_authorInfo._id",
              username: "$_authorInfo.username",
              email: "$_authorInfo.email",
            },
          },
        },
        { $project: { _authorInfo: 0, _sortPriority: 0 } },
      ];

      posts = await Post.aggregate(pipeline);
    } else {
      // Use regular find for standard sorts
      let sortObj;
      switch (sortBy) {
        case "oldest":
          sortObj = { createdAt: 1 };
          break;
        case "most_engaged":
          sortObj = { engagementCount: -1, createdAt: -1 };
          break;
        case "least_engaged":
          sortObj = { engagementCount: 1, createdAt: -1 };
          break;
        default:
          sortObj = { createdAt: -1 };
      }

      posts = await Post.find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .populate("author", "username email")
        .lean();
    }

    // Enrich posts with user engagement data
    const postIds = posts.map((p) => p._id);
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
      pendingEngagementCount,
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

