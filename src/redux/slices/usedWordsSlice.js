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
    resetUsedWords(state) {
      state.usedWords = initialState.usedWords;
    },
  },
});

export const { addUsedWords, resetUsedWords } = usedWordsSlice.actions;
export default usedWordsSlice.reducer;
