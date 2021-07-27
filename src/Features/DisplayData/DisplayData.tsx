import React, { useEffect, useState } from 'react';
import RealTimeData from './RealTimeData';
import { useQuery, useSubscription } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';

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

  const [{ fetching: historyFetching, data: historyData, error: historyError }, reexecuteQuery] = useQuery({
    query: historyQuery,
    variables: {
      input: metricsOptions.map(metric => ({ metricName: metric, after: pastTime })),
    },
  });

  console.log(historyData);

  return (
    <>
      <RealTimeData />
    </>
  );
};
