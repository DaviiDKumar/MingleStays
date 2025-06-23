// hotel-frontend/src/utils/api.js

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

/**
 * A generic utility to call backend APIs with proper headers and error handling.
 * @param {string} endpoint - The backend API route (e.g., "/auth/signup").
 * @param {string} [method='POST'] - The HTTP method.
 * @param {Object|null} [body=null] - The JSON payload to send.
 * @param {string|null} [token=null] - Optional Bearer token for auth (Clerk token).
 * @returns {Promise<Object>} - The parsed JSON response.
 * @throws {Error} - If the request fails.
 */
export const callBackendApi = async (endpoint, method = 'POST', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config = {
    method,
    headers,
    ...(method !== 'GET' && method !== 'HEAD' && body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      console.error(`API Error on ${method} ${endpoint}:`, data);
      throw new Error(data.message || `API call failed: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`Network or unexpected error during ${method} ${endpoint}:`, error);
    throw error;
  }
};
