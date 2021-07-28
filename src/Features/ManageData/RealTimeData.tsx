import { useEffect } from 'react';
import { useSubscription } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
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

  const [{ fetching, data, error }] = useSubscription({ query: metricSubscription });

  // console.log(data);
  useEffect(() => {
    console.log('hello');
    if (error) {
      dispatch(actions.data.realTimeError({ error: error.message }));
    }
    if (!data) return;
  }, []);

  return null;
};
