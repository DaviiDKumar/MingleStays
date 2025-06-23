import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignIn } from '@clerk/clerk-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { MdTravelExplore } from 'react-icons/md';
import CircularProgress from '@mui/material/CircularProgress';

const SignInPage = () => {
  
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_AUTH_API_URL
  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError('');

    try {
      const result = await signIn.create({ identifier, password });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });

        const token = await window.Clerk?.session?.getToken();
        const user = await window.Clerk?.user;

        if (!token || !user) throw new Error('Token or user data missing');

        const firstName = user.firstName || '';
        const lastName = user.lastName || '';
        const email = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || '';
        const phone = user?.phoneNumbers?.[0]?.phoneNumber || '';
        const imageUrl = user.imageUrl || '';

        const userPayload = {
          name: `${firstName} ${lastName}`.trim(),
          firstName,
          lastName,
          email,
          phone,
          imageUrl,
        };

        const syncRes = await axios.post(
         `${API_BASE_URL}/api/auth/loginsync`,
          userPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(setUserData(syncRes.data?.user));

        // ✅ Redirect to previous intended path
        const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/user-dashboard';
        navigate(redirectPath, { replace: true });
        sessionStorage.removeItem('redirectAfterLogin');

      } else {
        setError('Sign-in incomplete. Please check your credentials or complete pending steps.');
      }
    } catch (err) {
      console.error('Error during sign-in:', err);
      setError(
        err?.response?.data?.message ||
        err?.errors?.[0]?.longMessage ||
        'An unexpected error occurred.'
      );
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError('');

    try {
      // Store current URL path before redirect
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);

      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback', // Static
      });
    } catch (err) {
      console.error('Error during Google sign-in:', err);
      setError('Failed to sign in with Google. Please try again.');
      setLoading(false);
    }
  };


  return (
    <div className="h-[90vh] mt-16 flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="flex flex-col md:flex-row items-stretch justify-center w-full max-w-7xl md:max-h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden">

        {/* Left Visual */}
        <div
          className="hidden md:flex flex-col items-center justify-center p-8 flex-1 h-[90vh] relative bg-cover bg-center"
          style={{ backgroundImage: `url('/signuppage.jpg')` }}
        >
          <div className="absolute inset-0 z-0 bg-black opacity-80" />
          <div className="relative z-10 text-center px-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white alegreya-sc-regular drop-shadow-lg">
                <span className="bg-gradient-to-r from-blue-300 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Your Next Adventure
                </span>{" "}Awaits
              </h1>
              <MdTravelExplore className="text-blue-300 text-5xl animate-bounce drop-shadow-md" />
            </div>
            <p className="text-gray-200 text-lg md:text-xl max-w-xl mx-auto font-medium leading-relaxed drop-shadow-sm">
              Sign in to <strong className="text-white">manage bookings</strong>, discover <strong className="text-white">personalized offers</strong>, and connect with a <strong className="text-white">global community</strong>.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 w-full md:flex-1 h-full md:overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center alegreya-sc-regular">
            Sign in to Hotel Booking
          </h2>
          <p className="text-gray-600 text-base mb-6 text-center">
            Welcome back! Please sign in to continue.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 w-full max-w-sm">
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md w-full max-w-sm mb-4 hover:bg-gray-50 transition duration-200"
            disabled={loading}
          >
            {loading && !identifier ? (
              <CircularProgress size={18} />
            ) : (
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="h-5 w-5" />
            )}
            Continue with Google
          </button>

          <div className="flex items-center w-full max-w-sm mb-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleEmailPasswordSignIn} className="w-full max-w-sm">
            <div className="mb-4">
              <label htmlFor="identifier" className="block text-gray-700 text-sm font-bold mb-2">
                Email address or username
              </label>
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                required
                disabled={loading}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
              disabled={loading}
            >
              {loading && identifier && (
                <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
              )}
              Continue
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-base">
            Don’t have an account?{" "}
            <Link to="/sign-up" className="text-blue-600 hover:text-blue-800 font-bold underline">
              Sign up
            </Link>
          </p>

          <p className="mt-4 text-xs text-gray-400 text-center">
            Secured by <a href="https://clerk.com" className="hover:underline">Clerk</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
