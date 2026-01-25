import mongoose from "mongoose";

export interface IProfileView extends mongoose.Document {
  viewer: mongoose.Types.ObjectId;
  candidate: mongoose.Types.ObjectId;
  viewedAt: Date;
  weekStartDate?: Date;
  weekNumber?: number;
}

const ProfileViewSchema = new mongoose.Schema(
  {
    viewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    viewedAt: {
      type: Date,
      default: Date.now
    },
    weekStartDate: {
      type: Date
      // Not required anymore - only set on first insert
    },
    weekNumber: {
      type: Number
      // Not required anymore - only set on first insert
    }
  },
  { timestamps: true }
);

// One record per viewer-candidate pair (stores their latest view)
ProfileViewSchema.index({ viewer: 1, candidate: 1 }, { unique: true });

// For querying who viewed a specific candidate, sorted by most recent
ProfileViewSchema.index({ candidate: 1, viewedAt: -1 });

// TTL index: auto-expire profile views after 90 days
ProfileViewSchema.index(
  { viewedAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 90 }
);

export const ProfileView =
  (mongoose.models.ProfileView as mongoose.Model<IProfileView>) ||
  mongoose.model<IProfileView>("ProfileView", ProfileViewSchema);
