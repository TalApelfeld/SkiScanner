import { configureStore } from '@reduxjs/toolkit';
import resortReducer from './slices/resortSlice';
import packageReducer from './slices/packageSlice';
import userReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    resorts: resortReducer,
    package: packageReducer,
    user: userReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;