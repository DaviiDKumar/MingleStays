import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";

export default function SearchBox() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000));
  const [guests, setGuests] = useState(1);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div
        className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-5 md:p-6
          grid grid-cols-1 gap-4
          md:grid-cols-6 md:grid-rows-1 items-center"
      >
        {/* Location full width on top */}
        <div className="md:col-span-2 w-full flex items-center">
          <TextField
            label="Where are you traveling?"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon color="primary" />
                </InputAdornment>
              ),
            }}
            size="small"
          />
        </div>

        {/* The rest: check-in, check-out, guests, search - all in one row */}
        <div className="md:col-span-4 w-full flex flex-row gap-3 flex-wrap items-center">
          {/* Check-in */}
          <div className="flex-1 min-w-[120px] flex items-center">
            <DatePicker
              label="Check-in"
              value={checkIn}
              onChange={(newValue) => {
                setCheckIn(newValue);
                if (newValue >= checkOut) {
                  setCheckOut(new Date(newValue.getTime() + 86400000));
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                />
              )}
              minDate={new Date()}
            />
          </div>

          {/* Check-out */}
          <div className="flex-1 min-w-[120px] flex items-center">
            <DatePicker
              label="Check-out"
              value={checkOut}
              onChange={(newValue) => {
                setCheckOut(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                />
              )}
              minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : new Date()}
            />
          </div>

          {/* Guests */}
          <div className="flex-1 min-w-[100px] max-w-[120px] flex items-center">
            <TextField
              label="Guests"
              type="number"
              inputProps={{ min: 1 }}
              fullWidth
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PeopleIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </div>

          {/* Search Button */}
          <div className="min-w-[100px] max-w-[130px] flex items-center">
            <button className="bg-blue-600 text-white px-4 py-[10px] md:px-6 rounded-lg hover:bg-blue-700 transition font-semibold w-full whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
