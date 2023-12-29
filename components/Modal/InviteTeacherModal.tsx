"use client";

import React, { useState, KeyboardEvent, ChangeEvent } from "react";

import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useInviteTeacherModal } from "@/hooks/invite-teacher-modal";
import { Modal } from "./Modal";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import { Copy, Loader } from "lucide-react";

import { AXIOS } from "@/constants/ApiCall";

import MultiValueInput from "@/components/Input/MultipleValueInput";
import { useParams } from "next/navigation";

const formSchema = z.object({
  member_emails: z.array(z.string().email()).min(1),
});

interface InviteTeacherModalProps {
  invite_code: string;
  invite_uri: string;
}

export const InviteTeacherModal: React.FC<InviteTeacherModalProps> = ({
  invite_code,
  invite_uri,
}) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const toast = useToast();
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorModalChildren, setErrorModalChildren] = useState<React.ReactNode>(
    <></>
  );
  const inviteTeacherModal = useInviteTeacherModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      member_emails: [],
    },
  });

  const { setValue, setError, clearErrors } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const _data = data.member_emails.map((email: string) => email);

      const res = await AXIOS.POST({
        uri: "/classroom/add-member",
        token: localStorage.getItem("access-token") ?? "",
        params: {
          classroom_id: Number(params?.classroomId),
          role_id: 2,
          members: _data,
        },
      });

      if (res && res.statusCode === 201) {
        toast.toast({
          title: "Success",
          description: "Send invitations successfully",
          className: "top-[-85vh] bg-green-500 text-white",
        });

        const failedData = res.metadata.failed;
        if (failedData.length > 0) {
          setOpenErrorModal(true);
          setErrorModalChildren(
            <div className="space-y-2">
              {failedData.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <p>User Email: {item.email}</p>
                  <p>Reason: {item.reason}</p>
                </div>
              ))}
            </div>
          );
        } else {
          inviteTeacherModal.onClose();
          setValue("member_emails", []);
          clearErrors("member_emails");
        }
      }

      if (res && (res.status >= 400 || res.statusCode >= 400)) {
        throw new Error(res.message ?? res.data.message);
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

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(invite_code);
  };

  const copyURIToClipboard = () => {
    navigator.clipboard.writeText(
      process.env.NEXT_PUBLIC_FE_ENDPOINT +
        "/classroom/invite?uri=" +
        invite_uri
    );
  };

  return (
    <Modal
      title="Invite a teacher"
      description="Let's join teaching!"
      isOpen={inviteTeacherModal.isOpen}
      onClose={inviteTeacherModal.onClose}
    >
      <div className="space-y-4 pt-2 pb-4 px-2">
        <div className="flex justify-between gap-4">
          <span>Share class code:</span>

          <span
            className="w-[60%] truncate text-left cursor-pointer"
            onClick={copyCodeToClipboard}
          >
            {invite_code}
          </span>

          <span className="cursor-pointer" onClick={copyCodeToClipboard}>
            <Copy />
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="mr-[11px]">Share class link: </span>

          <span
            className="w-[60%] truncate cursor-pointer"
            onClick={copyURIToClipboard}
          >
            {process.env.NEXT_PUBLIC_FE_ENDPOINT +
              "/classroom/invite?uri=" +
              invite_uri}
          </span>

          <span className="cursor-pointer" onClick={copyURIToClipboard}>
            <Copy />
          </span>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="member_emails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-2">
                    <span className="pt-1">{"What's the teacher email?"}</span>{" "}
                    {loading && <Loader className="animate-spin" />}
                  </FormLabel>
                  <FormControl>
                    <MultiValueInput
                      zodSchema={z.object({
                        input_value: z.string().email(),
                      })}
                      onChange={(values) => setValue("member_emails", values)}
                      onError={(error) => setError("member_emails", error)}
                      onClearError={() => clearErrors("member_emails")}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                disabled={loading}
                onClick={inviteTeacherModal.onClose}
                variant="outline"
                type="button"
              >
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                Add
              </Button>
            </div>
          </form>
        </Form>

        {/* Modal shows error when update */}
        <Modal
          title="Fail list"
          description="The following data is failed to update, please check again"
          isOpen={openErrorModal}
          onClose={() => setOpenErrorModal(false)}
        >
          {errorModalChildren}
        </Modal>
      </div>
    </Modal>
  );
};

export default InviteTeacherModal;
