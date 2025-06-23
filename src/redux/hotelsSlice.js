// src/redux/hotelSlice.js

import { createSelector } from 'reselect'; // Import createSelector from reselect

// --- Action Types ---
const FETCH_HOTELS_REQUEST = 'hotels/fetchRequest';
const FETCH_HOTELS_SUCCESS = 'hotels/fetchSuccess';
const FETCH_HOTELS_FAILURE = 'hotels/fetchFailure';

const FETCH_HOTEL_DETAILS_REQUEST = 'hotelDetails/fetchRequest';
const FETCH_HOTEL_DETAILS_SUCCESS = 'hotelDetails/fetchSuccess';
const FETCH_HOTEL_DETAILS_FAILURE = 'hotelDetails/fetchFailure';

// --- Initial State ---
const initialState = {
  hotels: [], // For search results (lean data)
  selectedHotel: null, // For full hotel details - keep this consistent (null or {})
  loading: false,
  error: null,
};

// --- Thunks (Asynchronous Actions) ---




// --- Reducer ---
const hotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOTELS_REQUEST:
    case FETCH_HOTEL_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_HOTELS_SUCCESS:
      return {
        ...state,
        loading: false,
        hotels: action.payload,
        error: null,
      };
    case FETCH_HOTEL_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedHotel: action.payload,
        error: null,
      };
    case FETCH_HOTELS_FAILURE:
    case FETCH_HOTEL_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default hotelReducer;

// --- Memoized Selector ---
// Base selector that just gets the 'hotel' slice of the state
const getHotelState = (state) => state.hotel; // Assuming your root reducer maps 'hotelReducer' to 'hotel'

// Memoized selector to extract selectedHotel, loading, and error
export const selectHotelDetails = createSelector(
  [getHotelState], // Input selector: get the entire hotel slice
  (hotelState) => ({ // Output selector: return these specific properties
    selectedHotel: hotelState.selectedHotel,
    loading: hotelState.loading,
    error: hotelState.error,
  })
);