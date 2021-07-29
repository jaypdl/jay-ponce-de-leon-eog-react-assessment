import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'redux-starter-kit';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CircularProgress } from '@material-ui/core';
import { IState } from '../../store';

const selectEnabledMetrics = createSelector(
  (state: IState) => state.metrics.selectedMetrics,
  (state: IState) => state.data.historical,
  (selected, data) => {
    const selectedData = [];
    const selectedUnits: Set<string> = new Set();
    for (let metric in data) {
      if (selected[metric]) {
        selectedData.push({ metricName: metric, unit: data[metric][0].unit, data: data[metric] });
        selectedUnits.add(data[metric][0].unit);
      }
    }
    const uniqueUnits = Array.from(selectedUnits);
    return { selectedData, uniqueUnits };
  },
);

export const checkForData = createSelector(
  (state: IState) => state.data.historical,
  data => Object.keys(data).length > 0,
);

const Chart = () => {
  const safeToLoad = useSelector(checkForData);

  const chartData = useSelector(selectEnabledMetrics);
  const { selectedData, uniqueUnits } = chartData;
  if (!safeToLoad) return <CircularProgress />;

  return (
    <>
      {uniqueUnits.length > 0 && (
        <ResponsiveContainer width="100%">
          <LineChart width={800} height={600}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="at" type="number" allowDuplicatedCategory={false} domain={['dataMin', 'dataMax']} />
            {uniqueUnits.map(unit => (
              <YAxis
                dataKey="value"
                type="number"
                scale="auto"
                allowDuplicatedCategory={false}
                yAxisId={unit}
                key={unit}
              />
            ))}
            <Tooltip />
            <Legend />
            {selectedData.map(metric => (
              <Line
                dataKey="value"
                data={metric.data}
                name={metric.metricName}
                key={metric.metricName}
                unit={metric.unit}
                yAxisId={metric.unit}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
export default Chart;
