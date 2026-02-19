import { errorHandler } from "../middlewares/errorHandler.js";
import Testimonial from "../models/testimonial.model.js";

// POST /api/testimonials — submit a testimonial (authenticated user)
export const createTestimonial = async (req, res, next) => {
  try {
    const { name, handle, niche, quote, rating, metric } = req.body;

    if (!name || !niche || !quote) {
      return next(errorHandler(400, "Name, niche, and quote are required"));
    }

    if (rating && (rating < 1 || rating > 5)) {
      return next(errorHandler(400, "Rating must be between 1 and 5"));
    }

    // Check if user already submitted a testimonial
    const existing = await Testimonial.findOne({ user: req.user.id });
    if (existing) {
      return next(errorHandler(400, "You have already submitted a testimonial. You can edit or delete it instead."));
    }

    const testimonial = await Testimonial.create({
      user: req.user.id,
      name: name.trim(),
      handle: handle?.trim() || "",
      niche: niche.trim(),
      quote: quote.trim(),
      rating: rating || 5,
      metric: metric?.trim() || "",
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Testimonial submitted! It will appear on the site once approved.",
      testimonial,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/testimonials — get all approved testimonials (public)
export const getApprovedTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .select("-user")
      .lean();

    res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/testimonials/mine — get the current user's testimonial
export const getMyTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findOne({ user: req.user.id }).lean();

    res.status(200).json({
      success: true,
      testimonial, // null if none exists
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/testimonials/mine — update own testimonial
export const updateMyTestimonial = async (req, res, next) => {
  try {
    const { name, handle, niche, quote, rating, metric } = req.body;

    const testimonial = await Testimonial.findOne({ user: req.user.id });
    if (!testimonial) {
      return next(errorHandler(404, "You haven't submitted a testimonial yet"));
    }

    if (name) testimonial.name = name.trim();
    if (handle !== undefined) testimonial.handle = handle.trim();
    if (niche) testimonial.niche = niche.trim();
    if (quote) testimonial.quote = quote.trim();
    if (rating) {
      if (rating < 1 || rating > 5) {
        return next(errorHandler(400, "Rating must be between 1 and 5"));
      }
      testimonial.rating = rating;
    }
    if (metric !== undefined) testimonial.metric = metric.trim();

    // Re-submit for approval on edit
    testimonial.status = "pending";

    await testimonial.save();

    res.status(200).json({
      success: true,
      message: "Testimonial updated! It will be re-reviewed before appearing on the site.",
      testimonial,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/testimonials/mine — delete own testimonial
export const deleteMyTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findOneAndDelete({ user: req.user.id });
    if (!testimonial) {
      return next(errorHandler(404, "No testimonial found to delete"));
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ═══════ Admin endpoints ═══════

// GET /api/testimonials/admin/all — get all testimonials (admin)
export const getAllTestimonials = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status || "";
    const search = req.query.search || "";

    const filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { niche: { $regex: search, $options: "i" } },
        { quote: { $regex: search, $options: "i" } },
        { handle: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Testimonial.countDocuments(filter);
    const testimonials = await Testimonial.find(filter)
      .populate("user", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      testimonials,
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

// PATCH /api/testimonials/admin/:id/status — approve or reject (admin)
export const updateTestimonialStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return next(errorHandler(400, "Status must be 'approved' or 'rejected'"));
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!testimonial) {
      return next(errorHandler(404, "Testimonial not found"));
    }

    res.status(200).json({
      success: true,
      message: `Testimonial ${status}`,
      testimonial,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/testimonials/admin/:id — delete any testimonial (admin)
export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return next(errorHandler(404, "Testimonial not found"));
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted",
    });
  } catch (error) {
    next(error);
  }
};

