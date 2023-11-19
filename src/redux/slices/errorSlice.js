/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { text: '' };

const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrorText(state, action) {
      state.text = action.payload;
    },
    resetErrorText(state) {
      state.text = '';
    },
  },
});

export const { setErrorText, resetErrorText } = errorSlice.actions;
export default errorSlice.reducer;
