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

export type InitialState = {
  realTime: RealTimeState;
  historical: HistoryState;
};

export type NewMeasurement = {
  at: number;
  metric: string;
  unit: string;
  value: number;
};

const initialState: InitialState = {
  realTime: {},
  historical: {},
};

const dataSlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    // receivedMetricsOptions: (state, action: PayloadAction<string[]>) => {
    //   state.historical = action.payload.reduce((acc: HistoryState, metric: string) => {
    //     acc[metric] = [];
    //     return acc;
    //   }, {});

    // state.realTime = action.payload.reduce((acc: RealTimeState, metric: string) => {
    //   acc[metric] = { at: 0, value: 0, unit: '' };
    //   return acc;
    // }, {});
    // },
    updateHistory: (state, action: PayloadAction<GetMultipleMeasurements>) => {
      action.payload.forEach(entry => (state.historical[entry.metric] = entry.measurements));
    },
    historyError: (state, action: PayloadAction<ApiErrorAction>) => state,
    realTimeError: (state, action: PayloadAction<ApiErrorAction>) => state,
    receivedRealTimeUpdate: (state, action: PayloadAction<NewMeasurement>) => {
      const { at, metric, unit, value } = action.payload;
      state.realTime[metric] = { at, unit, value };
      if (state.historical[metric]) {
        state.historical[metric].push({ at, unit, value });
        state.historical[metric].shift();
      }
    },
  },
});

export const actions = dataSlice.actions;

export const reducer = dataSlice.reducer;
