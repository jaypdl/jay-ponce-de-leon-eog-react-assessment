import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { actions as metricsOptionsActions, GetMetricError } from './reducer';
import { PayloadAction } from 'redux-starter-kit';

function* getMetricErrorReceived(action: PayloadAction<GetMetricError>) {
  yield call(toast.error, `Error Getting Metrics: ${action.payload.error}`);
}

export default function* watchGetMetricError() {
  yield takeEvery(metricsOptionsActions.getMetricOptionsError.type, getMetricErrorReceived);
}
