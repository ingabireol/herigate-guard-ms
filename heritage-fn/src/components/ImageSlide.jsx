import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { homeImages } from "../assets/assets";
const ImageSlide = () => {
  const [index, setIndex] = useState(0);
  const myText= "Jooin Us now to pass you through Amazing Rwanda cultre Heritage"
  const nextImage = () => {
    setIndex((prev) => (prev + 1) % homeImages.length);
  };
  const prevImage = () => {
    setIndex((prev) => (prev - 1 + homeImages.length) % homeImages.length);
  };
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < myText.length-1) {
        setDisplayText((prev) => prev + myText[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust speed here

    // Cursor blinking effect
    const cursorBlink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorBlink);
    };
  }, []);
  

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Image Container */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={homeImages[index].image}
            src={homeImages[index].image}
            alt={`Slide ${index + 1}`}
            className="absolute w-full h-full object-cover"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Caption */}
      <div className="absolute top-20 bg-blue-50/40 px-6 py-2 left-1/2 transform -translate-x-1/2 text-center rounded-lg shadow">
        <p className="text-gray-800 font-semibold">{homeImages[index].caption}</p>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex justify-between items-center px-6">
        <button
          onClick={prevImage}
          className="p-4 rounded-full bg-black/50 text-white hover:bg-black transition arrow-icons"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          onClick={nextImage}
          className="p-4 rounded-full bg-black/50 text-white hover:bg-black transition arrow-icons"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      <div className="absolute text-2xl md:text-3xl bottom-4 left-1/2 transform -translate-x-1/2 text-center font-mono bg-amber-50">
      {displayText}
      <span className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"} animate-pulse`}>
        |
      </span>
    </div>
    </div>
  );
};

export default ImageSlide;
