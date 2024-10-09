import React from 'react';

export default function RegisterUser() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-extralight text-black mb-12 tracking-wide">Join us</h1>
        <form className="space-y-8">
          <div className="relative">
            <textarea
              id="bio"
              name="bio"
              rows={4}
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
          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-none hover:bg-gray-900 transition-colors duration-300 text-lg font-light tracking-wider"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}