"use client";

import { useState } from "react";
import { useForm, FormProvider, set } from "react-hook-form";

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
import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import Link from "next/link";

import { toast } from "react-hot-toast";

const isAlphanumericWithUppercase = (value: string) => {
  return /^[0-9a-zA-Z]+$/.test(value) && /[A-Z]/.test(value);
};

const formSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(8).refine(isAlphanumericWithUppercase, {
    message: "Password must be alphanumeric with uppercase",
  }),
  confirmPassword: z.string().min(8).refine(isAlphanumericWithUppercase, {
    message: "Password must be alphanumeric with uppercase",
  }),
  token: z.string().min(1),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

interface RecoverPasswordFormProps {
  className?: string;
}

export const RecoverPasswordForm: React.FC<RecoverPasswordFormProps> = (
  props: RecoverPasswordFormProps
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const sendEmail = async () => {
    //get email from form and send email
    const email = form.getValues("email");

    console.log(email);
    setLoading(true);

    if (email === "") {
      setError("Email is required");
      return;
    }
 
    setLoading(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(values);
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("p-3 overflow-auto", props.className)}
      >
        <div className="space-y-3 w-full">
          <div className="flex justify-center">
            <h1 className="text-2xl">Recover your password</h1>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="w-[15%] truncate">
                    Email (<text className="text-red-500">*</text>)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      disabled={loading}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="w-[15%] truncate">
                    Password (<text className="text-red-500">*</text>)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={"password"}
                      placeholder="Password"
                      disabled={loading}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="w-[15%] truncate">
                    Confirm Pwd (<text className="text-red-500">*</text>)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={"password"}
                      placeholder="Confirm Password"
                      disabled={loading}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="w-[15%] truncate">
                    Token (<text className="text-red-500">*</text>)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={"string"}
                      placeholder="Token"
                      disabled={loading}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {error.length > 0 && (
            <div className="pt-2">
              <em className="text-red-600">{error}</em>
            </div>
          )}

          <div className="pt-6 space-x-2 flex flex-wrap items-center justify-end w-full">
            <Button
              type="button"
              disabled={loading}
              onClick={sendEmail}
              variant="outline"
            >
              Send Email
            </Button>

            <Button type="submit" disabled={loading}>
              Sign In
            </Button>
          </div>

          <div className="flex items-center justify-end w-full">
            <Link
              href="/sign-in"
              className={loading ? "pointer-events-none opacity-50" : ""}
            >
              <h6>
                <em>Back to sign in</em>
              </h6>
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};
