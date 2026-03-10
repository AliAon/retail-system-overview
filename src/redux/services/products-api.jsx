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
    products: builder.query({
      /*************  ✨ Windsurf Command ⭐  *************/
      /**
 * Generates a URL for fetching products from the backend.
 * @param {Object} filters - Filters to apply to the query.

/*******  dfec11c5-631a-4ff0-82f8-11c8fcb0e768  *******/
      query: (filters) => {
        const params = new URLSearchParams(filters);
        return `/shopifyAccount/getShopifyProducts?${params.toString()}`;
      },
    }),
    shops: builder.query({
      query: () => "shopifyAccount/findAll",
    }),
  }),
});
export const { useProductsQuery, useShopsQuery } = productApi;
