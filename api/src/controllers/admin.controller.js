import { errorHandler } from "../middlewares/errorHandler.js";
import User from "../models/user.model.js";

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

