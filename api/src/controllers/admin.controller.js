import { errorHandler } from "../middlewares/errorHandler.js";
import User from "../models/user.model.js";
import Squad from "../models/squad.model.js";
import SquadMember from "../models/squadMember.model.js";
import Post from "../models/post.model.js";
import Engagement from "../models/engagement.model.js";
import AdminAuditLog from "../models/adminAuditLog.model.js";

const logAdminAction = async ({ adminId, action, squadId = null, targetUserId = null, details = {} }) => {
  try {
    await AdminAuditLog.create({
      admin: adminId,
      action,
      squad: squadId,
      targetUser: targetUserId,
      details,
    });
  } catch (error) {
    // Logging should never block the main action flow.
    console.error("Failed to write admin audit log:", error?.message || error);
  }
};

// GET /api/admin/users?search=&page=1&limit=10&status=
export const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";
    const sortField = req.query.sortField || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    // Build filter
    const filter = {};

    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { niche: { $regex: search, $options: "i" } },
      ];
    }

    const totalUsers = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      success: true,
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/users/:id
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).lean();

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admin/users/:id
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user.id) {
      return next(errorHandler(400, "You cannot delete your own account from admin panel"));
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/admin/users/:id/toggle-admin
export const toggleAdminStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Prevent toggling your own admin status
    if (user._id.toString() === req.user.id) {
      return next(errorHandler(400, "You cannot change your own admin status"));
    }

    user.isUserAdmin = !user.isUserAdmin;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User is now ${user.isUserAdmin ? "an admin" : "a regular user"}`,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/squads?search=&page=1&limit=10
export const getAllSquads = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";
    const status = req.query.status || "all";
    const plan = req.query.plan || "all";
    const niche = req.query.niche || "all";
    const sortField = req.query.sortField || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { niche: { $regex: search, $options: "i" } },
        { plan: { $regex: search, $options: "i" } },
      ];
    }
    if (status !== "all") {
      filter.status = status;
    }
    if (plan !== "all") {
      filter.plan = plan;
    }
    if (niche !== "all") {
      filter.niche = niche;
    }

    const totalSquads = await Squad.countDocuments(filter);
    const [activeSquads, fullSquads] = await Promise.all([
      Squad.countDocuments({ status: "Active" }),
      Squad.countDocuments({ status: "Full" }),
    ]);
    const squads = await Squad.find(filter)
      .populate("createdBy", "username email")
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalSquads / limit);

    res.status(200).json({
      success: true,
      squads,
      pagination: {
        currentPage: page,
        totalPages,
        totalSquads,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      stats: {
        activeSquads,
        fullSquads,
      },
      filters: {
        status,
        plan,
        niche,
      },
    });
  } catch (error) {
    next(error);
  }
};

const refreshSquadStats = async (squadId) => {
  const memberCount = await SquadMember.countDocuments({ squad: squadId });
  const squad = await Squad.findById(squadId);
  if (!squad) return null;

  squad.memberCount = memberCount;
  squad.status = memberCount >= squad.maxMembers ? "Full" : "Active";
  await squad.save();
  return squad;
};

// GET /api/admin/squads/:id
export const getSquadDetails = async (req, res, next) => {
  try {
    const memberPage = parseInt(req.query.memberPage) || 1;
    const memberLimit = parseInt(req.query.memberLimit) || 8;
    const memberSkip = (memberPage - 1) * memberLimit;
    const memberSearch = (req.query.memberSearch || "").trim();
    const memberRole = req.query.memberRole || "all";

    const blockedPage = parseInt(req.query.blockedPage) || 1;
    const blockedLimit = parseInt(req.query.blockedLimit) || 8;
    const blockedSkip = (blockedPage - 1) * blockedLimit;
    const blockedSearch = (req.query.blockedSearch || "").trim();

    const logsPage = parseInt(req.query.logsPage) || 1;
    const logsLimit = parseInt(req.query.logsLimit) || 8;
    const logsSkip = (logsPage - 1) * logsLimit;

    const squad = await Squad.findById(req.params.id).populate("createdBy", "username email").lean();

    if (!squad) {
      return next(errorHandler(404, "Squad not found"));
    }

    const memberFilter = { squad: squad._id };
    if (memberRole !== "all") {
      memberFilter.role = memberRole;
    }
    if (memberSearch) {
      const matchedUsers = await User.find(
        {
          $or: [
            { username: { $regex: memberSearch, $options: "i" } },
            { email: { $regex: memberSearch, $options: "i" } },
            { niche: { $regex: memberSearch, $options: "i" } },
          ],
        },
        { _id: 1 }
      ).lean();
      memberFilter.user = {
        $in: matchedUsers.length ? matchedUsers.map((u) => u._id) : [],
      };
    }

    const [
      allMembersCount,
      membersTotal,
      members,
      totalPosts,
      totalValidEngagements,
      avgEngagementAgg,
      recentAuditLogs,
      auditLogsTotal,
    ] = await Promise.all([
      SquadMember.countDocuments({ squad: squad._id }),
      SquadMember.countDocuments(memberFilter),
      SquadMember.find(memberFilter)
        .populate("user", "username email niche")
        .sort({ engagementPercentage: -1, joinedAt: 1 })
        .skip(memberSkip)
        .limit(memberLimit)
        .lean(),
      Post.countDocuments({ squad: squad._id }),
      Engagement.countDocuments({ squad: squad._id, isValid: true }),
      SquadMember.aggregate([
        { $match: { squad: squad._id } },
        { $group: { _id: null, avgEngagement: { $avg: "$engagementPercentage" } } },
      ]),
      AdminAuditLog.find({ squad: squad._id })
        .populate("admin", "username email")
        .populate("targetUser", "username email")
        .sort({ createdAt: -1 })
        .skip(logsSkip)
        .limit(logsLimit)
        .lean(),
      AdminAuditLog.countDocuments({ squad: squad._id }),
    ]);

    const visibleUserIds = members.map((member) => member.user?._id).filter(Boolean);
    const engagementByUserAgg = visibleUserIds.length
      ? await Engagement.aggregate([
          { $match: { squad: squad._id, isValid: true, user: { $in: visibleUserIds } } },
          { $group: { _id: "$user", count: { $sum: 1 } } },
        ])
      : [];

    const engagementByUser = {};
    engagementByUserAgg.forEach((item) => {
      engagementByUser[item._id.toString()] = item.count;
    });

    const memberPerformance = members.map((member) => {
      const userId = member.user?._id?.toString();
      const engagedPosts = userId ? engagementByUser[userId] || 0 : 0;
      const engagementRate = totalPosts > 0 ? Math.round((engagedPosts / totalPosts) * 1000) / 10 : 0;

      return {
        _id: member._id,
        role: member.role,
        joinedAt: member.joinedAt,
        engagementPercentage: member.engagementPercentage,
        lowEngagementSince: member.lowEngagementSince,
        warningNotified: member.warningNotified,
        rulesAccepted: member.rulesAccepted,
        user: member.user,
        engagedPosts,
        totalPosts,
        engagementRate,
      };
    });

    const blockedUserFilter = {
      _id: { $in: squad.blockedUsers || [] },
    };
    if (blockedSearch) {
      blockedUserFilter.$or = [
        { username: { $regex: blockedSearch, $options: "i" } },
        { email: { $regex: blockedSearch, $options: "i" } },
        { niche: { $regex: blockedSearch, $options: "i" } },
      ];
    }
    const [totalBlockedUsers, blockedUsers] = await Promise.all([
      User.countDocuments(blockedUserFilter),
      User.find(blockedUserFilter)
        .select("username email niche createdAt")
        .sort({ createdAt: -1 })
        .skip(blockedSkip)
        .limit(blockedLimit)
        .lean(),
    ]);

    const avgEngagement = avgEngagementAgg[0]?.avgEngagement
      ? Math.round(avgEngagementAgg[0].avgEngagement * 10) / 10
      : 0;

    const totalPossibleEngagements = totalPosts * Math.max(allMembersCount, 1);
    const squadEngagementRate =
      totalPosts > 0 && allMembersCount > 0
        ? Math.round((totalValidEngagements / totalPossibleEngagements) * 1000) / 10
        : 0;

    res.status(200).json({
      success: true,
      squad: {
        ...squad,
        avgEngagement,
      },
      metrics: {
        totalMembers: allMembersCount,
        totalPosts,
        totalValidEngagements,
        squadEngagementRate,
        blockedUsersCount: totalBlockedUsers,
      },
      members: memberPerformance,
      memberPagination: {
        currentPage: memberPage,
        totalPages: Math.ceil(membersTotal / memberLimit) || 1,
        totalMembers: membersTotal,
        limit: memberLimit,
        hasNextPage: memberPage < Math.ceil(membersTotal / memberLimit),
        hasPrevPage: memberPage > 1,
      },
      blockedUsers,
      blockedPagination: {
        currentPage: blockedPage,
        totalPages: Math.ceil(totalBlockedUsers / blockedLimit) || 1,
        totalBlockedUsers,
        limit: blockedLimit,
        hasNextPage: blockedPage < Math.ceil(totalBlockedUsers / blockedLimit),
        hasPrevPage: blockedPage > 1,
      },
      auditLogs: recentAuditLogs,
      auditLogsPagination: {
        currentPage: logsPage,
        totalPages: Math.ceil(auditLogsTotal / logsLimit) || 1,
        totalLogs: auditLogsTotal,
        limit: logsLimit,
        hasNextPage: logsPage < Math.ceil(auditLogsTotal / logsLimit),
        hasPrevPage: logsPage > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admin/squads/:id
export const deleteSquadAsAdmin = async (req, res, next) => {
  try {
    const squad = await Squad.findById(req.params.id);
    if (!squad) {
      return next(errorHandler(404, "Squad not found"));
    }

    await logAdminAction({
      adminId: req.user.id,
      action: "SQUAD_DELETE",
      squadId: squad._id,
      details: {
        squadName: squad.name,
        totalMembers: squad.memberCount,
      },
    });

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

// DELETE /api/admin/squads/:id/members/:userId
export const removeSquadMemberAsAdmin = async (req, res, next) => {
  try {
    const { id: squadId, userId } = req.params;
    const squad = await Squad.findById(squadId);
    if (!squad) {
      return next(errorHandler(404, "Squad not found"));
    }

    const membership = await SquadMember.findOne({ squad: squadId, user: userId });
    if (!membership) {
      return next(errorHandler(404, "Member not found in this squad"));
    }

    await logAdminAction({
      adminId: req.user.id,
      action: "SQUAD_MEMBER_REMOVE",
      squadId,
      targetUserId: userId,
      details: {
        previousRole: membership.role,
      },
    });

    await SquadMember.deleteOne({ _id: membership._id });
    await refreshSquadStats(squadId);

    res.status(200).json({
      success: true,
      message: "Member removed from squad",
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/admin/squads/:id/members/:userId/block
// body: { block: boolean }
export const setSquadUserBlockStatus = async (req, res, next) => {
  try {
    const { id: squadId, userId } = req.params;
    const { block = true } = req.body || {};

    const squad = await Squad.findById(squadId);
    if (!squad) {
      return next(errorHandler(404, "Squad not found"));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    if (block) {
      await Squad.findByIdAndUpdate(squadId, { $addToSet: { blockedUsers: userId } });
      await SquadMember.deleteOne({ squad: squadId, user: userId });
      await refreshSquadStats(squadId);
      await logAdminAction({
        adminId: req.user.id,
        action: "SQUAD_MEMBER_BLOCK",
        squadId,
        targetUserId: userId,
      });
      return res.status(200).json({
        success: true,
        message: "User blocked from this squad",
      });
    }

    await Squad.findByIdAndUpdate(squadId, { $pull: { blockedUsers: userId } });
    await logAdminAction({
      adminId: req.user.id,
      action: "SQUAD_MEMBER_UNBLOCK",
      squadId,
      targetUserId: userId,
    });
    res.status(200).json({
      success: true,
      message: "User unblocked for this squad",
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/admin/squads/:id/transfer-ownership
// body: { newOwnerId: string }
export const transferSquadOwnership = async (req, res, next) => {
  try {
    const { id: squadId } = req.params;
    const { newOwnerId } = req.body || {};

    if (!newOwnerId) {
      return next(errorHandler(400, "newOwnerId is required"));
    }

    const squad = await Squad.findById(squadId);
    if (!squad) {
      return next(errorHandler(404, "Squad not found"));
    }

    if (squad.createdBy.toString() === newOwnerId) {
      return next(errorHandler(400, "Selected user is already the squad owner"));
    }

    const [newOwner, newOwnerMembership, oldOwnerMembership] = await Promise.all([
      User.findById(newOwnerId),
      SquadMember.findOne({ squad: squadId, user: newOwnerId }),
      SquadMember.findOne({ squad: squadId, user: squad.createdBy }),
    ]);

    if (!newOwner) {
      return next(errorHandler(404, "New owner user not found"));
    }

    if (!newOwnerMembership) {
      return next(errorHandler(400, "New owner must be a current squad member"));
    }

    newOwnerMembership.role = "admin";
    await newOwnerMembership.save();

    if (oldOwnerMembership) {
      oldOwnerMembership.role = "member";
      await oldOwnerMembership.save();
    }

    const previousOwnerId = squad.createdBy.toString();
    squad.createdBy = newOwnerId;
    await squad.save();

    await logAdminAction({
      adminId: req.user.id,
      action: "SQUAD_TRANSFER_OWNERSHIP",
      squadId,
      targetUserId: newOwnerId,
      details: {
        previousOwnerId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Squad ownership transferred successfully",
    });
  } catch (error) {
    next(error);
  }
};

