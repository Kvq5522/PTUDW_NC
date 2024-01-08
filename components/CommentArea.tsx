import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Send, Users } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import Image from "next/image";

const formSchema = z.object({
  comment: z.string().min(1),
});

interface CommentAreaProps {
  onSubmitComment: (data: string) => void;
  loading: boolean;
  data: Comment[];
  userAvatar: string;
  isChangeFlex?: boolean;
}

const CommentArea = (props: CommentAreaProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    props.onSubmitComment(values.comment);
    form.reset();
  }

  return (
    <div className="flex flex-col w-[50rem]">
      <div className="comment-count">
        <Users className="h-5 w-5" />
        <div>
          {props.data.length === 0 ? (
            <></>
          ) : (
            <span className="mx-1">{props.data.length}</span>
          )}
          class comment
        </div>
      </div>

      <div className="comment-show">
        {props.data.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center mt-3 overflow-y-auto"
          >
            <Avatar className="h-[2rem] w-[2rem] cmtbavt">
              <AvatarImage
                className="object-cover"
                src={item.user_id_fk.avatar}
              />
              <AvatarFallback>
                <Image
                  src="/images/user-default-avatar.png"
                  fill
                  className="w-full h-full"
                  alt="User Avatar"
                />
              </AvatarFallback>
            </Avatar>
            <div className="cmtmain">
              <div className="cmtlabel text-[14px]">
                {`${item?.user_id_fk?.first_name}  ${item?.user_id_fk?.last_name}`}{" "}
                -{" "}
                <span className="text-[12px] text-gray-600">
                  {format(new Date(item.createdAt), "MMM d - HH:mm", {
                    locale: enUS,
                  })}
                </span>
              </div>
              <div className="cmtcontent text-[13px] text-gray-700 whitespace-pre-line">
                {item?.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="comment-box">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="comment-box-wrapper"
          >
            <Avatar className="h-[2rem] w-[2rem] cmtbavt">
              <AvatarImage className="object-cover" src={props.userAvatar} />
              <AvatarFallback>
                <Image
                  src="/images/user-default-avatar.png"
                  fill
                  className="w-full h-full"
                  alt="User Avatar"
                />
              </AvatarFallback>
            </Avatar>

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="comment-chatbox">
                  <FormControl className="min-h-[20px]">
                    <Textarea
                      placeholder="Add class comment"
                      className="chatbox"
                      disabled={props.loading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {props.loading ? (
              <div className="mx-2 animate-spin rounded-full h-4 w-4 border-t-2 border-b-3 border-gray-900"></div>
            ) : (
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="chatbox-send top-[-1.5rem]"
                disabled={props.loading}
              >
                <Send />
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CommentArea;

interface Comment {
  id: number;
  description: string;
  user_id: number;
  user_id_fk: {
    first_name: string;
    last_name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}
