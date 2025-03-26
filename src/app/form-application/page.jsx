"use client"

import withAuth from "@/lib/withAuth";
import React, { useState } from "react";

const page = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        education: "",
        experience: "",
        linkedin: "",
        portfolio: "",
        motivation: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg font-sans">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Event Registration</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Full Name</label>
                    <input type="text" name="fullName" onChange={handleChange} className="w-full p-3 border rounded-lg mt-1" required />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input type="email" name="email" onChange={handleChange} className="w-full p-3 border rounded-lg mt-1" required />
                </div>
                <div>
                    <label className="block text-gray-700">Phone Number</label>
                    <input type="text" name="phone" onChange={handleChange} className="w-full p-3 border rounded-lg mt-1" required />
                </div>
                <div>
                    <label className="block text-gray-700">Education</label>
                    <input type="text" name="education" onChange={handleChange} className="w-full p-3 border rounded-lg mt-1" />
                </div>
                <div>
                    <label className="block text-gray-700">Work Experience (if any)</label>
                    <input type="text" name="experience" onChange={handleChange} className="w-full p-3 border rounded-lg mt-1" />
                </div>
                <div>
                    <label className="block text-gray-700">LinkedIn Profile</label>
                    <input type="url" name="linkedin" onChange={handleChange} className="w-full p-3 border rounded-lg mt-1" />
                </div>
                <div>
                    <label className="block text-gray-700">Portfolio/Website (if any)</label>
                    <input type="url" name="portfolio" onChange={handleChange} className="w-full p-3 border rounded-lg mt-1" />
                </div>
                <div>
                    <label className="block text-gray-700">Why do you want to join this event?</label>
                    <textarea name="motivation" onChange={handleChange} className="w-full p-3 border rounded-lg mt-1" rows="4"></textarea>
                </div>
                <button type="submit" className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700">Submit</button>
            </form>
        </div>
    );
};

export default withAuth(page);
