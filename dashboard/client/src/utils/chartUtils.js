export const formatChartData = (data) => {
  if (!data || !Array.isArray(data)) return [];
  
  return data.map(item => ({
    feature: item.feature,
    timeSpent: Number(item.timeSpent)
  }));
};

export const formatTimelineData = (data) => {
  if (!data || !Array.isArray(data)) return [];
  
  return data.map(item => ({
    date: item.date,
    value: Number(item.value)
  }));
};