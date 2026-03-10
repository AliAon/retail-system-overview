import { getToken } from "@/lib/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PUBLIC_BACKEND_URL,
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "1");
      headers.set("Authorization", `Bearer ${getToken()}`);

      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
export const { useLoginMutation } = userApi;
