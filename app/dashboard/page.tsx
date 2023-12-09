"use client";

import React, { useEffect } from "react";

import ClassCard from "@/components/Card/ClassCard";

import { AXIOS } from "@/constants/ApiCall";

import { cn } from "@/lib/utils";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useAppSelector } from "@/redux/store";
import { setUserInfo } from "@/redux/slices/user-info-slice";
import { setClasslist } from "@/redux/slices/classroom-info-slice";

import Loader from "@/components/Loader/Loader";
import EmptyState from "@/components/EmptyState";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = React.useState(false);
  const classList = useAppSelector(
    (state) => state.classroomInfoReducer.value?.classroomList
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await AXIOS.GET({
          uri: "/user/get-info",
          token: localStorage.getItem("access-token") ?? "",
        });

        if (res.statusCode && res.statusCode === 200) {
          dispatch(setUserInfo(res.metadata));
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchClassList = async () => {
      try {
        const res = await AXIOS.GET({
          uri: "/classroom/list",
          token: localStorage.getItem("access-token") ?? "",
        });

        if (res.statusCode && res.statusCode === 200) {
          dispatch(setClasslist(res.metadata));
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAsync = async () => {
      setLoading(true);

      await fetchUser();
      await fetchClassList();

      setLoading(false);
    };

    fetchAsync();
  }, [dispatch]);

  if (loading)
    return <Loader text="Loading classrooms ..." className="w-full h-full" />;

  if (!classList?.length) {
    return (
      <div className="w-full h-full">
        <EmptyState
          title="No classroom found"
          subTitle="Let's join a classroom"
        />
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-hidden px-8 p-4")}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {classList?.map((classroom: any, index: number) => {
          if (!classroom) return null;

          return (
            <ClassCard
              key={index}
              id={classroom?.classroom_id}
              classroomName={classroom?.classroom_id_fk?.name}
              creatorName={
                classroom?.classroom_id_fk?.owner_fk?.first_name +
                " " +
                classroom?.classroom_id_fk?.owner_fk?.last_name
              }
              creatorPhoto={classroom?.classroom_id_fk?.owner_fk?.avatar}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Dashboard;
