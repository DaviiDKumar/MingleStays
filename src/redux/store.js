// mingle-stays-frontend/src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
// Import the reducer function from your user slice.
import userReducer from './userSlice';

// IMPORTANT: Import your new RTK Query API slice
import { hotelApi } from '../services/hotelApi'; // Adjusted path to go up one level and into 'services'

// Configure the Redux store.
export const store = configureStore({
  // The 'reducer' property defines the root reducer for your store.
  reducer: {
    user: userReducer,
    // REMOVED: hotel: hotelReducer, // This was the old manual hotels reducer
    // ADDED: The RTK Query API reducer here
    [hotelApi.reducerPath]: hotelApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of RTK Query.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hotelApi.middleware),
});


