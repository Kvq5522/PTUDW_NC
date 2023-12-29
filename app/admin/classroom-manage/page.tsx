"use client";

import React, { useEffect, useState } from "react";

import { columns, Classroom } from "./column";
import { DataTable } from "@/components/Table/AdminClassroomManageTable";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { AXIOS } from "@/constants/ApiCall";
import { setClassrooms } from "@/redux/slices/admin-slice";

export default function ClassroomManage() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const classrooms = useAppSelector(
    (state) => state.adminPropReducer.value.classrooms as Classroom[]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setLoadingMessage("Getting classrooms...");

        const res = await AXIOS.GET({
          uri: "/admin/get-classroom-list",
          token: localStorage.getItem("access-token") ?? "",
        });

        if (res.statusCode && res.statusCode === 200) {
          const data = res.metadata.map((item: any) => {
            return {
              id: item?.id,
              name: item?.name,
              owner_name: `${item?.owner_fk.first_name} ${item?.owner_fk.last_name}`,
              owner_email: item?.owner_fk.email,
              is_archived: item?.is_archived,
            };
          });

          dispatch(setClassrooms(data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateClassrooms = async (_classrooms: Classroom[]) => {
    try {
      setLoading(true);
      setLoadingMessage("Updating classrooms...");

      const data = _classrooms.map((item) => {
        return {
          id: item.id,
          is_archived: item.is_archived,
        };
      });

      const res = await AXIOS.POST({
        uri: "/admin/update-classroom-info",
        token: localStorage.getItem("access-token") ?? "",
        params: {
          classrooms: data,
        },
      });

      if (res.statusCode && res.statusCode === 200) {
        toast.toast({
          title: "Success",
          description: "Update Successfully!",
          className: "top-[-80vh] bg-green-500 text-white",
        });

        const newData = res.metadata;
        const updatedData = classrooms.map((classroom) => {
          const isNewData = newData.find(
            (item: Classroom) => item.id === classroom.id
          );

          if (isNewData) {
            return {
              ...classroom,
              is_archived: isNewData.is_archived,
            };
          }

          return classroom;
        });

        dispatch(setClassrooms(updatedData));
      }
    } catch (error: any) {
      console.log(error);
      toast.toast({
        title: "Error",
        description: error.message ?? "Something went wrong",
        variant: "destructive",
        className: "top-[-85vh]",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8">
      <div className="container">
        <h1 className="text-3xl font-bold">All Classroom</h1>

        <Toaster />

        <DataTable
          columns={columns}
          data={classrooms}
          onUpdate={(classrooms) => updateClassrooms(classrooms as Classroom[])}
          loading={loading}
          loadingMessage={loadingMessage}
        />
      </div>
    </section>
  );
}
