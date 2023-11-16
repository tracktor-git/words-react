/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { score: 0 };

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    incrementScore(state) {
      state.score += 1;
    },
    resetScore(state) {
      state.score = 0;
    },
  },
});

export const { incrementScore, resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;
