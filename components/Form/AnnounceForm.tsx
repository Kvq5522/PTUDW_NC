"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

const AnnounceForm = (props: announceProps) => {
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-0 p-0 space-y-0"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="m-0 p-0">
              <div className="announce-txtarea">
                <FormLabel className="truncate">
                  Announce something to your class 
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    className="resize-none bg-[#f8f9fa] min-h-[6rem]"
                    {...field}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <div className="announceF-footer bg-slate-500">
          <Button onClick={props.onCancel}>Cancel</Button>
        </div>
      </form>
    </Form>
  );
};

export default AnnounceForm;
