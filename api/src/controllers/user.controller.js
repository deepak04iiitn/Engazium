import { errorHandler } from "../middlewares/errorHandler.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

// GET /api/user/profile — get logged-in user's profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).lean();

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

// PUT /api/user/profile — update logged-in user's profile
export const updateProfile = async (req, res, next) => {
  try {
    const { username, email, bio, niche, platformStats } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // If changing username, check uniqueness
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return next(errorHandler(400, "Username is already taken"));
      }
      if (username.trim().length < 3) {
        return next(errorHandler(400, "Username must be at least 3 characters"));
      }
      user.username = username.trim();
    }

    // If changing email, check uniqueness
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email: email.toLowerCase() });
      if (existingEmail) {
        return next(errorHandler(400, "Email is already taken"));
      }
      user.email = email.toLowerCase().trim();
    }

    // Update optional fields
    if (bio !== undefined) user.bio = bio;
    if (niche !== undefined) user.niche = niche;

    // Update per-platform stats
    if (platformStats !== undefined) {
      user.platformStats = platformStats.map((ps) => ({
        platform: ps.platform,
        numberOfFollowers: Number(ps.numberOfFollowers) || 0,
        avgLikes: Number(ps.avgLikes) || 0,
        avgComments: Number(ps.avgComments) || 0,
      }));
    }

    await user.save();

    // Return user without password
    const updatedUser = await User.findById(req.user.id).lean();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/user/change-password
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return next(errorHandler(400, "Both current and new password are required"));
    }

    if (newPassword.length < 8) {
      return next(errorHandler(400, "New password must be at least 8 characters"));
    }

    if (currentPassword === newPassword) {
      return next(errorHandler(400, "New password must be different from current password"));
    }

    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const isMatch = bcryptjs.compareSync(currentPassword, user.password);
    if (!isMatch) {
      return next(errorHandler(400, "Current password is incorrect"));
    }

    user.password = bcryptjs.hashSync(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/user/delete-account
export const deleteAccount = async (req, res, next) => {
  try {
    const { password } = req.body;

    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Require password confirmation for account deletion
    if (!password) {
      return next(errorHandler(400, "Password is required to delete your account"));
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return next(errorHandler(400, "Incorrect password"));
    }

    await User.findByIdAndDelete(req.user.id);

    res.clearCookie("access_token")
      .status(200)
      .json({
        success: true,
        message: "Account deleted successfully",
      });
  } catch (error) {
    next(error);
  }
};

