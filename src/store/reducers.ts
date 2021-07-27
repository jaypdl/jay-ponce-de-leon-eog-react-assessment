import { reducer as weatherReducer } from '../Features/Weather/reducer';
import metricsOptionsReducer from '../Features/SelectMetrics/reducer';

export default {
  weather: weatherReducer,
  metrics: metricsOptionsReducer,
};
