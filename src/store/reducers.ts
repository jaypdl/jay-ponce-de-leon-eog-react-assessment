import { reducer as weatherReducer } from '../Features/Weather/reducer';
import metricsReducer from '../Features/SelectMetrics/reducer';
import { reducer as dataReducer } from '../Features/ManageData/reducer';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
  data: dataReducer,
};
