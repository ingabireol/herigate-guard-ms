import React, { useState } from "react";
import { motion } from "framer-motion";

const Language = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const langs = ["English", "French", "Kinyarwanda"];
  const [selectedLang, setSelectedLang] = useState(0);

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setShowDropDown((prev) => !prev)}
        className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-100 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M11 5a.75.75 0 0 1 .688.452l3.25 7.5a.75.75 0 1 1-1.376.596L12.89 12H9.109l-.67 1.548a.75.75 0 1 1-1.377-.596l3.25-7.5A.75.75 0 0 1 11 5Zm-1.24 5.5h2.48L11 7.636 9.76 10.5ZM5 1a.75.75 0 0 1 .75.75v1.261a25.27 25.27 0 0 1 2.598.211.75.75 0 1 1-.2 1.487c-.22-.03-.44-.056-.662-.08A12.939 12.939 0 0 1 5.92 8.058c.237.304.488.595.752.873a.75.75 0 0 1-1.086 1.035A13.075 13.075 0 0 1 5 9.307a13.068 13.068 0 0 1-2.841 2.546.75.75 0 0 1-.827-1.252A11.566 11.566 0 0 0 4.08 8.057a12.991 12.991 0 0 1-.554-.938.75.75 0 1 1 1.323-.707c.049.09.099.181.15.271.388-.68.708-1.405.952-2.164a23.941 23.941 0 0 0-4.1.19.75.75 0 0 1-.2-1.487c.853-.114 1.72-.185 2.598-.211V1.75A.75.75 0 0 1 5 1Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-medium">{langs[selectedLang].substring(0, 2).toUpperCase()}</span>
      </button>

      {/* Dropdown */}
      {showDropDown && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="absolute -right-5 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden"
        >
          {langs.map((lang, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedLang(index);
                setShowDropDown(false);
              }}
              className={`block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                selectedLang === index ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              {lang}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Language;
