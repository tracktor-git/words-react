import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import scoreSlice from './slices/scoreSlice';
import usedWordsSlice from './slices/usedWordsSlice';
import errorSlice from './slices/errorSlice';

const rootReducer = combineReducers({
  scoreSlice,
  usedWordsSlice,
  errorSlice,
});

const persistConfig = {
  key: ' <TracktorWordsGame/>',
  storage,
  whitelist: ['scoreSlice', 'usedWordsSlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
export default store;
