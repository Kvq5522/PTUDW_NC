"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FaGoogleDrive, FaYoutube } from "react-icons/fa";
import { Upload, Link } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface announceProps {
  isTeacher?: boolean;
  onCancel: () => void;
  classname?: string;
}

const formSchema = z.object({
  message: z.string(),
  uploadefiles: z.array(
    z.object({
      link: z.string(),
    })
  ),
});

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

const AnnounceForm = (props: announceProps) => {
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      uploadefiles: [],
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("OK");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="announce-form">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="m-0 p-0">
              <div className="announce-txtarea">
                <FormLabel
                  className={`truncate text-[16px] lbtxtareaa ${
                    textAreaValue  ? "floating" : ""
                  }`}
                >
                  Announce something to your class
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none txtareaa"
                    {...field}
                    onChangeCapture={
                      (e) => {setTextAreaValue(e.currentTarget.value)}
                    }
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <div className="announce-upload-items"></div>

        <div className="announce-footer">
          <div className="announce-upload-buttons">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border-slate-300 border-[1px]"
            >
              <FaGoogleDrive size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border-slate-300 border-[1px]"
            >
              <FaYoutube size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border-slate-300 border-[1px]"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border-slate-300 border-[1px]"
            >
              <Link className="h-4 w-4" />
            </Button>
          </div>
          <div className="announce-action-buttons">
            <Button onClick={props.onCancel}>Cancel</Button>
            <Button>Post</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AnnounceForm;
