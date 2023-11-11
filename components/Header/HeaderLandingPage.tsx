"use client";
import React from "react";
import { useScrollPosition } from "@/Hooks/UseScrollPosition";
import "@/Styles/navbar.css";
import Link from "next/link";

const HeaderLandingPage = () => {
  const ScrollPosition = useScrollPosition();
  return (
    <header
      className={`sticky top-0 z-50 transition-shadow ${
        ScrollPosition > 0
          ? "shadow bs-opacity-70 backdrop-blur-lg backdrop-filter"
          : "shadow-none"
      } `}
    >
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img
            src="https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png"
            alt="Google Logo"
            className="navbar__logo"
          />

          <span className="ml-3 text-xl">Google Classroom Clone</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center"></nav>

        <Link
          className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          href="/sign-in"
        >
          sign-in
        </Link>
      </div>
    </header>
  );
};

export default HeaderLandingPage;
