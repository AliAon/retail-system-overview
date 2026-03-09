import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/rootSlice";
import { userApi } from "./services/user-api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "./services/products-api";
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(productApi.middleware),
});
setupListeners(store.dispatch);
