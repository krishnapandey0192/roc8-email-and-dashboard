import express from "express";
import {
  getFeatureAnalytics,
  getTimelineAnalytics,
} from "../controllers/analyticsController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/features", getFeatureAnalytics);
router.get("/timeline/:feature", getTimelineAnalytics);

export default router;
