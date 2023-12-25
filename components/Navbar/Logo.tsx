import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Image
        src="/images/logo/google-classroom.svg"
        width={40}
        height={40}
        alt="logo"
      />
    </div>
  );
};

export default Logo;
