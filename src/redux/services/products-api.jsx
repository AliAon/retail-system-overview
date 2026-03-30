import { getToken } from "@/lib/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PUBLIC_BACKEND_URL,
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "1");
      headers.set("Authorization", `Bearer ${getToken()}`);
      return headers;
    },
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    shopifyproducts: builder.query({
      query: (filters) => {
        const params = new URLSearchParams(filters);
        return `/shopifyAccount/getShopifyProducts?${params.toString()}`;
      },
    }),
    srsproducts: builder.query({
      query: (filters) => {
        const params = new URLSearchParams(filters);
        return `/srsProduct?${params.toString()}`;
      },
    }),

    shops: builder.query({
      query: () => "shopifyAccount/findAll",
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/shopifyAccount/listProduct",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useShopifyproductsQuery,
  useShopsQuery,
  useSrsproductsQuery,
  useCreateProductMutation,
} = productApi;
