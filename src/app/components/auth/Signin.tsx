"use client";

import React from "react";
import { signIn } from "next-auth/react";

const Signin: React.FC = () => {
  const handleSignIn = async (): Promise<void> => {
    try {
      await signIn("google");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" border border-sky-400  rounded-lg  flex items-center justify-center">
      <div className="bg-black p-10 rounded-lg shadow-lg max-w-sm w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-sky-500 animate-fadeIn">
            Hey, Sign In
          </h2>
          <p className="text-sky-400 mt-2 animate-fadeIn animation-delay-1">
            Welcome back! Please sign in with your Google account.
          </p>
        </div>
        <button
          onClick={handleSignIn}
          className="w-full px-5 py-3 mt-6 bg-red-800 text-white rounded-lg hover:bg-sky-600 transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Signin;
