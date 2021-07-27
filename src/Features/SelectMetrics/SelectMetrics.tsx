import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { useQuery } from 'urql';
import { IState } from '../../store';
import MetricSwitch from '../../components/MetricSwitch';
import { Card, CardContent, FormGroup, LinearProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  loading: {
    margin: '5% 25%',
  },
  formGroup: {
    margin: '5% 25%',
  },
});

const query = `
  query {
    getMetrics
  }
  `;

export default () => {
  const classes = useStyles();

  const { metricsOptions, selectedMetrics } = useSelector((state: IState) => state.metrics);

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

  if (fetching && !data) return <LinearProgress className={classes.formGroup} />;

  return (
    <Card className={classes.formGroup}>
      <CardContent>
        <FormGroup row>
          {metricsOptions.map(metric => {
            return (
              <MetricSwitch
                metricName={metric}
                handleClick={handleMetricSwitchChange}
                selectedState={selectedMetrics[metric]}
                key={metric}
              />
            );
          })}
        </FormGroup>
      </CardContent>
    </Card>
  );
};
