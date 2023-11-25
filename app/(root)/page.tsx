import React from "react";
import Image from "next/image";
import LandingPageDashboard from "@/components/Navbar/LandingPageDashboard";
import Link from "next/link";
import { Button } from "@mui/material";

const page = () => {
  return (
    <main>
      <LandingPageDashboard />
      <section className="md:py-20 py-10 bg-gradient-to-r from gray-00 to-gray-200 spacey-10">
        <div className="container mx-auto text-center">
          <div className="text-6xl flex justify-center font-bold md:px-20 pb-10 text-graydient bg-gradient-to-r from-yellow-500 to-green-300 bg-clip-text text-transparent">
            This is Google Classroom Clone
          </div>
          <p className="text-lg md:text-xl md:10 bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent font-bold ">
            This is a Google classroom clone by Ha Huynh Duc Huy and Quach Vinh
            Khang from HCMUS
          </p>
          <div className="flex gap-4 justify-center pt-10">
            <Link
              href="/sign-in"
              className="bg-green-500 text-white px-10 py-4 rounded-md text-lg font-bold"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="bg-gray-500 text-white px-10 py-4 rounded-md text-lg font-bold"
            >
              Get Started
            </Link>
          </div>

          <div className="w-[100%] flex justify-center pr-8 ">
            <Image
              src="/images/logo/google-classroom-2.svg"
              width={500}
              height={500}
              alt="Hero"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
