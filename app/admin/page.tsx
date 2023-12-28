"use client";

import React, { useEffect, useState } from "react";

import { Account, columns } from "./column";
import { DataTable } from "@/components/Table/AdminUserManageTable";

import { AXIOS } from "@/constants/ApiCall";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setUsers } from "@/redux/slices/admin-slice";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import { Modal } from "@/components/Modal/Modal";

export default function Accounts() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const [openModal, setOpenModal] = useState(false);
  const [errorModalChildren, setErrorModalChildren] = useState<React.ReactNode>(
    <></>
  );

  const users = useAppSelector(
    (state) => state.adminPropReducer.value.users as Account[]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await AXIOS.GET({
          uri: "/admin/get-user-list",
          token: localStorage.getItem("access-token") ?? "",
        });

        if (res.statusCode && res.statusCode === 200) {
          const data = res.metadata.map((item: any) => {
            return {
              ...item,
              name: item.first_name + " " + item.last_name,
            };
          });

          dispatch(setUsers(data));
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

  const updateUsers = async (accounts: Account[]) => {
    try {
      setLoading(true);

      const data = accounts.map((account) => {
        return {
          id: account.id,
          student_id: account.student_id ?? "",
          is_banned: account.is_banned,
          email: account.email,
        };
      });

      const res = await AXIOS.POST({
        uri: "/admin/update-user-info",
        token: localStorage.getItem("access-token") ?? "",
        params: {
          users: data,
        },
      });

      if (res.statusCode && res.statusCode === 200) {
        toast.toast({
          title: "Success",
          description: "Update Successfully!",
          className: "top-[-80vh] bg-green-500 text-white",
        });

        const newData = res.metadata.success;
        const updatedData = users.map((user) => {
          const isNewData = newData.find((item: any) => item.id === user.id);

          if (isNewData) {
            return {
              ...user,
              student: isNewData.student_id,
              is_banned: isNewData.is_banned,
            };
          }

          return user;
        });

        dispatch(setUsers(updatedData));

        const failedData = res.metadata.failed;

        if (failedData.length > 0) {
          setOpenModal(true);
          setErrorModalChildren(
            <div className="overflow-auto">
              {failedData.map((item: any, index: number) => {
                return (
                  <div key={index} className="flex justify-between gap-8">
                    <p>User Email: {item.email}</p>
                    <p>Reason: {item.reason}</p>
                  </div>
                );
              })}
            </div>
          );
        }
      }
    } catch (error: any) {
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

  const downloadExcel = async () => {
    try {
      setLoading(true);

      const res = await AXIOS.POST_DOWNLOAD_FILE({
        uri: "/admin/download-user-list",
        token: localStorage.getItem("access-token") ?? "",
      });

      const blob = new Blob([res]);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user-list-template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error: any) {
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

  const uploadExcel = async (file: File) => {
    try {
      setLoading(true);

      const res = await AXIOS.POST({
        uri: "/admin/upload-user-list",
        token: localStorage.getItem("access-token") ?? "",
        params: {
          excel: file,
        },
        hasFile: true,
      });

      if (res.statusCode && res.statusCode === 200) {
        toast.toast({
          title: "Success",
          description: "Upload Successfully!",
          className: "top-[-80vh] bg-green-500 text-white",
        });

        const newData = res.metadata.success;

        console.log(newData);

        const updatedData = users.map((user) => {
          const isNewData = newData.find(
            (item: any) => item.email === user.email
          );

          if (isNewData) {
            return {
              ...user,
              student_id: isNewData.student_id,
            };
          }

          return user;
        });

        dispatch(setUsers(updatedData));

        const failedData = res.metadata.failed;

        if (failedData.length > 0) {
          setOpenModal(true);
          setErrorModalChildren(
            <div className="overflow-auto">
              {failedData.map((item: any, index: number) => {
                return (
                  <div key={index} className="flex justify-between gap-8">
                    <p>User Email: {item.email}</p>
                    <p>Reason: {item.reason}</p>
                  </div>
                );
              })}
            </div>
          );
        }
      } else if (res.statusCode && res.statusCode >= 400) {
        throw new Error(res.message || res.data.message);
      }
    } catch (error: any) {
      toast.toast({
        title: "Error",
        description: error.message ?? "Something went wrong",
        variant: "destructive",
        className: "top-[-85vh]",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8">
      <div className="container">
        <h1 className="text-3xl font-bold">All Accounts</h1>
        <Toaster />

        <DataTable
          columns={columns}
          type="manage_user"
          onUpdate={(account) => updateUsers(account as Account[])}
          onDownload={downloadExcel}
          onUpload={(file) => uploadExcel(file)}
          loading={loading}
        />
      </div>

      {/* Modal shows error when update */}
      <Modal
        title="Fail list"
        description="The following data is failed to update, please check again"
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        {errorModalChildren}
      </Modal>
    </section>
  );
}
