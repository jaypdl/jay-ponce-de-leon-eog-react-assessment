import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { actions } from './reducer';
import { PayloadAction } from 'redux-starter-kit';
import { ApiErrorAction } from '../Weather/reducer';

const { historyError, realTimeError } = actions;

function* historyErrorReceived(action: PayloadAction<ApiErrorAction>) {
  yield call(toast.error, `Error getting history data: ${action.payload.error}`);
}

function* realTimeErrorReceived(action: PayloadAction<ApiErrorAction>) {
  yield call(toast.error, `Error getting real time data: ${action.payload.error}`);
}

export function* watchHistoryError() {
  yield takeEvery(historyError.type, historyErrorReceived);
}
export function* watchRealTimeError() {
  yield takeEvery(realTimeError.type, realTimeErrorReceived);
}
