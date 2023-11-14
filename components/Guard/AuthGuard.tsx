"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface GuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<GuardProps> = (props: GuardProps) => {
  const router = useRouter();

  const getExpJWT = (token: string) => {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    const { exp } = payload;

    return exp;
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");

    if (!accessToken) {
      router.push("/sign-in");
      return;
    }

    try {
      const exp = getExpJWT(accessToken);

      if (exp < Date.now() / 1000) {
        router.push("/sign-in");
        return;
      }
    } catch (error) {
      router.push("/sign-in");
      return;
    }
  }, [router]);

  return <div className="w-[100%] h-[100%]">{props.children}</div>;
};
