import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    handle: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "",
    },

    niche: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },

    quote: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },

    metric: {
      type: String,
      trim: true,
      maxlength: 30,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// One testimonial per user
testimonialSchema.index({ user: 1 }, { unique: true });

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;

