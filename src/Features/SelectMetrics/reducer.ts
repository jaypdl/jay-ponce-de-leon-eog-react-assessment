import { createSlice, PayloadAction } from 'redux-starter-kit';

// Want to grab all metric types from the api
// Add them to the reducer

// const initialState: MetricOptions = []; // initialize as empty array of strings
export type SelectedMetric = {
  [metricName: string]: boolean;
};

export type MetricState = {
  metricsOptions: string[];
  selectedMetrics: SelectedMetric;
};

const initialState: MetricState = {
  metricsOptions: [],
  selectedMetrics: {},
};

const metricsSlice = createSlice({
  name: 'metrics',
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
  },
});

export const { getMetricOptions } = metricsSlice.actions;

export default metricsSlice.reducer;
