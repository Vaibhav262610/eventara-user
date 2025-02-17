// components/page.js
"use client"


import { useState } from 'react';

const page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform login API call here
        try {
            // Assuming an API call to your login endpoint
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.success) {
                // Redirect to another page or update UI accordingly
                console.log('Logged in successfully');
            } else {
                setErrorMessage(data.error || 'Login failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 border rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-600 text-white font-semibold rounded-md"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-center text-sm">
                Don't have an account?{' '}
                <a href="/signup" className="text-blue-600">Sign up</a>
            </p>
        </div>
    );
};

export default page;
