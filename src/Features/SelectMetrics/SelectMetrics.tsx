import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../store/actions';
import { useQuery } from 'urql';
import { IState } from '../../store';
import MetricSwitch from '../../components/MetricSwitch';
import { CardContent, FormGroup, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles({
  loading: {
    margin: '5% 10%',
  },
  formGroup: {
    margin: '5% 10%',
  },
});

const query = `
  query {
    getMetrics
  }
  `;

export default () => {
  const [{ fetching, data, error }] = useQuery({ query });

  const { metrics, data: dataState } = useSelector((state: IState) => state);

  const { metricsOptions, selectedMetrics } = metrics;

  const { realTime } = dataState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(actions.metrics.getMetricOptionsError({ error: error.message }));
      return;
    }
    if (!data) return;

    dispatch(actions.metrics.getMetricOptions(data.getMetrics));
    // dispatch(actions.data.receivedMetricsOptions(data.getMetrics));
  }, [dispatch, data, error]);

  const handleMetricSwitchChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    const metricName = evt.target.value;

    if (selectedMetrics[metricName]) {
      dispatch(actions.metrics.setMetricOff(metricName));
    } else {
      dispatch(actions.metrics.setMetricOn(metricName));
    }
  };
  const classes = useStyles();
  if (fetching && !data) return <LinearProgress className={classes.loading} />;

  return (
    <Grid container justify="center" align-items="center">
      <Paper className={classes.formGroup}>
        <CardContent>
          <FormGroup row>
            {metricsOptions.map(metric => {
              return (
                <MetricSwitch
                  metricName={metric}
                  handleClick={handleMetricSwitchChange}
                  selectedState={selectedMetrics[metric]}
                  data={realTime[metric]}
                  key={metric}
                />
              );
            })}
          </FormGroup>
        </CardContent>
      </Paper>
    </Grid>
  );
};
