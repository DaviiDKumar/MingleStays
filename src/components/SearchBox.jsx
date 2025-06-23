import React, { useState } from 'react';
import { TextField, InputAdornment, CircularProgress } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useSearchHotelsByCityNameMutation } from '../services/hotelApi';
import "../styles/boxShadow.css"
function SearchBox() {
    const [cityName, setCityName] = useState('');
    const [adults, setAdults] = useState(1);
    const today = dayjs().startOf('day');
    const [checkInDate, setCheckInDate] = useState(today);
    const [checkOutDate, setCheckOutDate] = useState(today.add(1, 'day'));

    const [searchHotels, { isLoading }] = useSearchHotelsByCityNameMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cityName || !checkInDate || !checkOutDate || adults < 1) {
            alert('Please fill in all fields correctly.');
            return;
        }

        try {
            const payload = {
                cityName: cityName.trim(),
                checkInDate: checkInDate.format('YYYY-MM-DD'),
                checkOutDate: checkOutDate.format('YYYY-MM-DD'),
                adults,
            };

            const res = await searchHotels(payload).unwrap();
            const hotels = res?.data?.hotelsWithOffers || [];

            navigate('/search-results', {
                state: { payload, hotels },
            });
        } catch (err) {
            console.error('❌ Hotel search failed:', err);
            alert('Something went wrong. Try again.');
        }
    };

    return (
        <div
            className="
    
  px-5
  py-7
    boxShadow
    w-[80vw] 
    md:max-w-5xl 
    mx-auto mt-2 mb-4 
    rounded-none     
    md:rounded  

  "
        >

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
            >
                {/* City Field */}
                <TextField
                    size="small"
                    label="Where to?"
                    placeholder="City-Name"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Check-in */}
                <DatePicker
                    label="Check-in"
                    value={checkInDate}
                    minDate={today}
                    onChange={(newValue) => {
                        setCheckInDate(newValue);
                        if (checkOutDate && newValue?.isAfter(checkOutDate)) {
                            setCheckOutDate(null);
                        }
                    }}
                    slotProps={{
                        textField: {
                            size: 'small',
                            required: true,
                        },
                    }}
                />

                {/* Check-out */}
                <DatePicker
                    label="Check-out"
                    value={checkOutDate}
                    minDate={checkInDate ? dayjs(checkInDate).add(1, 'day') : today}
                    onChange={(newValue) => setCheckOutDate(newValue)}
                    slotProps={{
                        textField: {
                            size: 'small',
                            required: true,
                        },
                    }}
                />

                {/* Guests + Search grouped in a single row on mobile */}
                <div className="flex gap-2 col-span-full md:col-span-2">
                    {/* Guests field */}
                    <TextField
                        size="small"
                        label="Guests"
                        type="number"
                        inputProps={{ min: 1 }}
                        value={adults}
                        onChange={(e) => setAdults(parseInt(e.target.value))}
                        required
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <GroupIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Search button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-transparent whitespace-nowrap flex-shrink-0 px-3 py-2 border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 active:scale-[0.98] rounded font-semibold passero-one-regular flex items-center gap-1"
                    >
                        {isLoading ? (
                            <CircularProgress size={18} color="inherit" />
                        ) : (
                            <>
                                <SearchIcon className="text-base" />
                                Search
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchBox;
