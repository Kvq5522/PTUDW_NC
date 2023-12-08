"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import Loader from "@/components/Loader/Loader";

import { AXIOS } from "@/constants/ApiCall";

interface GuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<GuardProps> = (props: GuardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const accessToken = localStorage.getItem("access-token");

    if (!accessToken) {
      router.push("/sign-in");
      return;
    }

    const checkToken = async () => {
      try {
        const data = await AXIOS.POST({
          uri: "auth/verify-token",
          params: { token: accessToken },
        });

        if (data.statusCode === 200) {
          setIsLoading(false);
          return;
        }

        router.push("/sign-in");
        localStorage.removeItem("access-token");
      } catch (error) {
        router.push("/sign-in");
        localStorage.removeItem("access-token");
      }
    };  

    checkToken();
  }, [router, pathname]);

  if (isLoading)
    return <div className="w-[100vw] h-[100vh]"><Loader className="w-[100%] h-[100%]" text="Loading..." /></div>;

  return <div className="w-[100%] h-[100%]">{props.children}</div>;
};
