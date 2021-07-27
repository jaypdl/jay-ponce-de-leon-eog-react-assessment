import React, { useEffect, useState } from 'react';
import RealTimeData from './RealTimeData';
import { useQuery, useSubscription } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { actions } from './reducer';
import { LinearProgress } from '@material-ui/core';

const historyQuery = `
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        at
        value
        unit
      }
    }
  }
  `;

const thirtyMinutesAgo = () => Date.now() - 30 * 60 * 1000;
const pastTime = thirtyMinutesAgo();

export default () => {
  const { metricsOptions } = useSelector((state: IState) => state.metrics);

  const dispatch = useDispatch();

  if (!metricsOptions) return null;

  const [{ fetching: historyFetching, data: historyData, error: historyError }, reexecuteQuery] = useQuery({
    query: historyQuery,
    variables: {
      input: metricsOptions.map(metric => ({ metricName: metric, after: pastTime })),
    },
  });

  useEffect(() => {
    if (metricsOptions) {
      dispatch(actions.history.receivedMetricsOptions(metricsOptions));
      dispatch(actions.realTime.receivedMetricsOptions(metricsOptions));
    }
  }, [dispatch, metricsOptions]);

  console.log(historyData);

  return (
    <>
      <RealTimeData />
    </>
  );
};
