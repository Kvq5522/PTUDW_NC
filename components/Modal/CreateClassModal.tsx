"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useCreateClassModal } from "@/hooks/create-class-modal";
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
  classname: z.string().min(3, "Classname must have at least 3 characters"),
});

export const CreateClassModal = () => {
  const createClassModal = useCreateClassModal();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classname: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const res = await AXIOS.POST({
        uri: "/classroom/create",
        token: localStorage.getItem("access-token") ?? "",
        params: {
          ...data,
        },
      });

      if (res && res.statusCode === 201) {
        toast.toast({
          title: "Success",
          description: "Class created successfully",
          className: "top-[-85vh] bg-green-500 text-white",
        });

        dispatch(appendToClasslist(res.metadata?.classroom));

        createClassModal.onClose();
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
      title="Create a new class"
      description="Start your teaching career!"
      isOpen={createClassModal.isOpen}
      onClose={createClassModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4 w-[50vh]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="classname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-2">
                    <span className="pt-1">{"What's your class name"}</span>{" "}
                    {loading && <Loader className="animate-spin" />}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Fill in your class name"
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
                onClick={createClassModal.onClose}
                variant="outline"
                type="button"
              >
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateClassModal;
