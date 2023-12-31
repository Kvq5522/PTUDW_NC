"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Loader from "@/components/Loader/Loader";
import { useEffect, useState } from "react";
import { AXIOS } from "@/constants/ApiCall";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { appendToClasslist } from "@/redux/slices/classroom-info-slice";
import { useToast } from "@/components/ui/use-toast";
import EmptyState from "@/components/EmptyState";

const InvitePage = () => {
  const query = useSearchParams();
  const toast = useToast();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const joinClassroom = async () => {
      try {
        const uri = decodeURIComponent(query.get("uri") ?? "");

        if (!uri) {
          setError(true);
          setErrorMessage("Invalid invite link");
          return;
        }

        const res = await AXIOS.POST({
          uri: "/classroom/join-by-invite-uri",
          token: localStorage.getItem("access-token") ?? "",
          params: {
            invite_uri: uri,
          },
        });

        if (res && res.statusCode === 201) {
          toast.toast({
            title: "Success",
            description: "Joined classroom successfully",
            className: "top-[-85vh] bg-green-500 text-white",
          });
          dispatch(appendToClasslist(res.metadata));
          router.push("/dashboard");
          return;
        }

        if (res && (res.status >= 400 || res.statusCode >= 400)) {
          console.log(res);
          throw new Error(res.message ?? res.data.message);
        }
      } catch (error: any) {
        console.log(error);
        setError(true);
        setErrorMessage(error.message as string);
      } finally {
        setError(false);
        setErrorMessage("");
      }
    };

    joinClassroom();
  });

  if (error)
    return (
      <EmptyState
        title="No result found"
        subTitle={errorMessage != "" ? errorMessage : "Please try again!"}
        showReset
      />
    );

  return <Loader text="Joining classroom..." className="w-full h-full" />;
};

export default InvitePage;
