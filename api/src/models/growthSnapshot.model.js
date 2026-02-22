import mongoose from "mongoose";

const growthSnapshotSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    platform: {
      type: String,
      required: true,
      enum: [
        "Instagram",
        "YouTube",
        "TikTok",
        "Facebook",
        "X",
        "LinkedIn",
        "Twitch",
        "Snapchat",
        "Other",
      ],
    },

    // Monday of the week this snapshot represents
    weekStart: {
      type: Date,
      required: true,
    },

    followers: {
      type: Number,
      default: 0,
      min: 0,
    },

    avgLikes: {
      type: Number,
      default: 0,
      min: 0,
    },

    avgComments: {
      type: Number,
      default: 0,
      min: 0,
    },

    avgReach: {
      type: Number,
      default: 0,
      min: 0,
    },

    // True if this is the initial snapshot captured when user joined / first set up profile
    isBaseline: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// One snapshot per user per platform per week
growthSnapshotSchema.index(
  { user: 1, platform: 1, weekStart: 1 },
  { unique: true }
);
growthSnapshotSchema.index({ user: 1, platform: 1, createdAt: 1 });
growthSnapshotSchema.index({ isBaseline: 1, user: 1 });

const GrowthSnapshot = mongoose.model("GrowthSnapshot", growthSnapshotSchema);
export default GrowthSnapshot;

