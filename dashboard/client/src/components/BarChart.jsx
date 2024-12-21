import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const FeatureBarChart = ({ data, onFeatureClick }) => {
  return (
    <BarChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="feature" />
      <YAxis label={{ value: 'Time Spent (hours)', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend />
      <Bar dataKey="timeSpent" fill="#8884d8" onClick={(data) => onFeatureClick(data.feature)} />
    </BarChart>
  );
};

export default FeatureBarChart;