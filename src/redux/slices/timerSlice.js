/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const INITIAL_TIME = 20;
const ADDITIONAL_TIME = 10;
const TIME_LIMIT = 60 * 10;

const initialState = { time: INITIAL_TIME, timestamp: null };

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    addTime(state) {
      const newTime = state.time + ADDITIONAL_TIME;
      if (newTime > TIME_LIMIT) {
        state.time = TIME_LIMIT;
      } else {
        state.time = newTime;
      }
    },
    resetTime(state) {
      state.time = INITIAL_TIME;
      state.timestamp = ADDITIONAL_TIME;
    },
    decrementTime(state) {
      state.time -= 1;
    },
  },
});

export const { addTime, resetTime, decrementTime } = timerSlice.actions;
export default timerSlice.reducer;
