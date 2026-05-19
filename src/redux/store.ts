import { configureStore } from "@reduxjs/toolkit";
import reliefGoodsReducer from "./features/reliefGoodsSlice";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/api";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    reliefGoods: reliefGoodsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
