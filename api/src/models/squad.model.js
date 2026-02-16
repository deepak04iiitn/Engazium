import mongoose from "mongoose";

const squadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 60,
    },

    plan: {
      type: String,
      required: true,
      enum: ["Growth", "Pro", "Momentum"],
    },

    niche: {
      type: String,
      required: true,
      enum: [
        "Art & Creativity",
        "Technology",
        "Gaming",
        "Education",
        "Business & Finance",
        "Health & Fitness",
        "Lifestyle",
        "Fashion & Beauty",
        "Food & Cooking",
        "Travel",
        "Self Improvement",
        "Entertainment",
        "Music",
        "Photography & Videography",
        "Podcasting",
        "News & Commentary",
        "DIY & Crafts",
        "Sports",
        "Science",
        "Pets & Animals",
        "Nature & Environment",
        "Spirituality",
        "Parenting & Family",
        "Vlogs",
        "Automotive",
        "Real Estate",
        "Politics",
        "Non Profit & Social Impact",
        "Other",
      ],
    },

    platform: {
      type: String,
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
      default: null,
    },

    maxMembers: {
      type: Number,
      required: true,
      min: 5,
      max: 30,
      default: 10,
    },

    memberCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Full"],
      default: "Active",
    },

    description: {
      type: String,
      default: "",
      maxlength: 300,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    nicheSlug: {
      type: String,
      index: true,
    },
  },
  { timestamps: true }
);

// Virtual to get posts-per-day limit based on plan
squadSchema.virtual("postsPerDay").get(function () {
  const limits = { Growth: 1, Pro: 2, Momentum: 3 };
  return limits[this.plan] || 1;
});

squadSchema.set("toJSON", { virtuals: true });
squadSchema.set("toObject", { virtuals: true });

const Squad = mongoose.model("Squad", squadSchema);
export default Squad;

