"use client";
import React, { useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RegisterUser() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred');
      }

      const data = await response.json();
      setSuccessMessage(data.message || 'Registration successful!');
      setBio('');

      /*await fetch('/api/auth/refresh-session')
      .then((res) => res.json())
      .then((data) => {
        // Optionally use `update` method if you want to update the session on the client-side
        update(data);
      });*/
      router.push('/date');

    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-extralight text-black mb-12 tracking-wide">Join us</h1>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="relative">
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-0 py-2 text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-all duration-300 resize-none"
              placeholder="This bio will be analyzed by AI to get the perfect matches for you..."
              required
            ></textarea>
            <label 
              htmlFor="bio" 
              className="absolute left-0 -top-6 text-sm text-gray-600 transition-all duration-300"
            >
              Tell us your story..
            </label>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-none transition-colors duration-300 text-lg font-light tracking-wider ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'}`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
