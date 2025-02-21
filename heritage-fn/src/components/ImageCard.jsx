import React from "react";
import { motion } from "framer-motion";

const ImageCard = ({ img, description, link }) => {
  return (
    <motion.div
      className="relative w-60 h-80 rounded-lg overflow-hidden shadow-lg m-2 flex-shrink-0"
    >
      {/* Background Image */}
      <img src={img} alt="Card" className="w-full h-full object-cover" />

      {/* Dark Diagonal Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/30 to-transparent"></div>

      {/* Text Description */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white">
        <p className="text-lg font-semibold text-center">{description}</p>
      </div>

      {/* Learn More Link */}
      <div className="absolute bottom-3 right-3">
        <a href={link} className="text-white text-sm underline hover:text-gray-300">
          Learn More
        </a>
      </div>
    </motion.div>
  );
};

export default ImageCard;



{/* <div className="absolute inset-0 bg-gradient-to-tr from-black/100 via-black/40 to-transparent"></div> */}

// md:w-80 md:h-60 w-60 h-40