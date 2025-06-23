// src/services/customBaseQuery.js
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const customBaseQuery = async (args, api, extraOptions) => {
  let token = null;

  try {
    token = await window.Clerk?.session?.getToken();
  } catch (err) {
    console.warn('Failed to get Clerk token:', err);
  }

  const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API_URL ,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  return baseQuery(args, api, extraOptions);
};

export default customBaseQuery;
