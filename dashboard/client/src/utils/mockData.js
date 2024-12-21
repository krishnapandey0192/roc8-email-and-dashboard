export const generateMockData = (startDate, endDate, ageRange, gender) => {
  const features = ['Feature A', 'Feature B', 'Feature C', 'Feature D'];
  return features.map(feature => ({
    feature,
    timeSpent: Math.floor(Math.random() * 100) + 20
  }));
};

export const generateTimelineData = (feature, startDate, endDate) => {
  const days = [];
  let current = startDate;
  while (current.isBefore(endDate) || current.isSame(endDate)) {
    days.push({
      date: current.format('YYYY-MM-DD'),
      value: Math.floor(Math.random() * 50) + 10
    });
    current = current.add(1, 'day');
  }
  return days;
};