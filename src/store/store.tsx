import { configureStore } from "@reduxjs/toolkit";
import adsReducer from "./reducers/ads";
import { adsApi } from "../services/ads";

const store = configureStore({
  reducer: {
    [adsApi.reducerPath]: adsApi.reducer,
    ads: adsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adsApi.middleware),
});

export default store;
