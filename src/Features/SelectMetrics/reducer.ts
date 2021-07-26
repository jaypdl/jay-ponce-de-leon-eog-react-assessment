import { createSlice, PayloadAction } from 'redux-starter-kit';

// Want to grab all metric types from the api
// Add them to the reducer

export type metricOptions = string[]; // type is array of strings

const initialState: metricOptions = []; // initialize as empty array of strings

const metricOptionSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    getMetricOptions: (state, action: PayloadAction<metricOptions>) => {
      state = action.payload;
    },
  },
});

export const { getMetricOptions } = metricOptionSlice.actions;

export default metricOptionSlice.reducer;
