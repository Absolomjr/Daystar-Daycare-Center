import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import babysitterReducer from './slices/babysitterSlice';
import childrenReducer from './slices/childrenSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    babysitters: babysitterReducer,
    children: childrenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
