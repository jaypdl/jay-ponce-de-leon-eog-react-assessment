import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
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
  const classes = useStyles();

  const { metrics, data: dataState } = useSelector((state: IState) => state);

  if (!dataState) return <LinearProgress />;

  const { metricsOptions, selectedMetrics } = metrics;

  const { realTime } = dataState;

  const dispatch = useDispatch();

  const [{ fetching, data, error }] = useQuery({ query });

  const handleMetricSwitchChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    const metricName = evt.target.value;

    if (selectedMetrics[metricName]) {
      dispatch(actions.setMetricOff(metricName));
    } else {
      dispatch(actions.setMetricOn(metricName));
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(actions.getMetricOptionsError({ error: error.message }));
      return;
    }

    if (!data) return;

    dispatch(actions.getMetricOptions(data.getMetrics));
  }, [dispatch, data, error]);

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
