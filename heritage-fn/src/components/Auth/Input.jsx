import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Input({ name, handleChange, label, autoFocus, type, handleShowPassword, error }) {
  return (
    <div className="w-full">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <div className="relative">
        <input
          name={name}
          onChange={handleChange}
          required
          className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500`}
          autoFocus={autoFocus}
          type={type}
        />
        {(name === "password" || name === "confirmPassword") && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={handleShowPassword}
          >
            {type === "password" ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default Input;