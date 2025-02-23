"use client"
import Particles from '@/components/ui/Particles'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css'; // Import the toast CSS

const page = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch("api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Check if token exists in the response
                if (!data.token) {
                    toast.error("Login failed: No token received");
                    return;
                }

                // Store token in localStorage (for accessing token on client-side)
                localStorage.setItem("authToken", data.token);

                // Store token in cookies (valid for 30 mins)
                document.cookie = `authToken=${data.token}; path=/; max-age=1800; Secure; SameSite=Strict`; // Added Secure and SameSite for better cookie security

                toast.success("Login successful!");

                // Redirect to Discover page after a short delay
                setTimeout(() => {
                    window.location.href = "/discover";
                }, 1500);
            } else {
                toast.error(data.error || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong. Please try again.");
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

            {/* Login Form */}
            <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6 text-teal-500">Login to Eventara</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={email}
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
                    >
                        Log In
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account? <a href="/signup" className="text-teal-500 hover:text-teal-600">Sign up</a>
                    </p>
                </div>
            </div>

            {/* Toast container */}
            <ToastContainer /> {/* Correct placement */}
        </div>
    )
}

export default page
