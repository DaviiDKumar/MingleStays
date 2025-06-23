// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import "./index.css";
import { store } from "./redux/store";

// ⭐ CHANGE THIS IMPORT ⭐
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // ⭐ FROM AdapterDateFns TO AdapterDayjs ⭐


const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDayjs}> {/* ⭐ CHANGE THIS prop ⭐ */}
            <App />
          </LocalizationProvider>
        </Provider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);