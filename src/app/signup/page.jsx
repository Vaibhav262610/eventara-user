// components/page.js
"use client"
import Particles from '@/components/ui/Particles';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const page = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter(); // Initialize useRouter

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        // Perform sign-up API call here
        try {
            // Assuming an API call to your sign-up endpoint
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (data.success) {
                // Show success toast
                toast.success('Account created successfully!');
                // Redirect to the discover page
                router.push('/login'); // Redirect to the discover page
            } else {
                setErrorMessage(data.error || 'Sign-up failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred');
        }
    };

    return (
        <div className="relative min-h-screen flex justify-center items-center">
            {/* Particles Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                <Particles
                    particleColors={['#ffffff', '#ffffff']}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>

            {/* Sign-up Form */}
            <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6 text-teal-500">Sign up to Eventara</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={username}
                            placeholder='username'
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={email}
                            placeholder='email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={password}
                            placeholder='password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmed-password" className="block text-sm font-medium text-gray-700">Confirmed Password</label>
                        <input
                            type="password"
                            id="confirmed-password"
                            className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={confirmPassword}
                            placeholder='confirmed password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
                    >
                        Create Account
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account? <a href="/login" className="text-teal-500 hover:text-teal-600">Log in</a>
                    </p>
                </div>
            </div>

            {/* Toast container */}
            <ToastContainer /> {/* Correct placement */}
        </div>
    );
};

export default page;
