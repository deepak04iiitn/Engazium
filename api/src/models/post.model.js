import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    squad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Squad",
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    link: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional short description of the link
    caption: {
      type: String,
      default: "",
      maxlength: 280,
    },

    engagementCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

postSchema.index({ squad: 1, createdAt: -1 });
postSchema.index({ author: 1, createdAt: -1 });
// TTL index: auto-delete posts after 15 days
postSchema.index({ createdAt: 1 }, { expireAfterSeconds: 15 * 24 * 60 * 60 });

const Post = mongoose.model("Post", postSchema);
export default Post;

