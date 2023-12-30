import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import userInfoReducer from "./slices/user-info-slice";
import classroomInfoReducer from "./slices/classroom-info-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import adminPropReducer from "./slices/admin-slice";

const reducers = combineReducers({
  userInfoReducer,
  classroomInfoReducer,
  adminPropReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userInfoReducer", "classroomInfoReducer"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
