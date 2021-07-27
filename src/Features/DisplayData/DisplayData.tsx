import React, { useEffect, useState } from 'react';
import { useQuery, useSubscription } from 'urql';
import { useDispatch, useSelector } from 'react-redux';

const metricSubscription = `
  subscription{
    newMeasurement{
      metric
      at
      value
      unit
    }
  }
  `;

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

// const handleSubscription = (messages = [], response: any) => {
//   return [response.newMessages, ...messages];
// };

export default () => {
  const [{ fetching, data, error }] = useSubscription({ query: metricSubscription });

  console.log(data);

  const [result, reexecuteQuery] = useQuery({
    query: historyQuery,
    variables: {},
  });

  return <></>;
};
