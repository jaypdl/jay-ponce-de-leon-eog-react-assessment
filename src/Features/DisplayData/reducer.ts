import { createSlice, PayloadAction } from 'redux-starter-kit';

export type HistoryMetric = {
  [metricName: string]: {
    at: number;
    value: number;
    unit: string;
  }[];
};

export type RealTimeMetric = {
  [metricName: string]: {
    at: number;
    value: number;
    unit: string;
  };
};

const initialHistoryState = {};

const initialRealTimeState = {};

const historySlice = createSlice({
  name: 'history',
  initialState: initialHistoryState,
  reducers: {
    receivedMetricsOptions: (state, action: PayloadAction<string[]>) => {
      return (state = action.payload.reduce((acc: HistoryMetric, metric: string) => {
        acc[metric] = [];
        return acc;
      }, {}));
    },
  },
});

const realTimeSlice = createSlice({
  name: 'realTime',
  initialState: initialRealTimeState,
  reducers: {
    receivedMetricsOptions: (state, action: PayloadAction<string[]>) => {
      return (state = action.payload.reduce((acc: RealTimeMetric, metric: string) => {
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
