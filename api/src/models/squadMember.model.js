import mongoose from "mongoose";

const squadMemberSchema = new mongoose.Schema(
  {
    squad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Squad",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },

    engagementPercentage: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },

    // Tracks when engagement first dropped below 30%
    lowEngagementSince: {
      type: Date,
      default: null,
    },

    // Whether user has been notified about low engagement
    warningNotified: {
      type: Boolean,
      default: false,
    },

    // Whether user has accepted the squad rules before first post
    rulesAccepted: {
      type: Boolean,
      default: false,
    },

    rulesAcceptedAt: {
      type: Date,
      default: null,
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index: one membership per user per squad
squadMemberSchema.index({ squad: 1, user: 1 }, { unique: true });
squadMemberSchema.index({ user: 1 });
squadMemberSchema.index({ squad: 1, engagementPercentage: 1 });

const SquadMember = mongoose.model("SquadMember", squadMemberSchema);
export default SquadMember;

