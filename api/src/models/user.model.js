import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      select: false 
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    isUserAdmin: {
      type: Boolean,
      default: false
    },

    niche: {
      type: String,
      default: "Other",
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
        "Other"
      ]
    },

    platformStats: {
      type: [
        {
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
              "Other"
            ]
          },
          numberOfFollowers: {
            type: Number,
            default: 0,
            min: 0
          },
          avgLikes: {
            type: Number,
            default: 0,
            min: 0
          },
          avgComments: {
            type: Number,
            default: 0,
            min: 0
          }
        }
      ],
      default: []
    },

    bio: {
      type: String,
      default: "",
      maxlength: 300
    }
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);
export default User;
