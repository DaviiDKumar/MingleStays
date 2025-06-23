import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SSOCallbackPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        navigate('/user-dashboard', { replace: true });
      } else {
        navigate('/sign-in', { replace: true });
      }
    }
  }, [isSignedIn, isLoaded, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      textAlign="center"
    >
      <CircularProgress />
      <Typography variant="h6" mt={2}>
        Processing authentication...
      </Typography>
    </Box>
  );
}
