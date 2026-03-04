import mongoose from "mongoose";

const adminAuditLogSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    squad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Squad",
      default: null,
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    action: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

adminAuditLogSchema.index({ squad: 1, createdAt: -1 });
adminAuditLogSchema.index({ admin: 1, createdAt: -1 });
adminAuditLogSchema.index({ action: 1, createdAt: -1 });

const AdminAuditLog = mongoose.model("AdminAuditLog", adminAuditLogSchema);
export default AdminAuditLog;


