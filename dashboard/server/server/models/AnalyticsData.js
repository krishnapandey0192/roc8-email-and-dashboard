import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    day: { type: Date, required: true },
    ageGroup: { type: String, required: true },
    gender: { type: String, required: true },
    values: {
      B: { type: Number, required: true, default: 0 },
      C: { type: Number, required: true, default: 0 },
      D: { type: Number, required: true, default: 0 },
      A: { type: Number, required: true, default: 0 },
      E: { type: Number, required: true, default: 0 },
      F: { type: Number, required: true, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("AnalyticsData", analyticsSchema);
