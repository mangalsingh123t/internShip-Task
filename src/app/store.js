import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '../services/productApi';
import categorySlice from '../features/categories/CategorySlice';

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    categories: categorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productApi.middleware),
});
