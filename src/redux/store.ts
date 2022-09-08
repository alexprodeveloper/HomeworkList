import {configureStore} from '@reduxjs/toolkit';
import {homeworkSlice} from './homework/homework';
import {appSlice} from "./app/app";

export const store = configureStore({
  reducer: {
    homework: homeworkSlice.reducer,
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
