// src/services/hotelApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './customBaseQuery';

export const hotelApi = createApi({
  reducerPath: 'hotelApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    searchHotelsByCityName: builder.mutation({
      query: (body) => ({
        url: '/search',
        method: 'POST',
        body,
      }),
    }),

    getHotelDetailsById: builder.query({
      query: ({ hotelId, checkInDate, checkOutDate, adults, children }) => {
        const params = new URLSearchParams();
        if (checkInDate) params.append('checkInDate', checkInDate);
        if (checkOutDate) params.append('checkOutDate', checkOutDate);
        if (adults) params.append('adults', adults);
        if (children) params.append('children', children);

        return {
          url: `/${hotelId}?${params.toString()}`,
          method: 'GET',
        };
      },
      transformResponse: (response) => response.data?.hotelsWithOffers?.[0],
    }),

    getHotelOfferById: builder.query({
      query: (offerId) => `/offers/${offerId}`,
    }),

    bookHotel: builder.mutation({
      query: (body) => ({
        url: '/book',
        method: 'POST',
        body,
      }),
    }),

    getUserBookings: builder.query({
      query: (userId) => `/bookings/user/${userId}`,
    }),
  }),
});

export const {
  useSearchHotelsByCityNameMutation,
  useGetHotelDetailsByIdQuery,
  useLazyGetHotelDetailsByIdQuery,
  useLazyGetHotelOfferByIdQuery,
  useBookHotelMutation,
  useGetUserBookingsQuery,
} = hotelApi;
