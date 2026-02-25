import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["bug", "feature", "contact"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ["pending", "resolved", "implemented"],
      default: "pending",
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    contactName: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 160,
      default: "",
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

feedbackSchema.index({ status: 1, createdAt: -1 });
feedbackSchema.index({ type: 1, createdAt: -1 });
feedbackSchema.index({ reportedBy: 1, createdAt: -1 });

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;

