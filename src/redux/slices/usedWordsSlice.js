/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { usedWords: [] };

const usedWordsSlice = createSlice({
  name: 'usedWords',
  initialState,
  reducers: {
    addUsedWords(state, action) {
      state.usedWords.unshift(...action.payload);
    },
    resetGame(state) {
      state.usedWords = initialState.usedWords;
    },
  },
});

export const { addUsedWords, resetGame } = usedWordsSlice.actions;
export default usedWordsSlice.reducer;
