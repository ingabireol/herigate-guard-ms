import React from 'react'
import { homeImages } from '../assets/assets'
import ImageCard from '../components/ImageCard'
import { motion } from 'framer-motion'

const InfinityScrollCards = () => {
    return (
        <div> <div className="relative overflow-hidden w-full py-4">
            {/* Sliding container */}
            <motion.div
                className="flex w-max"
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30, // Adjust speed of sliding
                    ease: "linear",
                }}
            >
                {/* Duplicate images for infinite effect */}
                {[...homeImages, ...homeImages].map((img, index) => (
                    <ImageCard
                        key={index}
                        description="cnaosidc oaisdncaiosdcinsa soaicnsdoacnaso inasdocinsdocniasod"
                        img={img.image}
                        link="http://google.com"
                    />
                ))}
            </motion.div>
        </div></div>
    )
}

export default InfinityScrollCards