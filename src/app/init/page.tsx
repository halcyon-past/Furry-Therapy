"use client";

export default function Init() {
  return (
    <div
      className="flex justify-center items-center bg-gray-100"
      style={{ height: "calc(100vh - 7rem)" }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center gap-8 md:flex-row">
        {/* Left Section - Pet Owner */}
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-semibold mb-4">Register as Pet Owner</h1>
          <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">
            Register
          </button>
        </div>

        {/* Right Section - Normal User */}
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-semibold mb-4">Register as Normal User</h1>
          <button className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
