"use client";
import React from "react";

const SignIn: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 p-4 md:p-8">
      <div
        className="md:w-1/2 flex flex-col justify-center items-center p-6 md:p-8 bg-gray-800 rounded-lg relative"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gray-800 opacity-80 md:hidden rounded-lg"></div>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 relative">
          Login account
        </h2>
        <p className="text-gray-400 mb-4 text-sm md:text-base relative">
          don't have an account yet?{" "}
          <a href="/menu/sign-up" className="text-blue-400">
            Register
          </a>
        </p>
        <form className="w-full max-w-xs md:max-w-sm relative">
          <div className="mb-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <input
              className="bg-gray-700 text-white rounded-md px-4 py-2 w-full"
              type="text"
              placeholder="Full Name"
            />
            <input
              className="bg-gray-700 text-white rounded-md px-4 py-2 w-full"
              type="text"
              placeholder="Phone Number"
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-gray-700 text-white rounded-md px-4 py-2 w-full"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4 relative">
            <input
              className="bg-gray-700 text-white rounded-md px-4 py-2 w-full"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-gray-400 text-xs md:text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-400">
                Terms & Conditions
              </a>
            </label>
          </div>
          <button className="bg-purple-600 text-white py-2 px-4 rounded-md w-full mb-4">
            Login account
          </button>
        </form>
        <div className="flex flex-col justify-center md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full relative">
          <button className="bg-gray-700 text-white py-2 px-4 rounded-md flex items-center justify-center w-full md:w-auto">
            <span>Google</span>
          </button>
          <button className="bg-gray-700 text-white py-2 px-4 rounded-md flex items-center justify-center w-full md:w-auto">
            <span>Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
