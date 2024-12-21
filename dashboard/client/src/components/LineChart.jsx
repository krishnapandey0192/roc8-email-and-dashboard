import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea } from 'recharts';
import { useState } from 'react';

const TimeLineChart = ({ data }) => {
  const [refAreaLeft, setRefAreaLeft] = useState('');
  const [refAreaRight, setRefAreaRight] = useState('');
  const [left, setLeft] = useState('dataMin');
  const [right, setRight] = useState('dataMax');
  const [top, setTop] = useState('dataMax+1');
  const [bottom, setBottom] = useState('dataMin-1');

  const zoom = () => {
    if (refAreaLeft === refAreaRight || !refAreaRight) {
      setRefAreaLeft('');
      setRefAreaRight('');
      return;
    }

    const indexLeft = data.findIndex(item => item.date === refAreaLeft);
    const indexRight = data.findIndex(item => item.date === refAreaRight);

    setRefAreaLeft('');
    setRefAreaRight('');

    if (indexLeft > indexRight) {
      [indexLeft, indexRight] = [indexRight, indexLeft];
    }

    setLeft(data[indexLeft].date);
    setRight(data[indexRight].date);

    const dataInRange = data.slice(indexLeft, indexRight + 1);
    setBottom(Math.min(...dataInRange.map(item => item.value)) - 1);
    setTop(Math.max(...dataInRange.map(item => item.value)) + 1);
  };

  const zoomOut = () => {
    setLeft('dataMin');
    setRight('dataMax');
    setTop('dataMax+1');
    setBottom('dataMin-1');
  };

  return (
    <div>
      <button onClick={zoomOut}>Zoom Out</button>
      <LineChart
        width={800}
        height={400}
        data={data}
        onMouseDown={e => e && setRefAreaLeft(e.activeLabel)}
        onMouseMove={e => refAreaLeft && e && setRefAreaRight(e.activeLabel)}
        onMouseUp={zoom}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          domain={[left, right]}
          type="category"
        />
        <YAxis domain={[bottom, top]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
        {refAreaLeft && refAreaRight && (
          <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
        )}
      </LineChart>
    </div>
  );
};

export default TimeLineChart;