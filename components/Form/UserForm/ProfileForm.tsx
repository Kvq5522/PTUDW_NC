"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, FormProvider, set } from "react-hook-form";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserX } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import Link from "next/link";

import { toast } from "react-hot-toast";
import { AXIOS } from "@/constants/ApiCall";

const isAlphanumericWithUppercase = (value: string | undefined) => {
  if (!value) return true;

  return (
    /^[0-9a-zA-Z]+$/.test(value) && /[A-Z]/.test(value) && value.length > 7
  );
  //check if value is alphanumeric with uppercase and length > 7
};

const isAgePositiveInteger = (value: number | undefined) => {
  return value ? /^(150|[1-9][0-9]?)$/.test(value.toString()) : true;
};

const isPhoneNumber = (value: string | undefined) => {
  return value ? /^[0-9]{10}$/.test(value) : true;
};

const formSchema = z.object({
  new_password: z
    .string()
    .optional()
    .refine(
      (value) => value === "" || isAlphanumericWithUppercase(value),
      "Password must be alphanumeric with uppercase"
    ),
  confirm_password: z.string().min(8).refine(isAlphanumericWithUppercase, {
    message: "Password must be alphanumeric with uppercase",
  }),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  phone: z.string().optional().refine(isPhoneNumber, {
    message: "Phone number must be with 10 digits",
  }),
  address: z.string().optional(),
  age: z.preprocess(
    (value: any) => (value === "" ? 0 : Number(value)),
    z.number().optional().refine(isAgePositiveInteger, {
      message: "Age must be a positive integer less than 150",
    })
  ),
  gender: z.string().optional(),
});

interface ProfileFormProps {
  className?: string;
}

export const ProfileForm: React.FC<ProfileFormProps> = (
  props: ProfileFormProps
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string>("");
  const accessToken =
    typeof window !== undefined ? localStorage.getItem("access-token") : "";

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await AXIOS.GET("/user/get-info", {}, accessToken ?? "");

      if (res.statusCode === 200) {
        const { metadata } = res;
        setAvatar(metadata.avatar);
        setValue("first_name", metadata.first_name);
        setValue("last_name", metadata.last_name);
        setValue("phone", metadata.phone ?? "");
        setValue("address", metadata.address ?? "");
        setValue("age", metadata.age ?? 0);
        setValue("gender", metadata.gender ?? "");
      }
    };

    getUserInfo();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      phone: "",
      address: "",
      age: 0,
      gender: "",
    },
  });

  const { setValue } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    
    const res = await AXIOS.PATCH(
      "/user/update-info",
      {
        ...values,
        avatar: file,
      },
      accessToken ?? ""
    );

    if (res.statusCode === 200) {
      setAvatar(res.metadata.avatar);
      window.location.reload();
      return;
    }

    setError(res.message);
    setLoading(false);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("p-3 overflow-auto", props.className)}
      >
        <div className="space-y-4 w-full">
          <div className="flex justify-center">
            <h1 className="text-2xl">User Profile</h1>
          </div>

          <div className="flex justify-between gap-4">
            <div
              className="w-[50%] flex justify-center items-center"
              onClick={handleImageClick}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : avatar
                          ? avatar
                          : "https://firebasestorage.googleapis.com/v0/b/ptudwnc2-20ktpm02-2023.appspot.com/o/images%2Favatar%2Fuser-default-avatar.png?alt=media&token=87041583-59b4-43a6-86eb-a93f06cd8b3e"
                      }
                      alt="Hero"
                      width={300}
                      height={300}
                      placeholder="empty"
                      blurDataURL={avatar}
                      className="rounded object-fit hover:opacity-75 transition-opacity duration-200 ease-in-out"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click here to upload image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept="image/*"
              />
            </div>

            <div className="w-[50%]">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="truncate">First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="First Name"
                        disabled={loading}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" truncate">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Last Name"
                        disabled={loading}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-[50%]">
                  <FormLabel>
                    <div className="truncate">Phone Number</div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Phone Number"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-[50%]">
                  <FormLabel>
                    <div className="truncate">Address</div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Address"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-[50%]">
                  <FormLabel>
                    <div className="truncate">Age</div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Age"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-[50%]">
                  <FormLabel>
                    <div className="truncate">Gender</div>
                  </FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem className="w-[50%]">
                  <FormLabel>
                    <div className="truncate">New Password</div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="New Password"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem className="w-[50%]">
                  <FormLabel>
                    <div className="truncate">
                      Old Password For Confirmation
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="New Password"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {error.length > 0 && <em className="text-red-600">{error}</em>}

          <div className="pt-6 space-x-2 flex flex-wrap items-center justify-end w-full">
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "outline" }),
                loading ? "pointer-events-none opacity-50" : ""
              )}
            >
              Dashboard
            </Link>

            <Button type="submit" disabled={loading}>
              Edit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
