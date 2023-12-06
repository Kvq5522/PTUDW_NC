import Link from "next/link";
import Image from "next/image";

import { FC } from "react";

import { Typography, Chip, Stack, Button, useTheme } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";

// import { TopicLogo, allTopicLogos } from '../utils/learn/topicLogos';

const NotFound: FC = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-[green] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-[green] group active:text-orange-500 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[green] group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-[white] border border-current">
            <Link href="/dashboard">Go Home</Link>
          </span>
        </a>
      </button>
    </main>
  );
};

export default NotFound;
