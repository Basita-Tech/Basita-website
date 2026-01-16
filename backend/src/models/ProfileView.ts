import mongoose from "mongoose";

export interface IProfileView extends mongoose.Document {
  viewer: mongoose.Types.ObjectId;
  candidate: mongoose.Types.ObjectId;
  viewedAt: Date;
  weekStartDate: Date;
  weekNumber: number;
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
      type: Date,
      required: true
    },
    weekNumber: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

ProfileViewSchema.index(
  { viewer: 1, candidate: 1, weekStartDate: 1 },
  { unique: true }
);

ProfileViewSchema.index({ candidate: 1, weekStartDate: -1 });

ProfileViewSchema.index(
  { weekStartDate: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 7 }
);

export const ProfileView =
  (mongoose.models.ProfileView as mongoose.Model<IProfileView>) ||
  mongoose.model<IProfileView>("ProfileView", ProfileViewSchema);
