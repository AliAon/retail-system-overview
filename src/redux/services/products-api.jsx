import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PUBLIC_BACKEND_URL,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    products: builder.query({
      query: ({ shop }) => `/shopifyAccount/getShopifyProducts?shop=${shop}`,
    }),
  }),
});
export const { useProductsQuery } = productApi;
