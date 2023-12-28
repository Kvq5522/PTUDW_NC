"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Loader from "@/components/Loader/Loader";

import { AXIOS } from "@/constants/ApiCall";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { resetUserInfo } from "@/redux/slices/user-info-slice";
import {
  resetClasslist,
  resetClassroomInfo,
  resetCurrentClassroom,
} from "@/redux/slices/classroom-info-slice";

interface GuardProps {
  children: React.ReactNode;
}

export const AdminAuthGuard: React.FC<GuardProps> = (props: GuardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsLoading(true);
    const accessToken = localStorage.getItem("access-token");

    if (!accessToken) {
      router.push(
        `/sign-in?callback-url=${encodeURIComponent(
          pathname + "?" + query.toString()
        )}`
      );
      return;
    }

    const checkToken = async () => {
      try {
        const data = await AXIOS.POST({
          uri: "/auth/verify-admin",
          token: accessToken,
        });

        if (data.statusCode === 200) {
          setIsLoading(false);
          return;
        }

        throw new Error("Token is invalid");
      } catch (error) {
        dispatch(resetUserInfo());
        dispatch(resetClasslist());
        dispatch(resetClassroomInfo());
        dispatch(resetCurrentClassroom());

        localStorage.removeItem("access-token");
        router.push("/sign-in");
      }
    };

    checkToken();
  }, [router, pathname, query, dispatch]);

  if (isLoading)
    return (
      <div className="w-[100vw] h-[100vh]">
        <Loader className="w-[100%] h-[100%]" text="Checking authority..." />
      </div>
    );

  return <div className="w-[100%] h-[100%]">{props.children}</div>;
};
