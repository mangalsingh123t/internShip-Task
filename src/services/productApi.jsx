import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => 'products/categories',
    }),
    getProductsByCategory: builder.query({
      query: ({ category, skip = 0 }) =>
        `products/category/${category}?limit=10&skip=${skip}`,
    }),
    searchProducts: builder.query({
      query: (searchTerm) => `products/search?q=${searchTerm}&limit=10`,
    }),
    getProductsBatch: builder.query({
      query: (skip) => `products?limit=10&skip=${skip}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
  useGetProductsBatchQuery,
} = productApi;
