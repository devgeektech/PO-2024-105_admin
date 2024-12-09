import { configureStore } from "@reduxjs/toolkit";
import { userList } from "./features/user/userSlice";
import { eventList } from "./features/event/eventSlice";
import logger from "redux-logger";
import {sharedSlice} from "./features/shared/sharedSlice"
import { serviceList } from "./features/service/serviceSlice";

export const store = configureStore({
  reducer: {
    userList: userList.reducer,
    eventList: eventList.reducer,
    sharedActions: sharedSlice.reducer,
    serviceList: serviceList.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    })
      .concat(logger as any)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
