"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useJoinClassModal } from "@/hooks/join-class-modal";
import { Modal } from "./Modal";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { appendToClasslist } from "@/redux/slices/classroom-info-slice";

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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Loader } from "lucide-react";

import { AXIOS } from "@/constants/ApiCall";

const formSchema = z.object({
  invite_code: z
    .string()
    .min(6, "Invite code must have 6 characters")
    .max(6, "Invite code must have 6 characters"),
});

export const JoinClassModal = () => {
  const JoinClassModal = useJoinClassModal();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invite_code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const res = await AXIOS.POST({
        uri: "/classroom/join-by-invite-code",
        token: localStorage.getItem("access-token") ?? "",
        params: {
          ...data,
        },
      });

      if (res && res.statusCode === 201) {
        toast.toast({
          title: "Success",
          description: "Join class successfully",
          className: "top-[-85vh] bg-green-500 text-white",
        });

        dispatch(appendToClasslist(res.metadata?.classroom));

        JoinClassModal.onClose();
      }

      if (res && (res.status >= 400 || res.statusCode >= 400)) {
        throw new Error(res.message);
      }
    } catch (error) {
      toast.toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
        className: "top-[-85vh]",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Join a new class"
      description="Let's start learning!"
      isOpen={JoinClassModal.isOpen}
      onClose={JoinClassModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4 w-[50vh]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="invite_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-2">
                    <span className="pt-1">{"What's your invite code?"}</span>{" "}
                    {loading && <Loader className="animate-spin" />}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Fill in your invite code"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                disabled={loading}
                onClick={JoinClassModal.onClose}
                variant="outline"
                type="button"
              >
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                Join
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default JoinClassModal;
