import { errorHandler } from "../middlewares/errorHandler.js";
import Feedback from "../models/feedback.model.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createFeedback = async (req, res, next) => {
  try {
    const { type, title, description } = req.body;

    if (!type || !["bug", "feature"].includes(type)) {
      return next(errorHandler(400, "Type must be either 'bug' or 'feature'"));
    }

    if (!title || title.trim().length < 5) {
      return next(errorHandler(400, "Title must be at least 5 characters"));
    }

    if (!description || description.trim().length < 10) {
      return next(errorHandler(400, "Description must be at least 10 characters"));
    }

    const feedback = await Feedback.create({
      type,
      title: title.trim(),
      description: description.trim(),
      reportedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Thanks! Your submission has been received.",
      feedback,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || name.trim().length < 2) {
      return next(errorHandler(400, "Name must be at least 2 characters"));
    }

    if (!email || !EMAIL_REGEX.test(email.trim())) {
      return next(errorHandler(400, "Please provide a valid email"));
    }

    if (!subject || subject.trim().length < 3) {
      return next(errorHandler(400, "Subject must be at least 3 characters"));
    }

    if (!message || message.trim().length < 10) {
      return next(errorHandler(400, "Message must be at least 10 characters"));
    }

    const feedback = await Feedback.create({
      type: "contact",
      title: subject.trim(),
      description: message.trim(),
      reportedBy: null,
      contactName: name.trim(),
      contactEmail: email.trim().toLowerCase(),
    });

    res.status(201).json({
      success: true,
      message: "Thanks! Your message has been sent successfully.",
      feedback,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminFeedback = async (req, res, next) => {
  try {
    const status = req.query.status || "pending";
    const type = req.query.type || "";
    const search = req.query.search || "";
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const skip = (page - 1) * limit;

    const filter = {};
    if (status && status !== "all") {
      filter.status = status;
    }
    if (type && type !== "all") {
      filter.type = type;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Feedback.countDocuments(filter);
    const feedbackItems = await Feedback.find(filter)
      .populate("reportedBy", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const pendingCount = await Feedback.countDocuments({ status: "pending" });
    const bugCount = await Feedback.countDocuments({ type: "bug" });
    const featureCount = await Feedback.countDocuments({ type: "feature" });
    const contactCount = await Feedback.countDocuments({ type: "contact" });

    res.status(200).json({
      success: true,
      feedback: feedbackItems,
      pagination: {
        currentPage: page,
        totalPages: Math.max(1, Math.ceil(total / limit)),
        totalItems: total,
        limit,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
      stats: {
        pendingCount,
        bugCount,
        featureCount,
        contactCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateFeedbackStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const item = await Feedback.findById(req.params.id);

    if (!item) {
      return next(errorHandler(404, "Feedback item not found"));
    }

    const validStatuses =
      item.type === "feature"
        ? ["pending", "implemented"]
        : ["pending", "resolved"];
    if (!status || !validStatuses.includes(status)) {
      const allowedLabel =
        item.type === "feature"
          ? "pending, implemented"
          : "pending, resolved";
      return next(errorHandler(400, `Invalid status for ${item.type}. Allowed: ${allowedLabel}`));
    }

    item.status = status;
    item.resolvedAt = status === "pending" ? null : new Date();
    await item.save();

    const populated = await item.populate("reportedBy", "username email");

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      feedback: populated,
    });
  } catch (error) {
    next(error);
  }
};

