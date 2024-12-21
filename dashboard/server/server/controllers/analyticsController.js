import AnalyticsData from "../models/AnalyticsData.js";
import { parse, isValid, startOfDay, endOfDay } from "date-fns";

export const getFeatureAnalytics = async (req, res) => {
  try {
    const { startDate, endDate, ageRange, gender } = req.query;

    // Parse startDate and endDate from dd-MM-yyyy format
    const parsedStartDate = parse(startDate, "dd-MM-yyyy", new Date());
    const parsedEndDate = parse(endDate, "dd-MM-yyyy", new Date());

    console.log(
      parsedStartDate,
      parsedEndDate,
      "parsedStartDate, parsedEndDate"
    );

    // Validate parsed dates
    if (!isValid(parsedStartDate) || !isValid(parsedEndDate)) {
      return res.status(400).json({
        message: "Invalid startDate or endDate format. Use dd-MM-yyyy.",
      });
    }

    // Normalize both start and end dates to the beginning and end of the day respectively
    const startOfDayParsed = startOfDay(parsedStartDate); // Set to 00:00:00 of the given date
    const endOfDayParsed = endOfDay(parsedEndDate); // Set to 23:59:59 of the given date
    console.log("startOfDay", startOfDayParsed, "endOfDay", endOfDayParsed);
    const query = {
      day: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    };

    if (ageRange) query.ageGroup = ageRange.trim();
    if (gender) query.gender = gender.trim();

    console.log(query, "query");

    const data = await AnalyticsData.find(query).sort("day");
    console.log(data, "data");

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "No data found for the selected filters",
      });
    }

    // Transform data for bar chart
    const features = ["A", "B", "C", "D", "E", "F"];
    const chartData = features.map((feature) => ({
      feature,
      timeSpent: data.reduce(
        (sum, record) => sum + (record.values[feature] || 0),
        0
      ),
    }));

    res.json(chartData);
  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ message: "Error fetching analytics data" });
  }
};

export const getTimelineAnalytics = async (req, res) => {
  try {
    const { feature } = req.params;
    const { startDate, endDate, ageRange, gender } = req.query;

    // Convert startDate and endDate to ISODate
    const startOfDay = new Date(`${startDate}T00:00:00.000Z`);
    const endOfDay = new Date(`${endDate}T23:59:59.999Z`);

    const query = {
      day: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    };

    if (ageRange) query.ageGroup = ageRange;
    if (gender) query.gender = gender;

    const data = await AnalyticsData.find(query).sort("day");

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "No timeline data found for the selected filters",
      });
    }

    // Transform data for timeline chart
    const timelineData = data.map((record) => ({
      date: record.day.toISOString().split("T")[0], // Extract only the date part
      value: record.values[feature] || 0,
    }));

    res.json(timelineData);
  } catch (error) {
    console.error("Timeline Error:", error);
    res.status(500).json({ message: "Error fetching timeline data" });
  }
};
