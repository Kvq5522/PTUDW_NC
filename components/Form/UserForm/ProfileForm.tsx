"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, FormProvider, set } from "react-hook-form";
import Image from "next/image";
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

import { AXIOS } from "@/constants/ApiCall";

import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slices/user-info-slice";
import { AppDispatch } from "@/redux/store";

const isAgePositiveInteger = (value: number | undefined) => {
  return value ? /^(150|[1-9][0-9]?)$/.test(value.toString()) : true;
};

const isPhoneNumber = (value?: string | undefined) => {
  return value ? /^[0-9]{10}$/.test(value) : true;
};

const formSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  phone_number: z.string().optional().refine(isPhoneNumber, {
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
  avatar: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        if (!(file instanceof File)) return false;

        const { type } = file;

        return type.startsWith("image");
      },
      {
        message: "File must be an image",
      }
    ),
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
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useAppSelector(
    (state: any) => state.userInfoReducer.value?.userInfo
  );

  useEffect(() => {
    setAvatar(userProfile?.avatar ?? "");
    setValue("first_name", userProfile?.first_name ?? "");
    setValue("last_name", userProfile?.last_name ?? "");
    setValue("phone_number", userProfile?.phone_number ?? "");
    setValue("address", userProfile?.address ?? "");
    setValue("age", userProfile?.age ?? 0);
    setValue("gender", userProfile?.gender ?? "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      address: "",
      age: 0,
      gender: "M",
      avatar: "",
    },
  });

  const { setValue } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError("");

    const accessToken = localStorage.getItem("access-token");
    const payload: { [key: string]: any } = values;

    const formData = new FormData();

    for (const key in payload) {
      if (payload[key] !== undefined) {
        formData.append(key, payload[key]);
      }
    }

    const res = await AXIOS.PATCH({
      uri: "/user/update-info",
      params: {
        ...values,
      },
      token: accessToken ?? "",
      hasFile: true,
    });

    if (res.statusCode && res.statusCode === 200) {
      dispatch(setUserInfo(res.metadata));
      setError("");
      setLoading(false);
      return;
    }

    setError(res.message);
    setLoading(false);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      setFile(e.target.files[0]);
      setValue("avatar", e.target.files[0]);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
        className={cn("p-3 overflow-auto", props.className)}
        encType="multipart/form-data"
      >
        <div className="space-y-4 w-full">
          <div className="flex justify-center">
            <h1 className="text-2xl">User Profile</h1>
          </div>

          <div className="flex justify-between gap-4">
            <div className={`w-[50%] flex justify-center items-center`}>
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div onClick={handleImageClick}>
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
                                width={600}
                                height={600}
                                placeholder="empty"
                                loading="lazy"
                                priority={false}
                                className="object-cover rounded-full hover:opacity-75 w-[300px] h-[300px] transition-opacity duration-200 ease-in-out"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Click here to upload image</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <Input
                          {...form.register("avatar")}
                          type="file"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleFileInputChange}
                          accept="image/*"
                          disabled={loading}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
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
              name="phone_number"
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
                      defaultValue={field.value === "" ? "M" : field.value}
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

          {error && <em className="text-red-600">{error}</em>}

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
