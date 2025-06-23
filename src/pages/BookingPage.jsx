import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Grid, Card, CardContent, Typography, TextField, Button,
  MenuItem, Divider, Box, Paper, Snackbar, Alert, useMediaQuery, useTheme
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';
import HotelIcon from '@mui/icons-material/Hotel';
import EventAvailableIcon from '@mui/icons-material/EventAvailable'; // New icon for dates
import PeopleIcon from '@mui/icons-material/People'; // New icon for guests

import {
  useLazyGetHotelOfferByIdQuery,
  useBookHotelMutation,
} from '../services/hotelApi';

// Dummy data for selections
const titles = ['MR', 'MRS', 'MS', 'MSTR', 'DR']; // Added DR
const cardVendors = ['VISA', 'MASTERCARD', 'AMEX']; // More descriptive names

function BookingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { hotelInfo, offer, searchPayload } = state || {};

  const userId = useSelector((state) => state.user._id); // Assuming this is valid for dummy flow

  // Determine number of guests based on searchPayload, default to 1
  const numGuests = parseInt(searchPayload?.adults || '1');

  // State for guest information
  const [guests, setGuests] = useState(() =>
    Array.from({ length: numGuests }).map(() => ({
      title: 'MR',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    }))
  );

  // State for dummy payment information
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'CREDIT_CARD',
    card: {
      vendorCode: 'VISA', // Default to a more descriptive name
      cardNumber: '',
      expiryDate: '', // Format YYYY-MM
      holderName: '',
    },
  });

  // State for form validation errors
  const [formErrors, setFormErrors] = useState({});

  const [errorSnackbar, setErrorSnackbar] = useState(null);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  // RTK Query hooks
  const [triggerCheckOffer] = useLazyGetHotelOfferByIdQuery();
  const [bookHotel] = useBookHotelMutation();

  // Redirect if essential data is missing
  useEffect(() => {
    if (!hotelInfo || !offer || !searchPayload) {
      console.warn("Missing hotelInfo, offer, or searchPayload. Redirecting.");
      navigate('/');
    }
  }, [hotelInfo, offer, searchPayload, navigate]);

  // Handle changes in guest input fields
  const handleGuestChange = (index, field, value) => {
    const updated = [...guests];
    updated[index][field] = value;
    setGuests(updated);
    // Clear validation error for this field
    setFormErrors(prev => {
      const newErrors = { ...prev };
      if (newErrors[`guest-${index}-${field}`]) {
        delete newErrors[`guest-${index}-${field}`];
      }
      return newErrors;
    });
  };

  // Handle changes in payment input fields
  const handlePaymentChange = (field, value) => {
    setPaymentInfo((prev) => ({
      ...prev,
      card: {
        ...prev.card,
        [field]: value,
      },
    }));
    // Clear validation error for this field
    setFormErrors(prev => {
      const newErrors = { ...prev };
      if (newErrors[`payment-${field}`]) {
        delete newErrors[`payment-${field}`];
      }
      return newErrors;
    });
  };

  // Basic client-side validation
  const validateForm = () => {
    let isValid = true;
    const errors = {};

    guests.forEach((guest, index) => {
      if (!guest.firstName.trim()) { errors[`guest-${index}-firstName`] = 'First name is required'; isValid = false; }
      if (!guest.lastName.trim()) { errors[`guest-${index}-lastName`] = 'Last name is required'; isValid = false; }
      if (!guest.phone.trim()) { errors[`guest-${index}-phone`] = 'Phone is required'; isValid = false; }
      // Basic email regex for dummy data
      if (!guest.email.trim() || !/\S+@\S+\.\S+/.test(guest.email)) { errors[`guest-${index}-email`] = 'Valid email is required'; isValid = false; }
    });

    if (!paymentInfo.card.cardNumber.trim()) { errors['payment-cardNumber'] = 'Card number is required'; isValid = false; }
    // Dummy card number validation: 16 digits
    else if (!/^\d{16}$/.test(paymentInfo.card.cardNumber)) { errors['payment-cardNumber'] = 'Card number must be 16 digits'; isValid = false; }

    if (!paymentInfo.card.expiryDate.trim()) { errors['payment-expiryDate'] = 'Expiry date is required (YYYY-MM)'; isValid = false; }
    // Dummy expiry date validation: YYYY-MM and in future
    else {
      const [year, month] = paymentInfo.card.expiryDate.split('-').map(Number);
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed

      if (!year || !month || month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth)) {
        errors['payment-expiryDate'] = 'Invalid or past expiry date (YYYY-MM)';
        isValid = false;
      }
    }

    if (!paymentInfo.card.holderName.trim()) { errors['payment-holderName'] = 'Cardholder name is required'; isValid = false; }

    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorSnackbar('Please fill in all required fields correctly.');
      return;
    }

    // Since this is dummy data, the focus is on UI and flow.
    // In a real app, payment processing would happen here via a payment gateway SDK.

    setErrorSnackbar(null);
    setSuccessSnackbar(false);

    const offerId = offer.id;
    const bookingData = {
      userId,
      offerId,
      guests,
      // NOTE: In a real app, paymentInfo would *NOT* contain raw card details.
      // It would send a secure token from a payment gateway.
      paymentInfo, // Keeping for dummy data flow to confirmation page
    };

    try {
      // Simulate offer validation and booking API calls
      // In a real app, `triggerCheckOffer` would validate offer on backend
      // `bookHotel` would call backend to complete booking and payment via gateway
      const offerCheckResult = await triggerCheckOffer(offerId).unwrap();
      if (offerCheckResult?.status !== 'success') {
        throw new Error('Offer validation failed. It might be expired or unavailable.');
      }

      // Simulate booking success
      const bookResult = await bookHotel(bookingData).unwrap();
      if (bookResult?.status === 'success') {
        setSuccessSnackbar(true);
        setTimeout(() => {
          navigate('/confirmation', {
            state: {
              hotelInfo,
              offer,
              searchPayload,
              guests,
              // For dummy data, passing paymentInfo for display.
              // In real app, only non-sensitive payment confirmation (e.g., last4, transactionId)
              // would be passed/fetched from backend.
              paymentInfo,
              confirmation: bookResult?.data?.booking, // Dummy confirmation data
            },
          });
        }, 1500);
      } else {
        throw new Error(bookResult?.message || 'Booking failed for an unknown reason.');
      }
    } catch (err) {
      console.error("Booking process error:", err);
      setErrorSnackbar(err.message || 'An unexpected error occurred during booking. Please try again.');
    }
  };

  if (!hotelInfo || !offer || !searchPayload) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        bgcolor: '#f9fafb',
        px: 2
      }}>
        <Alert severity="error" sx={{ width: 'fit-content', p: 3, borderRadius: 2 }}>
          Missing essential booking data. Please return to the hotel details page.
          <Button onClick={() => navigate('/')} sx={{ mt: 2 }} variant="outlined">Go Home</Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, bgcolor: '#f0f2f5', minHeight: '100vh' }}>
      {/* Snackbars for alerts */}
      <Snackbar open={!!errorSnackbar} autoHideDuration={6000} onClose={() => setErrorSnackbar(null)}>
        <Alert severity="error" onClose={() => setErrorSnackbar(null)} sx={{ width: '100%' }}>
          {errorSnackbar}
        </Alert>
      </Snackbar>
      <Snackbar open={successSnackbar} autoHideDuration={3000} onClose={() => setSuccessSnackbar(false)}>
        <Alert severity="success" onClose={() => setSuccessSnackbar(false)} sx={{ width: '100%' }}>
          Booking confirmed! Redirecting...
        </Alert>
      </Snackbar>

      <Typography
        variant="h4"
        component="h1"
        fontWeight={700}
        align="center"
        gutterBottom
        sx={{ mb: 6, color: '#3f51b5' }} // Darker blue for heading
      >
        Finalize Your Reservation
      </Typography>

      <Grid container spacing={isMobile ? 3 : 4}> {/* Adjusted spacing based on mobile */}
        {/* Booking Summary - Always a single column */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={4}
            sx={{
              borderRadius: 3,
              p: 3,
              bgcolor: '#e3f2fd', // Light blue background for summary
              border: '1px solid #90caf9', // Blue border
              height: '100%', // Ensure it fills height in grid
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#1976d2' }}>
                <HotelIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} /> Your Booking At
              </Typography>
              <Typography variant="h5" fontWeight={800} sx={{ color: '#3f51b5', mb: 2 }}>
                {hotelInfo.name}
              </Typography>
              <Divider sx={{ mb: 2, borderColor: '#bbdefb' }} />
              <Typography variant="body1" mb={1}>
                <strong>Room Type:</strong> <span style={{ fontWeight: 600 }}>{offer.roomInformation?.typeEstimated?.category?.replace(/_/g, ' ') || 'Not Specified'}</span>
              </Typography>
              <Typography variant="body1" mb={1}>
                <EventAvailableIcon sx={{ fontSize: 18, mr: 1, verticalAlign: 'bottom', color: '#4caf50' }} />
                <strong>Check-in:</strong> <span style={{ color: '#388e3c' }}>{searchPayload?.checkInDate}</span>
              </Typography>
              <Typography variant="body1" mb={1}>
                <EventAvailableIcon sx={{ fontSize: 18, mr: 1, verticalAlign: 'bottom', color: '#f44336' }} />
                <strong>Check-out:</strong> <span style={{ color: '#d32f2f' }}>{searchPayload?.checkOutDate}</span>
              </Typography>
              <Typography variant="body1" mb={1}>
                <PeopleIcon sx={{ fontSize: 18, mr: 1, verticalAlign: 'bottom', color: '#ff9800' }} />
                <strong>Guests:</strong> {searchPayload?.adults} Adult(s){searchPayload?.children > 0 ? `, ${searchPayload.children} Child(ren)` : ''}
              </Typography>
            </Box>
            <Box mt={3} p={2} bgcolor="#fff8e1" borderRadius={2} border="1px dashed #ffe082">
              <Typography variant="h5" fontWeight={700} color="#e65100">
                Total Price: ₹{offer.price?.total || '0.00'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                (Inclusive of all taxes and fees)
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Guest Details & Payment Info - Parallel on desktop, stacked on mobile */}
        <Grid item xs={12} md={8}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={isMobile ? 3 : 4}>
              {/* Guest Details */}
              <Grid item xs={12} md={6}>
                <Card elevation={4} sx={{ borderRadius: 3, p: 2, bgcolor: '#ffffff', height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#00796b' }}>
                      <PersonIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} /> Guest Details
                    </Typography>
                    <Divider sx={{ mb: 3, borderColor: '#e0f2f7' }} />
                    {guests.map((guest, index) => (
                      <Box key={index} mb={3} p={2} sx={{ bgcolor: '#f5f5f5', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                        <Typography variant="subtitle1" fontWeight={600} mb={2} color="#424242">
                          Guest {index + 1}
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              select
                              label="Title"
                              value={guest.title}
                              fullWidth
                              onChange={(e) => handleGuestChange(index, 'title', e.target.value)}
                              variant="outlined"
                              size="small"
                            >
                              {titles.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="First Name"
                              value={guest.firstName}
                              onChange={(e) => handleGuestChange(index, 'firstName', e.target.value)}
                              fullWidth required
                              variant="outlined"
                              size="small"
                              error={!!formErrors[`guest-${index}-firstName`]}
                              helperText={formErrors[`guest-${index}-firstName`]}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Last Name"
                              value={guest.lastName}
                              onChange={(e) => handleGuestChange(index, 'lastName', e.target.value)}
                              fullWidth required
                              variant="outlined"
                              size="small"
                              error={!!formErrors[`guest-${index}-lastName`]}
                              helperText={formErrors[`guest-${index}-lastName`]}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Phone Number"
                              type="tel"
                              value={guest.phone}
                              onChange={(e) => handleGuestChange(index, 'phone', e.target.value)}
                              fullWidth required
                              variant="outlined"
                              size="small"
                              error={!!formErrors[`guest-${index}-phone`]}
                              helperText={formErrors[`guest-${index}-phone`]}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Email Address"
                              type="email"
                              value={guest.email}
                              onChange={(e) => handleGuestChange(index, 'email', e.target.value)}
                              fullWidth required
                              variant="outlined"
                              size="small"
                              error={!!formErrors[`guest-${index}-email`]}
                              helperText={formErrors[`guest-${index}-email`]}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>

              {/* Payment Info */}
              <Grid item xs={12} md={6}>
                <Card elevation={4} sx={{ borderRadius: 3, p: 2, bgcolor: '#ffffff', height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#d32f2f' }}>
                      <CreditCardIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} /> Payment Information
                    </Typography>
                    <Divider sx={{ mb: 3, borderColor: '#ffe0b2' }} />
                    <Typography variant="body2" color="text.secondary" mb={3}>
                      (Using dummy payment gateway. No real transaction will occur.)
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          select
                          label="Card Type"
                          value={paymentInfo.card.vendorCode}
                          fullWidth
                          onChange={(e) => handlePaymentChange('vendorCode', e.target.value)}
                          variant="outlined"
                          size="small"
                        >
                          {cardVendors.map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Card Number (Dummy)"
                          value={paymentInfo.card.cardNumber}
                          onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                          fullWidth required
                          variant="outlined"
                          size="small"
                          inputProps={{ maxLength: 16 }} // Enforce 16 digits
                          error={!!formErrors['payment-cardNumber']}
                          helperText={formErrors['payment-cardNumber']}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Expiry Date (YYYY-MM)"
                          placeholder="e.g., 2028-12"
                          value={paymentInfo.card.expiryDate}
                          onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                          fullWidth required
                          variant="outlined"
                          size="small"
                          error={!!formErrors['payment-expiryDate']}
                          helperText={formErrors['payment-expiryDate']}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Cardholder Name"
                          value={paymentInfo.card.holderName}
                          onChange={(e) => handlePaymentChange('holderName', e.target.value)}
                          fullWidth required
                          variant="outlined"
                          size="small"
                          error={!!formErrors['payment-holderName']}
                          helperText={formErrors['payment-holderName']}
                        />
                      </Grid>
                      {/* You can add a dummy CVV field if desired, but not for real sensitive data */}
                      {/* <Grid item xs={12} sm={6}>
                        <TextField
                          label="CVV (Dummy)"
                          value={paymentInfo.card.cvv}
                          onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                          fullWidth required
                          variant="outlined"
                          size="small"
                          inputProps={{ maxLength: 3 }}
                        />
                      </Grid> */}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Confirm Booking Button */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  fullWidth
                  sx={{
                    py: 1.8,
                    borderRadius: 2,
                    mt: isMobile ? 2 : 0, // More top margin on mobile
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    backgroundColor: '#4caf50', // Green for action
                    '&:hover': {
                      backgroundColor: '#388e3c', // Darker green on hover
                      transform: 'translateY(-2px)', // Lift effect
                      boxShadow: '0 8px 16px rgba(0, 128, 0, 0.2)',
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  Confirm Booking
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BookingPage;