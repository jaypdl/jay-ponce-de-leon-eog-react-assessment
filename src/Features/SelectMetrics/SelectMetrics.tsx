import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';

const query = `
query {
  getMetrics
}
`;
const SelectMetrics = () => {
  const { metricsOptions, selectedMetrics } = useSelector((state: IState) => state.metrics);
  const dispatch = useDispatch();
  const [{ fetching, stale, data, error }] = useQuery({ query });

  useEffect(() => {
    if (error) {
      dispatch(actions.getMetricOptionsError({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.getMetricOptions(data.getMetrics));
  }, [data, error]);
  return <></>;
};

export default SelectMetrics;
