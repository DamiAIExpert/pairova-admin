'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AuthService } from '@/lib/services/auth.service';
import { useMutation } from '@/hooks/useApi';

// The component has been updated to remove Next.js specific imports ('next/image', 'next/navigation')
// to resolve compilation errors. Standard HTML elements and browser APIs are used instead.
export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: login, loading, error } = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      AuthService.login({ email, password }),
    {
      onSuccess: () => {
        // Redirect to dashboard on successful login
        window.location.href = '/admin/dashboard';
      },
      onError: (error) => {
        console.error('Login failed:', error);
      },
    }
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    
    if (!email || !password) {
      return;
    }

    login({ email, password });
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
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800 mb-1 font-poppins"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              className="w-full h-[75px] px-4 border border-[#818181] rounded-[7px] text-black font-poppins placeholder:text-[#c4c4c4] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800 mb-1 font-poppins"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full h-[75px] px-4 border border-[#818181] rounded-[7px] text-black font-poppins placeholder:text-[#c4c4c4] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[50px] bg-black text-white rounded-md font-poppins font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

