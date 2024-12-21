import { useState } from "react";
import { Box, Typography, Card, CardContent, CardHeader } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const FeatureBarChart = ({ data, onFeatureClick, loading }) => {
  const [error, setError] = useState(null);

  if (loading) {
    return (
      <Card sx={{ maxWidth: 600, margin: "auto", p: 2 }}>
        <CardContent>
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography>Loading chart data...</Typography>
          </Box>
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card sx={{ maxWidth: 600, margin: "auto", p: 2 }}>
        <CardContent>
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography color="error">
              No data found for the selected filters
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 600, margin: "auto", p: 2 }}>
      <CardHeader title="Feature Time Spent" />
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="feature" />
            <YAxis
              label={{
                value: "Time Spent",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="timeSpent"
              fill="#8884d8"
              onClick={(data) => onFeatureClick(data.feature)}
              cursor="pointer"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FeatureBarChart;
