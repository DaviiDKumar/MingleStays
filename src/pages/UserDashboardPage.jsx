import React from 'react';
import { Box, Typography, Button, Paper, Grid, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HotelIcon from '@mui/icons-material/Hotel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';

function UserDashboardPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // from Redux
  const displayName = user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Guest';

  return (
    <Box sx={{ mt: 10, px: { xs: 2, md: 6 }, py: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          textAlign: 'center',
          backgroundColor: '#fdfdfd',
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Avatar
              src={user?.imageUrl}
              alt={displayName}
              sx={{ width: 80, height: 80 }}
            >
              <DashboardIcon fontSize="large" />
            </Avatar>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Welcome, {displayName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage your travel bookings and account information
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<HotelIcon />}
              sx={{ py: 1.5, borderRadius: 2 }}
              onClick={() => navigate('/my-bookings')}
            >
              View My Bookings
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              size="large"
              startIcon={<AccountCircleIcon />}
              sx={{ py: 1.5, borderRadius: 2 }}
              onClick={() => alert('Coming soon: Edit Profile')}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="text"
              color="error"
              fullWidth
              size="large"
              startIcon={<LogoutIcon />}
              sx={{ py: 1.5, borderRadius: 2 }}
              onClick={() => alert('Logout logic here')}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default UserDashboardPage;
