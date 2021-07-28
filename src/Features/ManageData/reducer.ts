import { createSlice, PayloadAction } from 'redux-starter-kit';
import { ApiErrorAction } from '../Weather/reducer';

export type Measurement = {
  at: number;
  value: number;
  unit: string;
};

export type HistoryState = {
  [metricName: string]: Measurement[];
};

export type GetMultipleMeasurements = {
  metric: string;
  measurements: Measurement[];
}[];

export type RealTimeState = {
  [metricName: string]: Measurement;
};

const initialHistoryState: HistoryState = {};

const initialRealTimeState: RealTimeState = {};

const historySlice = createSlice({
  name: 'history',
  initialState: initialHistoryState,
  reducers: {
    receivedMetricsOptions: (state, action: PayloadAction<string[]>) => {
      return (state = action.payload.reduce((acc: HistoryState, metric: string) => {
        acc[metric] = [];
        return acc;
      }, {}));
    },
    updateHistory: (state, action: PayloadAction<GetMultipleMeasurements>) => {
      action.payload.forEach(entry => (state[entry.metric] = entry.measurements));
    },
    historyError: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

const realTimeSlice = createSlice({
  name: 'realTime',
  initialState: initialRealTimeState,
  reducers: {
    receivedMetricsOptions: (state, action: PayloadAction<string[]>) => {
      return (state = action.payload.reduce((acc: RealTimeState, metric: string) => {
        acc[metric] = { at: 0, value: 0, unit: '' };
        return acc;
      }, {}));
    },
  },
});

export const actions = {
  history: historySlice.actions,
  realTime: realTimeSlice.actions,
};

export default {
  history: historySlice.reducer,
  realTime: realTimeSlice.reducer,
};
