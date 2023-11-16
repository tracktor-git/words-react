import { combineReducers, configureStore } from '@reduxjs/toolkit';

import scoreSlice from './slices/scoreSlice';
import usedWordsSlice from './slices/usedWordsSlice';
import errorSlice from './slices/errorSlice';

const reducer = combineReducers({
  scoreSlice,
  usedWordsSlice,
  errorSlice,
});

const store = configureStore({
  reducer,
});

export default store;
