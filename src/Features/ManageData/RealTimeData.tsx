import { useEffect } from 'react';
import { useSubscription } from 'urql';
import { useDispatch } from 'react-redux';
// import { IState } from '../../store';
import actions from '../../store/actions';

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
  const dispatch = useDispatch();

  const [{ data, error }] = useSubscription({ query: metricSubscription });

  // if (!data) return null;

  // const { newMeasurement } = data;

  // console.log(data);
  useEffect(() => {
    if (error) {
      dispatch(actions.data.realTimeError({ error: error.message }));
    }
    if (!data) return;
    dispatch(actions.data.receivedRealTimeUpdate(data.newMeasurement));
  }, [dispatch, data, error]);

  return null;
};
