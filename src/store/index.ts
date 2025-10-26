import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import eventsReducer from "./eventsSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
