"use client";

import { Avatar, IconButton, MenuItem, Menu } from "@mui/material";
import { Add, Apps, Menu as MenuIcon } from "@mui/icons-material";
import React, { useState } from "react";
import "@/Styles/navbar.css";
function Navbar() {
  //   const [user, loading, error] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState(null);

  //   const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* <CreateClass />
      <JoinClass /> */}
      <nav className="navbar">
        <div className="navbar__left">
          <IconButton>
            <MenuIcon />
          </IconButton>
          <img
            src="https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png"
            alt="Google Logo"
            className="navbar__logo"
          />{" "}
          <span>Classroom</span>
        </div>
        <div className="navbar__right">
          <IconButton aria-controls="simple-menu" aria-haspopup="true">
            <Add />
          </IconButton>
          <IconButton>
            <Apps />
          </IconButton>
          <IconButton>
            <Avatar />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>Create Class</MenuItem>
            <MenuItem>Join Class</MenuItem>
          </Menu>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
