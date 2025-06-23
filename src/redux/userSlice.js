// hotel-frontend/src/redux/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

// --- Helper functions for localStorage persistence ---

/**
 * Attempts to load the user state from localStorage.
 * Handles potential parsing errors.
 * @returns {object | undefined} The parsed state object or undefined if not found/error.
 */
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('clerkUserState');
    if (serializedState === null) {
      return undefined; // Indicates no saved state, let Redux use its default initialState
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined; // Return undefined if there's an error, letting Redux fall back
  }
};

/**
 * Saves the current Redux user state to localStorage.
 * Handles potential serialization errors.
 * @param {object} state The current user state to save.
 */
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('clerkUserState', serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
    // You might want to implement more robust error logging here
  }
};

// --- Define the initial state for your user data ---
// It attempts to load from localStorage first.
const initialState = (() => {
  const storedState = loadStateFromLocalStorage();
  return {
    // If storedState exists, use its values, otherwise null/false
    email: storedState?.email || null,
    firstName: storedState?.firstName || null,
    lastName: storedState?.lastName || null,
    phoneNumber: storedState?.phoneNumber || null,
    imageUrl: storedState?.imageUrl || null,
    isSyncedWithBackend: storedState?.isSyncedWithBackend || false,
    // Add any other user-specific fields that come from your backend here, initialized to null
    _id: storedState?._id || null, // Example: for your backend's user ID
    address: storedState?.address || null,
    bio: storedState?.bio || null,
  };
})();

// Use createSlice to define your user slice.
const userSlice = createSlice({
  name: 'user', // A unique name for this slice.
  initialState, // The initial state for this slice.
  reducers: {
    // Reducer: setUserData
    setUserData: (state, action) => {
      // Immer (built into Redux Toolkit) allows you to "mutate" the state directly.
      // Object.assign merges the payload into the current state.
      Object.assign(state, action.payload);
      // Immediately save the updated state to localStorage
      saveStateToLocalStorage(state);
    },
    // Reducer: setBackendSyncStatus
    setBackendSyncStatus: (state, action) => {
      state.isSyncedWithBackend = action.payload; // Payload will be true or false.
      // Immediately save the updated state to localStorage
      saveStateToLocalStorage(state);
    },
    // Reducer: clearUserData
    // Resets the user state back to its initial, empty values (used on logout).
    clearUserData: (state) => {
      // Reset Redux state to its default empty values
      Object.assign(state, {
        email: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        imageUrl: null,
        isSyncedWithBackend: false,
        _id: null,
       
      });
      // Also clear the user data from localStorage
      localStorage.removeItem('clerkUserState');
    },
  },
});

// Export action creators.
export const { setUserData, setBackendSyncStatus, clearUserData } = userSlice.actions;

// Export the reducer function for this slice.
export default userSlice.reducer;