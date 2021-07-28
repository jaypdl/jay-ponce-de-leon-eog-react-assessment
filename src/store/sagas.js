import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import metricsOptionsSaga from '../Features/SelectMetrics/saga';
import { watchHistoryError as historySaga, watchRealTimeError as realTimeSage } from '../Features/ManageData/saga';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(metricsOptionsSaga);
  yield spawn(historySaga);
  yield spawn(realTimeSage);
}
