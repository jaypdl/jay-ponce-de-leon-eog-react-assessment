import { actions as weatherActions } from '../Features/Weather/reducer';
import { actions as metricsActions } from '../Features/SelectMetrics/reducer';
import { actions as dataActions } from '../Features/ManageData/reducer';

export default {
  weather: weatherActions,
  metrics: metricsActions,
  data: dataActions,
};
