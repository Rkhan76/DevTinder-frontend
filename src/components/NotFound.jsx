import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <h1 className="text-8xl font-extrabold text-blue-500 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">Sorry, the page you are looking for does not exist or has been moved.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        Go Home
      </Link>
      <img
        src="https://illustrations.popsy.co/gray/web-error.svg"
        alt="Not found illustration"
        className="w-80 mt-8"
      />
    </div>
  );
} 