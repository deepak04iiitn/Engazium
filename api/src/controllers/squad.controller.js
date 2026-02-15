import { errorHandler } from "../middlewares/errorHandler.js";
import Squad from "../models/squad.model.js";
import SquadMember from "../models/squadMember.model.js";
import Post from "../models/post.model.js";
import Engagement from "../models/engagement.model.js";

// POST /api/squads — create a new squad
export const createSquad = async (req, res, next) => {
  try {
    const { name, plan, niche, platform, maxMembers, description } = req.body;

    if (!name || !plan || !niche) {
      return next(errorHandler(400, "Name, plan, and niche are required"));
    }

    const validPlans = ["Growth", "Pro", "Momentum"];
    if (!validPlans.includes(plan)) {
      return next(errorHandler(400, "Invalid plan. Must be Growth, Pro, or Momentum"));
    }

    const planLimits = { Growth: 10, Pro: 20, Momentum: 30 };
    const maxMembersLimit = planLimits[plan] || 10;

    const squad = new Squad({
      name: name.trim(),
      plan,
      niche,
      ...(platform && { platform }),
      maxMembers: maxMembers || maxMembersLimit,
      description: description || "",
      createdBy: req.user.id,
      memberCount: 1,
      status: "Active",
    });

    await squad.save();

    // Add creator as admin member
    await SquadMember.create({
      squad: squad._id,
      user: req.user.id,
      role: "admin",
      engagementPercentage: 100,
    });

    res.status(201).json({
      success: true,
      message: "Squad created successfully",
      squad,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/squads — list all squads (with filters)
export const getSquads = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";
    
    // Multi-select filters (comma-separated)
    const niches = req.query.niches ? req.query.niches.split(",") : [];
    const plans = req.query.plans ? req.query.plans.split(",") : [];
    
    // Single-select filters
    const status = req.query.status || "";
    const memberRange = req.query.memberRange || "";
    
    // Sorting
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const filter = {};

    // Search across name, niche, and description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { niche: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    
    // Multi-select niche filter
    if (niches.length > 0) {
      filter.niche = { $in: niches };
    }
    
    // Multi-select plan filter
    if (plans.length > 0) {
      filter.plan = { $in: plans };
    }
    
    // Status filter
    if (status && status !== "all") {
      if (status === "active") {
        filter.status = "Active";
      } else if (status === "full") {
        filter.$expr = { $gte: ["$memberCount", "$maxMembers"] };
      }
    }
    
    // Member range filter
    if (memberRange && memberRange !== "all") {
      if (memberRange === "0-5") {
        filter.memberCount = { $lte: 5 };
      } else if (memberRange === "5-10") {
        filter.memberCount = { $gt: 5, $lte: 10 };
      } else if (memberRange === "10+") {
        filter.memberCount = { $gt: 10 };
      }
    }

    // Build sort object
    let sortObj = {};
    if (sortBy === "members") {
      sortObj.memberCount = sortOrder;
    } else if (sortBy === "date") {
      sortObj.createdAt = sortOrder;
    } else if (sortBy === "name") {
      sortObj.name = sortOrder;
    } else {
      sortObj.createdAt = -1; // Default sort
    }

    const total = await Squad.countDocuments(filter);
    const squads = await Squad.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "username")
      .lean();

    // Attach avg engagement for each squad
    const squadIds = squads.map((s) => s._id);
    const engagementAggs = await SquadMember.aggregate([
      { $match: { squad: { $in: squadIds } } },
      {
        $group: {
          _id: "$squad",
          avgEngagement: { $avg: "$engagementPercentage" },
        },
      },
    ]);

    const engagementMap = {};
    engagementAggs.forEach((e) => {
      engagementMap[e._id.toString()] = Math.round(e.avgEngagement * 10) / 10;
    });

    let enrichedSquads = squads.map((s) => ({
      ...s,
      avgEngagement: engagementMap[s._id.toString()] || 0,
    }));

    // Sort by engagement if requested (needs to be done after enrichment)
    if (sortBy === "engagement") {
      enrichedSquads.sort((a, b) => {
        return sortOrder === 1 
          ? a.avgEngagement - b.avgEngagement 
          : b.avgEngagement - a.avgEngagement;
      });
    }

    res.status(200).json({
      success: true,
      squads: enrichedSquads,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total,
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/squads/:id — get single squad detail
export const getSquadById = async (req, res, next) => {
  try {
    const squad = await Squad.findById(req.params.id)
      .populate("createdBy", "username")
      .lean();

    if (!squad) {
      return next(errorHandler(404, "Squad not found"));
    }

    // Get members
    const members = await SquadMember.find({ squad: squad._id })
      .populate("user", "username email niche")
      .sort({ engagementPercentage: -1 })
      .lean();

    // Avg engagement
    const avgEngagement =
      members.length > 0
        ? Math.round(
            (members.reduce((sum, m) => sum + m.engagementPercentage, 0) /
              members.length) *
              10
          ) / 10
        : 0;

    res.status(200).json({
      success: true,
      squad: {
        ...squad,
        avgEngagement,
        members,
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/squads/:id/join — join a squad
export const joinSquad = async (req, res, next) => {
  try {
    const squad = await Squad.findById(req.params.id);

    if (!squad) {
      return next(errorHandler(404, "Squad not found"));
    }

    if (squad.memberCount >= squad.maxMembers) {
      return next(errorHandler(400, "Squad is full"));
    }

    // Check if already a member
    const existing = await SquadMember.findOne({
      squad: squad._id,
      user: req.user.id,
    });

    if (existing) {
      return next(errorHandler(400, "You are already a member of this squad"));
    }

    // Create membership
    await SquadMember.create({
      squad: squad._id,
      user: req.user.id,
      role: "member",
      engagementPercentage: 100,
    });

    // Update member count and status
    squad.memberCount += 1;
    if (squad.memberCount >= squad.maxMembers) {
      squad.status = "Full";
    } else {
      squad.status = "Active";
    }
    await squad.save();

    res.status(200).json({
      success: true,
      message: "Successfully joined the squad!",
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/squads/:id/leave — leave a squad
export const leaveSquad = async (req, res, next) => {
  try {
    const squad = await Squad.findById(req.params.id);

    if (!squad) {
      return next(errorHandler(404, "Squad not found"));
    }

    const membership = await SquadMember.findOne({
      squad: squad._id,
      user: req.user.id,
    });

    if (!membership) {
      return next(errorHandler(400, "You are not a member of this squad"));
    }

    // Admin cannot leave if they are the only admin
    if (membership.role === "admin") {
      const adminCount = await SquadMember.countDocuments({
        squad: squad._id,
        role: "admin",
      });
      if (adminCount <= 1) {
        return next(
          errorHandler(400, "You are the only admin. Transfer admin role before leaving or delete the squad.")
        );
      }
    }

    await SquadMember.findByIdAndDelete(membership._id);

    // Update member count and status
    squad.memberCount = Math.max(0, squad.memberCount - 1);
    if (squad.memberCount < squad.maxMembers) {
      squad.status = "Active";
    }
    await squad.save();

    res.status(200).json({
      success: true,
      message: "Successfully left the squad",
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/squads/my/memberships — get squads the current user is in
export const getMySquads = async (req, res, next) => {
  try {
    const memberships = await SquadMember.find({ user: req.user.id })
      .populate({
        path: "squad",
        populate: { path: "createdBy", select: "username" },
      })
      .lean();

    // Enrich with squad stats
    const result = await Promise.all(
      memberships.map(async (m) => {
        if (!m.squad) return null;

        // Get avg engagement for the squad
        const agg = await SquadMember.aggregate([
          { $match: { squad: m.squad._id } },
          { $group: { _id: null, avgEngagement: { $avg: "$engagementPercentage" } } },
        ]);

        // Get total posts engaged by this user in this squad
        const postsEngaged = await Engagement.countDocuments({
          user: req.user.id,
          squad: m.squad._id,
          isValid: true,
        });

        // Get total posts in squad
        const totalPosts = await Post.countDocuments({ squad: m.squad._id });

        return {
          ...m,
          squadAvgEngagement: agg[0]?.avgEngagement ? Math.round(agg[0].avgEngagement * 10) / 10 : 0,
          postsEngaged,
          totalPosts,
        };
      })
    );

    res.status(200).json({
      success: true,
      memberships: result.filter(Boolean),
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/squads/:id — delete squad (admin only)
export const deleteSquad = async (req, res, next) => {
  try {
    const squad = await Squad.findById(req.params.id);

    if (!squad) {
      return next(errorHandler(404, "Squad not found"));
    }

    // Check if user is the squad admin
    const membership = await SquadMember.findOne({
      squad: squad._id,
      user: req.user.id,
      role: "admin",
    });

    if (!membership && !req.user.isUserAdmin) {
      return next(errorHandler(403, "Only squad admin can delete a squad"));
    }

    // Clean up all related data
    await SquadMember.deleteMany({ squad: squad._id });
    await Post.deleteMany({ squad: squad._id });
    await Engagement.deleteMany({ squad: squad._id });
    await Squad.findByIdAndDelete(squad._id);

    res.status(200).json({
      success: true,
      message: "Squad deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

