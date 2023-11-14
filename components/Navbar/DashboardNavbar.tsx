"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";

import { ProfileButton } from "../ui/ProfileButton";

import { AXIOS } from "@/constants/ApiCall";

const Navbar = () => {
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    const getUserInfo = async () => {
      const accessToken = localStorage.getItem("access-token");

      const res = await AXIOS.GET("/user/get-info", {}, accessToken ?? "");

      if (res.statusCode === 200) {
        setAvatar(res.metadata.avatar);
      }
    };

    getUserInfo();
  });

  return (
    <div className="flex justify-between items-center px-10 border-b">
      <Logo />
      <ProfileButton 
        avatarSrc={avatar}
      />
    </div>
  );
};

export default Navbar;
