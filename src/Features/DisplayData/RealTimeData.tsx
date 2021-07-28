import { useEffect } from 'react';
import { useSubscription } from 'urql';
import { useDispatch } from 'react-redux';

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

export default () => {
  const [{ fetching: subFetching, data: subData, error: subError }] = useSubscription({ query: metricSubscription });

  return null;
};
