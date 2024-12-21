import { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

import Header from "./layout/Header";
import FilterContainer from "./filters/FilterContainer";
import ChartContainer from "./charts/ChartContainer";
import FeatureBarChart from "./charts/BarChart";
import TimeLineChart from "./charts/LineChart";
import PreferencesManager from "./preferences/PreferencesManager";

import { useAuth } from "../hooks/useAuth";
import { getFeatureData, getTimelineData } from "../services/api";
import { formatChartData, formatTimelineData } from "../utils/chartUtils";
import { getPreferences } from "../utils/cookieManager";
import { parseUrlParams } from "../utils/urlUtils";

const DEFAULT_PREFERENCES = {
  startDate: dayjs().subtract(7, "day"),
  endDate: dayjs(),
  ageRange: "15-25",
  gender: "male",
};

function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { logout } = useAuth();
  const [searchParams] = useSearchParams();

  const [preferences, setPreferences] = useState(() => {
    // First check URL params, then cookies, then default
    const urlPreferences = parseUrlParams(searchParams);
    const savedPrefs = getPreferences();
    return urlPreferences || savedPrefs || DEFAULT_PREFERENCES;
  });

  const [selectedFeature, setSelectedFeature] = useState(null);
  const [barData, setBarData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeatureData = async (filters) => {
    try {
      setLoading(true);
      const { data } = await getFeatureData({
        startDate: filters.startDate.format("DD-MM-YYYY"),
        endDate: filters.endDate.format("DD-MM-YYYY"),
        ageRange: filters.ageRange,
        gender: filters.gender,
      });
      setBarData(formatChartData(data));
    } catch (error) {
      console.error("Error fetching feature data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTimelineData = async () => {
    if (!selectedFeature) return;

    try {
      const { data } = await getTimelineData(selectedFeature, {
        startDate: preferences.startDate.format("YYYY-MM-DD"),
        endDate: preferences.endDate.format("YYYY-MM-DD"),
        ageRange: preferences.ageRange,
        gender: preferences.gender,
      });
      setTimelineData(formatTimelineData(data));
    } catch (error) {
      console.error("Error fetching timeline data:", error);
    }
  };

  useEffect(() => {
    if (selectedFeature) {
      fetchTimelineData();
    }
  }, [selectedFeature]);

  const handleApplyFilters = (newFilters) => {
    fetchFeatureData(newFilters);
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Header onLogout={logout} />

      <PreferencesManager
        preferences={preferences}
        onReset={() => {
          setPreferences(DEFAULT_PREFERENCES);
          fetchFeatureData(DEFAULT_PREFERENCES);
        }}
      />

      <FilterContainer
        preferences={preferences}
        onPreferencesChange={setPreferences}
        onApplyFilters={handleApplyFilters}
      />

      <Box className="charts-container">
        <ChartContainer title="Feature Usage Overview">
          <FeatureBarChart
            data={barData}
            onFeatureClick={setSelectedFeature}
            loading={loading}
          />
        </ChartContainer>

        {selectedFeature && (
          <ChartContainer title={`${selectedFeature} Usage Timeline`}>
            <TimeLineChart data={timelineData} />
          </ChartContainer>
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
