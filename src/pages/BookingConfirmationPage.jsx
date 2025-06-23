import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Card, CardContent, Typography, Button,
  Divider, Grid, Paper
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';

function BookingConfirmationPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { hotelInfo, offer, searchPayload, guests } = state || {};

  useEffect(() => {
    // Redirect if essential data is missing (basic check for navigation integrity)
    if (!hotelInfo || !offer || !guests) {
      navigate('/');
    }
  }, [hotelInfo, offer, guests, navigate]);

  return (
    <Box sx={{
      minHeight: '100vh',
      py: { xs: 4, md: 8 },
      px: { xs: 2, md: 6 },
      bgcolor: '#e0f7fa', // Light blue background for a fresh feel
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Paper elevation={6} sx={{
        maxWidth: '1200px',
        width: '100%',
        borderRadius: '16px',
        p: { xs: 3, md: 6 },
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 4, // Spacing between major sections
      }}>
        {/* Confirmation Header */}
        <Box textAlign="center" mb={4}>
          <CheckCircleIcon sx={{ fontSize: 90, color: '#4caf50', animation: 'scale-in 0.5s ease-out' }} />
          <Typography variant="h3" component="h1" fontWeight={700} mt={2} color="#212121">
            Booking Confirmed!
          </Typography>
          <Typography variant="h6" color="text.secondary" mt={1}>
            Your adventure awaits! Here's a summary of your reservation.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Hotel & Booking Details */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: '12px', bgcolor: '#ffffff', border: '1px solid #e0e0e0', height: '100%' }}>
              <CardContent>
                <Typography variant="h5" fontWeight={600} color="#00796b" mb={2}>
                  <LocationOnIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Hotel & Booking Details
                </Typography>
                <Divider sx={{ mb: 2, borderColor: '#e0f2f7' }} />
                <Typography variant="body1" mb={1}>
                  <strong>Hotel:</strong> <span style={{ color: '#3f51b5', fontWeight: 600 }}>{hotelInfo?.name || 'Hotel Name'}</span>
                </Typography>
                <Typography variant="body1" mb={1}>
                  <strong>Room Type:</strong> {offer?.roomInformation?.typeEstimated?.category?.replace(/_/g, ' ') || 'Standard Room'}
                </Typography>
                <Typography variant="body1" mb={1}>
                  <CalendarTodayIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 1, color: '#42a5f5' }} />
                  <strong>Check-in:</strong> {searchPayload?.checkInDate || 'N/A'}
                </Typography>
                <Typography variant="body1" mb={1}>
                  <CalendarTodayIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 1, color: '#42a5f5' }} />
                  <strong>Check-out:</strong> {searchPayload?.checkOutDate || 'N/A'}
                </Typography>
                <Typography variant="body1" mb={1}>
                  <GroupIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 1, color: '#ff9800' }} />
                  <strong>Guests:</strong> {searchPayload?.adults || '1'} Adult(s){searchPayload?.children > 0 ? `, ${searchPayload.children} Children` : ''}
                </Typography>
                <Typography variant="h5" color="#e64a19" mt={3} fontWeight={700}>
                  Total Price: ₹{offer?.price?.total || '0.00'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Guest Information */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: '12px', bgcolor: '#ffffff', border: '1px solid #e0e0e0', height: '100%' }}>
              <CardContent>
                <Typography variant="h5" fontWeight={600} color="#00796b" mb={2}>
                  <PersonIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Guest Information
                </Typography>
                <Divider sx={{ mb: 2, borderColor: '#e0f2f7' }} />
                {guests?.length > 0 ? (
                  guests.map((guest, index) => (
                    <Box key={index} mb={2} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: '8px', border: '1px dashed #bdbdbd' }}>
                      <Typography variant="body1" fontWeight={600}>
                        {guest.title} {guest.firstName} {guest.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">Email: {guest.email}</Typography>
                      <Typography variant="body2" color="text.secondary">Phone: {guest.phone}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body1" color="text.secondary">Guest details not available.</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Payment Summary */}
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: '12px', bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <CardContent>
                <Typography variant="h5" fontWeight={600} color="#00796b" mb={2}>
                  <CreditCardIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Payment Summary
                </Typography>
                <Divider sx={{ mb: 2, borderColor: '#e0f2f7' }} />
                <Typography variant="body1" color="text.primary" mb={1}>
                  Payment for this booking has been **successfully processed**.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A detailed invoice and confirmation email has been sent to your provided email address.
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  For any payment-related queries, please refer to your email or contact support.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Action Button */}
          <Grid item xs={12} textAlign="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/')}
              sx={{
                bgcolor: '#00bcd4', // Teal color for button
                '&:hover': {
                  bgcolor: '#0097a7',
                },
                px: 5,
                py: 1.5,
                borderRadius: '8px',
                fontWeight: 600,
                boxShadow: '0 4px 10px rgba(0, 188, 212, 0.3)',
              }}
            >
              Back to Home
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default BookingConfirmationPage;