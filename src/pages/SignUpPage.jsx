

import { useState } from 'react';
import { useSignUp, useAuth } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { MdHotel, MdFlight, MdEvent } from 'react-icons/md';
import { callBackendApi } from '../utils/api'; // You must have this helper

const SignUpPage = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [verificationStrategy, setVerificationStrategy] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const INDIAN_PHONE_PREFIX = '+91';
    const INDIA_COUNTRY_NAME = 'India';

   
    const syncUserWithBackend = async (clerkUser) => {
        try {
            const token = await getToken();
            if (!token) throw new Error('Clerk token missing');

            const payload = {
                clerkId: clerkUser.id,
                email: clerkUser.primaryEmailAddress?.emailAddress || null,
                firstName: clerkUser.firstName || null,
                lastName: clerkUser.lastName || null,
                phone: clerkUser.primaryPhoneNumber?.phoneNumber || null,
                imageUrl: clerkUser.imageUrl || null,
                name: `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim(),
            };

            // Check if user exists
            const existsRes = await callBackendApi(
                `/auth/user-exists?clerkId=${clerkUser.id}`,
                'GET',
                null,
                token
            );

            if (!existsRes.exists) {
                await callBackendApi('/auth/signup', 'POST', payload, token);
            }

            await callBackendApi('/auth/loginsync', 'POST', payload, token);
            navigate('/userdashboard');
        } catch (err) {
            console.error('Sync error:', err);
            setError('Backend sync failed. Try again.');
            navigate('/userdashboard'); // still allow dashboard entry
        }
    };

    const handleEmailPasswordSignUp = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
            setError('Enter valid 10-digit Indian phone number.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const payload = {
                emailAddress,
                password,
                username,
                firstName,
                lastName,
                ...(phoneNumber && { phoneNumber: `${INDIAN_PHONE_PREFIX}${phoneNumber}` }),
            };

            const result = await signUp.create(payload);

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                await syncUserWithBackend(result.createdSession.user);
            } else if (result.unverifiedFields.includes('email_address')) {
                await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
                setVerificationStrategy('email_code');
                setPendingVerification(true);
            } else if (result.unverifiedFields.includes('phone_number')) {
                await signUp.preparePhoneNumberVerification({ strategy: 'phone_code' });
                setVerificationStrategy('phone_code');
                setPendingVerification(true);
            } else {
                setError('Sign-up incomplete. Check all inputs.');
            }
        } catch (err) {
            setError(err?.errors?.[0]?.longMessage || 'Error during sign-up.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let completeSignUp;
            if (verificationStrategy === 'email_code') {
                completeSignUp = await signUp.attemptEmailAddressVerification({ code });
            } else if (verificationStrategy === 'phone_code') {
                completeSignUp = await signUp.attemptPhoneNumberVerification({ code });
            }

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                await syncUserWithBackend(completeSignUp.createdSession.user);
            } else {
                setError('Verification failed.');
            }
        } catch (err) {
            console.log("error",err)
            setError('Verification failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        if (!isLoaded) return;
        setLoading(true);
        setError('');
        try {
            await signUp.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/userdashboard',
            });
        } catch (err) {
            console.error(err);
            setError('Google Sign-Up failed.');
        } finally {
            setLoading(false);
        }
    };

    // You already have the full JSX structure – keep your design untouched here
    // Just replace the old logic handlers with these functions


    return (
        <div className="min-h-screen mt-13 flex items-center justify-center bg-gray-50 p-4">
            <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Left Div: Advertising */}
                <div className="hidden md:flex md:w-2/5 flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white relative overflow-hidden"
                    style={{ backgroundImage: `url('/signuppage1.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    {/* Frosted Glass Overlay */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }} // 80% black
                    />

                    <div className="text-center z-10">
                        <h2 className="text-4xl font-extrabold mb-4 alegreya-sc-regular leading-tight">
                            Mingle, Stay & Explore!
                        </h2>
                        <p className="text-lg mb-6 max-w-sm mx-auto">
                            Unlock a world of seamless bookings and unforgettable experiences.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-center gap-3 text-lg font-medium">
                                <MdHotel className="text-3xl" />
                                <span>Hotel Bookings</span>
                            </div>
                            <div className="flex items-center justify-center gap-3 text-lg font-medium">
                                <MdFlight className="text-3xl" />
                                <span>Flight Deals</span>
                            </div>
                            <div className="flex items-center justify-center gap-3 text-lg font-medium">
                                <MdEvent className="text-3xl" />
                                <span>Event Passes</span>
                            </div>
                        </div>

                        <Link
                            to="/sign-in"
                            className="mt-8 inline-flex items-center justify-center gap-2 text-white font-bold py-3 px-6 rounded passero-one-regular bg-blue-500 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Already a user? Sign In
                        </Link>
                    </div>
                    {/* Abstract shapes for background */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-60 h-60 bg-white opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Right Div: Sign-Up Form */}
                <div className="w-full md:w-3/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center items-center">
                    {!isLoaded ? (
                        <div className="text-center text-gray-500">Loading sign-up form...</div>
                    ) : (
                        <>
                            {!pendingVerification ? (
                                <form onSubmit={handleEmailPasswordSignUp} className="w-full max-w-lg">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center alegreya-sc-regular">
                                        Create Your Account
                                    </h2>
                                    <p className="text-gray-600 text-base mb-6 text-center">
                                        Welcome! Please fill in the details to get started.
                                    </p>

                                    {error && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 w-full" role="alert">
                                            <span className="block sm:inline">{error}</span>
                                        </div>
                                    )}

                                    {/* Google Sign-Up Button */}
                                    <button
                                        onClick={handleGoogleSignUp}
                                        type="button"
                                        className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md w-full mb-4 hover:bg-gray-50 transition duration-200"
                                        disabled={loading}
                                    >
                                        {loading && (
                                            <svg className="animate-spin h-5 w-5 mr-3 text-gray-700" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        )}
                                        Continue with Google
                                    </button>

                                    {/* "or" separator */}
                                    <div className="flex items-center w-full mb-4">
                                        <div className="flex-grow border-t border-gray-300"></div>
                                        <span className="flex-shrink mx-4 text-gray-500">or</span>
                                        <div className="flex-grow border-t border-gray-300"></div>
                                    </div>

                                    {/* First Name & Last Name in one row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                                                First name
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                disabled={loading}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                                                Last name
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                disabled={loading}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Username (single field, spans full width) */}
                                    <div className="mb-4">
                                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            disabled={loading}
                                            required
                                        />
                                    </div>

                                    {/* Email Address & Phone Number in one row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                                Email address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                value={emailAddress}
                                                onChange={(e) => setEmailAddress(e.target.value)}
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                                                Phone number <span className="text-gray-500 text-xs">(Required, {INDIA_COUNTRY_NAME} only)</span>
                                            </label>
                                            <div className="flex items-center shadow appearance-none border rounded w-full">
                                                <span className="py-2 px-3 text-gray-700 leading-tight border-r border-gray-200">
                                                    {INDIAN_PHONE_PREFIX}
                                                </span>
                                                <input
                                                    type="tel"
                                                    id="phoneNumber"
                                                    className="flex-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    value={phoneNumber}
                                                    onChange={(e) => {
                                                        const re = /^[0-9\b]+$/;
                                                        if (e.target.value === '' || (re.test(e.target.value) && e.target.value.length <= 10)) {
                                                            setPhoneNumber(e.target.value);
                                                        }
                                                    }}
                                                    placeholder="e.g., 9876543210"
                                                    disabled={loading}
                                                    required
                                                />
                                            </div>
                                            <p className="text-gray-500 text-xs mt-1">
                                                Please enter a 10-digit {INDIA_COUNTRY_NAME} phone number.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Password & Confirm Password in one row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                disabled={loading}
                                            />
                                            <p className="text-gray-500 text-xs mt-1">Your password meets all the necessary requirements.</p>
                                        </div>
                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Clerk CAPTCHA Element */}
                                    <div id="clerk-captcha" className="mb-4"></div>

                                    {/* Continue Button */}
                                    <div className="flex items-center justify-between mt-6 w-full">
                                        <button
                                            type="submit"
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                            disabled={loading}
                                        >
                                            {loading && (
                                                <svg className="animate-spin h-5 w-5 mr-3 text-white inline-block" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            )}
                                            Continue
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={handleVerify} className="w-full max-w-sm mx-auto p-4">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                        Verify Your Account
                                    </h2>
                                    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                                    <p className="text-gray-700 text-center mb-4">
                                        {verificationStrategy === 'email_code'
                                            ? `A verification code has been sent to your email address: ${emailAddress}. Please check your inbox (and spam/junk folders).`
                                            : `A verification code has been sent to your phone number: ${phoneNumber}. Please check your SMS messages.`
                                        }
                                    </p>
                                    <div className="mb-4 w-full">
                                        <label htmlFor="code" className="block text-gray-700 text-sm font-bold mb-2">
                                            Verification Code
                                        </label>
                                        <input
                                            type="text"
                                            id="code"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center text-lg tracking-widest"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <button
                                            type="submit"
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                            disabled={loading}
                                        >
                                            {loading && (
                                                <svg className="animate-spin h-5 w-5 mr-3 text-white inline-block" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            )}
                                            Verify
                                        </button>
                                    </div>
                                </form>
                            )}
                        </>
                    )}

                    {/* Moved "Already have an account?" link to the left div, but keeping it here for smaller screens */}
                    <p className="mt-6 text-center text-gray-600 text-base md:hidden">
                        Already have an account?{' '}
                        <Link
                            to="/sign-in"
                            className="text-blue-600 hover:text-blue-800 font-bold transition-colors duration-200 underline"
                        >
                            Sign In
                        </Link>
                    </p>

                    {/* Secured by Clerk */}
                    <p className="mt-4 text-xs text-gray-400 text-center">
                        Secured by <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Clerk</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;