"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Init() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  const handlePetOwnerRegistration = () => {
    console.log('Pet Owner Registration');
    router.push('/register_pet');
  }

  const handleNormalUserRegistration = () => {
    console.log('Normal User Registration');
    router.push('/register_user');
  }



  return (
    <div
      className="flex justify-center items-center bg-gray-100"
      style={{ height: "calc(100vh - 7rem)" }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center gap-8 md:flex-row">
        {/* Left Section - Pet Owner */}
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-semibold mb-4">Register as Pet Owner</h1>
          <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600" onClick={handlePetOwnerRegistration}>
            Register
          </button>
        </div>

        {/* Right Section - Normal User */}
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-semibold mb-4">Register as Normal User</h1>
          <button className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600" onClick={handleNormalUserRegistration}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
