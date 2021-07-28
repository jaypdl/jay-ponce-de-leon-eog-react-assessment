import { createSlice, PayloadAction } from 'redux-starter-kit';

// Want to grab all metric types from the api
// Add them to the reducer
// Toggle metric options on and off

export type SelectedMetric = {
  [metricName: string]: boolean;
};

export type MetricState = {
  metricsOptions: string[];
  selectedMetrics: SelectedMetric;
};

export type GetMetricError = {
  error: string;
};

const initialState: MetricState = {
  metricsOptions: [],
  selectedMetrics: {},
};

const metricsOptionsSlice = createSlice({
  name: 'metricsOptions',
  initialState,
  reducers: {
    getMetricOptions: (state, action: PayloadAction<string[]>) => {
      state.metricsOptions = action.payload;

      // Use array reducer on now fulfilled metricsOptions to create selectedMetrics object initialized to false
      state.selectedMetrics = state.metricsOptions.reduce((acc: SelectedMetric, val: string) => {
        acc[val] = false;
        return acc;
      }, {});
    },
    setMetricOn: (state, action: PayloadAction<string>) => {
      state.selectedMetrics[action.payload] = true;
    },
    setMetricOff: (state, action: PayloadAction<string>) => {
      state.selectedMetrics[action.payload] = false;
    },
    getMetricOptionsError: (state, action: PayloadAction<GetMetricError>) => state,
  },
});

export const actions = metricsOptionsSlice.actions;

export const reducer = metricsOptionsSlice.reducer;
