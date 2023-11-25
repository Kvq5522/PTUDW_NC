import Link from "next/link";

import { FC } from "react";

import { Typography, Chip, Stack, Button, useTheme } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";

// import { TopicLogo, allTopicLogos } from '../utils/learn/topicLogos';

const NotFound: FC = () => {
  return (
    <div className="mx-auto">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-green-500">404</h1>
        <p className="mb-4 text-lg text-gray-600">
          Oops! Looks like you're lost.
        </p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-600">
          Let's get you back{" "}
          <a href="/" className="text-blue-500">
            home
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFound;
