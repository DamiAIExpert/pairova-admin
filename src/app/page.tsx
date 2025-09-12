'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// The component has been updated to remove Next.js specific imports ('next/image', 'next/navigation')
// to resolve compilation errors. Standard HTML elements and browser APIs are used instead.
export default function AdminLoginPage() {
  const [adminId, setAdminId] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    
    // In a real application, you would add your validation and authentication logic here.
    console.log('Logging in with:', { adminId, passcode });

    // Replaced Next.js router with standard window.location to handle redirection.
    window.location.href = '/admin/dashboard';
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      // Assuming you have a 'login-bg.png' in your /public directory
      style={{ backgroundImage: "url('/login-bg.png')" }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-[11px] shadow-lg px-10 py-12 w-[671px] max-w-full">
        {/* Logo + Heading */}
        <div className="flex flex-col items-center mb-8">
          {/* Using Next.js Image component */}
          <Image
            src="/logo.svg"
            alt="Pairova Logo"
            width={98}
            height={40}
            className="mb-2"
          />
          <h1 className="text-[32px] font-semibold text-black font-poppins">
            Admin Login
          </h1>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Admin ID */}
          <div>
            <label
              htmlFor="admin-id"
              className="block text-sm font-medium text-gray-800 mb-1 font-poppins"
            >
              Admin ID
            </label>
            <input
              id="admin-id"
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="Enter ID"
              required
              className="w-full h-[75px] px-4 border border-[#818181] rounded-[7px] text-black font-poppins placeholder:text-[#c4c4c4] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Passcode */}
          <div>
            <label
              htmlFor="passcode"
              className="block text-sm font-medium text-gray-800 mb-1 font-poppins"
            >
              Passcode
            </label>
            <input
              id="passcode"
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              required
              className="w-full h-[75px] px-4 border border-[#818181] rounded-[7px] text-black font-poppins placeholder:text-[#c4c4c4] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-[50px] bg-black text-white rounded-md font-poppins font-medium hover:bg-gray-900 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

