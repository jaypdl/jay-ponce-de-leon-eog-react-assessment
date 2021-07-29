import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'redux-starter-kit';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CircularProgress, makeStyles, CardContent, Grid, Typography, Paper } from '@material-ui/core';
import { IState } from '../../store';

const useStyles = makeStyles({
  wrapper: {
    height: '100vh',
    backgroundColor: 'white',
  },
});

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

// Customizing the x-axis. Able to get more perfomance converting a few timestrings to days instead of every one in memory
const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={5} textAnchor="end" transform="rotate(-15)">
        {(payload.value = new Date(payload.value).toLocaleTimeString())}
      </text>
    </g>
  );
};

const Chart = () => {
  const classes = useStyles();
  const safeToLoad = useSelector(checkForData);

  const chartData = useSelector(selectEnabledMetrics);
  const chartColors = ['#8884d8', '#82ca9d', 'red', 'blue', 'orange', 'black'];
  const { selectedData, uniqueUnits } = chartData;
  if (!safeToLoad) return <CircularProgress />;

  if (uniqueUnits.length <= 0) {
    return (
      <Grid container justify="center" alignItems="center" direction="row">
        <Paper>
          <CardContent>
            <Typography variant="h4">There is nothing to show!</Typography>
            <Typography variant="body1">Choose some metrics from above!</Typography>
          </CardContent>
        </Paper>
      </Grid>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="72%" className={classes.wrapper}>
      <LineChart width={800}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="at"
          type="number"
          domain={['dataMin', 'dataMax']}
          allowDuplicatedCategory={false}
          scale="time"
          tick={<CustomizedAxisTick />}
        />
        {uniqueUnits.map((unit, index) => (
          <YAxis
            dataKey="value"
            type="number"
            scale="auto"
            orientation={index === 2 ? 'right' : 'left'}
            // domain={['dataMin', 'dataMax']}
            domain={['auto', (dataMax: number) => dataMax * 1.05]}
            allowDuplicatedCategory={false}
            yAxisId={unit}
            unit={' ' + unit}
            key={unit}
          />
        ))}
        <Tooltip />
        <Legend />
        {selectedData.map((metric, index) => (
          <Line
            dataKey="value"
            data={metric.data}
            name={metric.metricName}
            key={metric.metricName}
            unit={' ' + metric.unit}
            yAxisId={metric.unit}
            dot={false}
            stroke={chartColors[index]}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
export default Chart;
