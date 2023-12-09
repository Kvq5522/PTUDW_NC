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

import { FaGoogle, FaFacebook } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import Link from "next/link";

import { AXIOS } from "@/constants/ApiCall";
import { useSearchParams } from "next/navigation";

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
  const query = useSearchParams();
  const callbackUrl = query.get("callback-url");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log(decodeURIComponent(callbackUrl??""))

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const res = await AXIOS.POST({ uri: "/auth/sign-in", params: values });

    if (res && res.statusCode === 200) {
      localStorage.setItem("access-token", res.metadata.token);

      if (callbackUrl) window.location.href = decodeURIComponent(callbackUrl);
      else window.location.href = "/dashboard";

      setLoading(false);
      return;
    }

    setError(res.message);
    setLoading(false);
  };

  return (
    <div className="flex justify-center mx-0 px-0 h-[100%]">
      <div className="flex space-y-3 justify-center items-center p-2 w-[30%] border-r-4">
        <div className="flex flex-wrap space-y-3 pb-[4.6rem] overflow-hidden">
          <Button
            className="truncate w-[100%] text-center bg-green-600 hover:bg-green-700 hover:opacity-80 gap-1"
            onClick={() => {
              window.location.href = `${process.env.NEXT_PUBLIC_API}/auth/google`;
            }}
            type="button"
          >
            Sign in with <FaGoogle className="inline-block mr-2" />
          </Button>

          <Button
            className="truncate w-[100%] text-center bg-blue-600 hover:bg-blue-800 hover:opacity-80 gap-1"
            onClick={() => {
              window.location.href = `${process.env.NEXT_PUBLIC_API}/auth/facebook`;
            }}
            type="button"
          >
            Sign in with <FaFacebook className="inline-block mr-2" />
          </Button>
        </div>
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
                      Email (<span className="text-red-500">*</span>)
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
                      Password (<span className="text-red-500">*</span>)
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

            {typeof error === "string" && error.length > 0 && (
              <em className="text-red-600">{error}</em>
            )}

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
