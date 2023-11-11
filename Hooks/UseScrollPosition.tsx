"use client";
import React, { useState, useEffect } from "react";

export const useScrollPosition = () => {
  const [ScollPosition, setScollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => removeEventListener("scroll", updatePosition);
  }, []);
  return ScollPosition;
};
