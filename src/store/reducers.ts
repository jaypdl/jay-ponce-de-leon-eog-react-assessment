import { reducer as weatherReducer } from '../Features/Weather/reducer';
import metricsOptionsReducer from '../Features/SelectMetrics/reducer';
import dataReducer from '../Features/DisplayData/reducer';

export default {
  weather: weatherReducer,
  metrics: metricsOptionsReducer,
  history: dataReducer.history,
  realTime: dataReducer.realTime,
};
