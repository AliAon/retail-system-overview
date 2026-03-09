import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { userApi } from "../services/user-api";
import { productApi } from "../services/products-api";

const rootReducer = combineReducers({
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
});

export default rootReducer;
