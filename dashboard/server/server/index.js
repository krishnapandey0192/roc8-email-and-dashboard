import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import analyticsRoutes from "./routes/analytics.js";
import axios from "axios";
import AnalyticsData from "./models/AnalyticsData.js";
import { parse, isValid } from "date-fns";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Fetch and Save Data from Google Sheets
    fetchAndSaveGoogleSheetData();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Fetch Data from Google Sheets and Transform
async function fetchGoogleSheetData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/values/${process.env.SHEET_NAME}?key=${process.env.GOOGLE_API_KEY}`;
  try {
    const response = await axios.get(url);
    const rows = response.data.values;

    // Transform the data
    const headers = rows[0];
    return rows.slice(1).map((row) => {
      const rowObject = {};
      headers.forEach((header, index) => {
        rowObject[header] = row[index];
      });

      let parsedDate = parse(rowObject.Day.trim(), "dd/MM/yyyy", new Date());
      if (!isValid(parsedDate)) {
        console.error(
          `Invalid date format: ${rowObject.Day}, skipping record.`
        );
        return null; // Skip invalid records
      }
      console.log(parsedDate, "date");
      // Return transformed data
      return {
        day: parsedDate, // Ensures ISODate format
        ageGroup: rowObject.Age.trim(),
        gender: rowObject.Gender.trim(),
        values: {
          A: parseInt(rowObject.A, 10),
          B: parseInt(rowObject.B, 10),
          C: parseInt(rowObject.C, 10),
          D: parseInt(rowObject.D, 10),
          E: parseInt(rowObject.E, 10),
          F: parseInt(rowObject.F, 10),
        },
      };
    });
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error.message);
    return [];
  }
}

// Function to Fetch and Save Data
async function fetchAndSaveGoogleSheetData() {
  try {
    console.log("Fetching data from Google Sheets...");
    const data = await fetchGoogleSheetData();

    // Save data to MongoDB
    if (data.length > 0) {
      await AnalyticsData.deleteMany(); // Clear existing data
      const savedData = await AnalyticsData.insertMany(data);
      console.log("Data saved successfully:", savedData.length, "records.");
    } else {
      console.log("No data found in the Google Sheet.");
    }
  } catch (error) {
    console.error("Error fetching and saving data:", error.message);
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
