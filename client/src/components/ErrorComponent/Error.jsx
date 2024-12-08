import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center my-10 ">
      <div className="text-center p-8 rounded-lg shadow-sm">
        <h2 className="text-6xl font-semibold text-rose-700 mb-4">404</h2>
        <h4 className="text-3xl font-medium text-black mb-6">
          Page Not Found ☹️
        </h4>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Go To HomePage
        </button>
      </div>
    </div>
  );
};

export default Error;
