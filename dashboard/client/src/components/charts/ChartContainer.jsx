import { Box } from '@mui/material';

const ChartContainer = ({ title, children }) => {
  return (
    <Box className="chart-section">
      <h2>{title}</h2>
      {children}
    </Box>
  );
};

export default ChartContainer;