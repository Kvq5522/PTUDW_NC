"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const images = [
  {
    url: "/images/logo/Khang.png",
    alt: "Logo",
    text: "Quách Vĩnh Khang - 20127528",
  },
  {
    url: "/images/logo/Huy.jpg",
    alt: "Logo",
    text: "Hà Huỳnh Đức Huy - 20127184",
  },
  {
    url: "/images/logo/Phat.jpg",
    alt: "Logo",
    text: "Lưu Minh Phát - 20127061",
  },
];

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((preIndex) =>
        preIndex === images.length - 1 ? 0 : preIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div>
      <div className="items-center justify-center flex text-3xl font-bold md:pb-10 px-10 bg-gradient-to-r from-green-500 to-yellow-300 bg-clip-text text-transparent">
        Group Members:
      </div>
      <div className="items-center justify-center grid-cols-3 p-4 md:flex">
        <AnimatePresence custom={currentImageIndex}>
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === currentImageIndex ? 1 : 1,
                scale: index === currentImageIndex ? 1.2 : 1,
                transition: { duration: 0.5 },
              }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-150 w-150 relative m-4" // Added margin m-4
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={500}
                height={500}
                className="object-contain h-80 w-80 items-center justify-center flex mx-auto"
              ></Image>
              <div className="absolute bottom-0 text-green-600 font-bold p-2 opacity-75 w-full text-center">
                {image.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Carousel;
