import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';

import HotelIcon from '@mui/icons-material/Hotel';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

import { useSelector } from 'react-redux';
import { useGetUserBookingsQuery } from '../services/hotelApi';

function MyBookingsPage() {
  const userId = useSelector((state) => state.user._id);

  const { data, isLoading, isError } = useGetUserBookingsQuery(userId, {
    skip: !userId,
  });

  const bookings = data?.data || [];

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={4} textAlign="center">
        My Bookings
      </Typography>

      {!userId ? (
        <Alert severity="warning">You must be signed in to view your bookings.</Alert>
      ) : isLoading ? (
        <Box textAlign="center" py={8}>
          <CircularProgress />
          <Typography mt={2}>Fetching your bookings...</Typography>
        </Box>
      ) : isError ? (
        <Alert severity="error">Failed to load bookings. Please try again later.</Alert>
      ) : bookings.length === 0 ? (
        <Alert severity="info">No bookings found.</Alert>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => {
            const hotelBooking = booking.bookingConfirmation?.hotelBookings?.[0];
            const hotel = hotelBooking?.hotel;
            const offer = hotelBooking?.hotelOffer;
            const status = hotelBooking?.bookingStatus || 'UNKNOWN';
            const total = offer?.price?.total || 'N/A';

            const isConfirmed = status === 'CONFIRMED';

            return (
              <Grid item xs={12} key={booking._id}>
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <Typography variant="h6" fontWeight={600}>
                          <HotelIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                          {hotel?.name || 'Hotel Name'}
                        </Typography>

                        {hotel?.address?.lines?.[0] && (
                          <Typography variant="body2" color="text.secondary" mt={0.5}>
                            <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            {hotel?.address?.lines?.join(', ')}
                          </Typography>
                        )}

                        <Typography variant="body2" mt={1}>
                          <CalendarMonthIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          {offer?.checkInDate} to {offer?.checkOutDate}
                        </Typography>

                        <Typography variant="body2">
                          <CurrencyRupeeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          {total}
                        </Typography>

                        <Typography variant="body2">
                          Booking ID: <strong>{hotelBooking?.id || 'N/A'}</strong>
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={4} textAlign={{ xs: 'left', sm: 'right' }}>
                        <Chip
                          icon={
                            isConfirmed ? (
                              <CheckCircleOutlineIcon />
                            ) : (
                              <CancelIcon />
                            )
                          }
                          label={status}
                          color={isConfirmed ? 'success' : 'warning'}
                          variant="outlined"
                          sx={{ fontWeight: 600, mt: { xs: 2, sm: 0 } }}
                        />
                      </Grid>
                    </Grid>
                    <Divider sx={{ mt: 2 }} />
                    <Typography variant="body2" color="text.secondary" mt={2}>
                      Reserved for {offer?.guests?.adults || 1} adult(s) • Room Type: {offer?.room?.type || 'N/A'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}

export default MyBookingsPage;
