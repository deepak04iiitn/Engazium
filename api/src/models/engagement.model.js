import mongoose from "mongoose";

const engagementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    squad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Squad",
      required: true,
    },

    clickedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },

    validatedAt: {
      type: Date,
      default: null,
    },

    // Time spent in seconds (as reported + validated by backend)
    timeSpent: {
      type: Number,
      default: 0,
    },

    isValid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// One engagement per user per post
engagementSchema.index({ user: 1, post: 1 }, { unique: true });
engagementSchema.index({ squad: 1, user: 1, isValid: 1 });
engagementSchema.index({ post: 1, isValid: 1 });

const Engagement = mongoose.model("Engagement", engagementSchema);
export default Engagement;

