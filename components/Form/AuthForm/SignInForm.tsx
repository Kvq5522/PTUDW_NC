"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

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

import { AXIOS } from "@/constants/ApiCall";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

interface SignInFormProps {
  className?: string;
}

export const SignInForm: React.FC<SignInFormProps> = (
  props: SignInFormProps
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const data = await AXIOS.POST({ uri: "/auth/sign-in", params: values });

    if (data.statusCode === 200) {
      localStorage.setItem("access-token", data.metadata.token);
      window.location.href = "/dashboard";
      setLoading(false);

      return;
    }

    setError(data.message);
    setLoading(false);
  };

  return (
    <div className="flex justify-center mx-0 px-0 h-[100%]">
      <div className="flex flex-wrap justify-center items-center px-2 w-[30%] border-r-4">
        <Button
          className="truncate"
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_API}/auth/google`;
          }}
        >
          Sign In with Google
        </Button>

        <Button
          className="truncate"
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_API}/auth/facebook`;
          }}
        >
          Sign In With Facebook
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("p-3 overflow-auto w-[70%]", props.className)}
        >
          <div className="space-y-3 w-full">
            <div className="flex justify-center">
              <h1 className="text-2xl">Sign in to use Classroom!</h1>
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
              name="password"
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

            { typeof(error) === "string" && error.length > 0 && <em className="text-red-600">{error}</em>}

            <div className="pt-6 space-x-2 flex items-center flex-wrap justify-end w-full">
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  loading ? "pointer-events-none opacity-50" : ""
                )}
              >
                Sign Up Here
              </Link>

              <Button type="submit" disabled={loading}>
                Sign In
              </Button>
            </div>

            <div className="flex items-center justify-end w-full">
              <Link
                href="/recover-password"
                className={loading ? "pointer-events-none opacity-50" : ""}
              >
                <h6>
                  <em>Recover password here</em>
                </h6>
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
