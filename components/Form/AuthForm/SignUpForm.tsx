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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import Link from "next/link";

import { Axios as a } from "axios";
import { toast } from 'react-hot-toast';

const isAlphanumericWithUppercase = (value: string) => {

    return /^[0-9a-zA-Z]+$/.test(value) && /[A-Z]/.test(value);
}

const isAgePositiveInteger = (value: number | undefined) => {
    return value ? /^(100|[1-9][0-9]?)$/.test(value.toString()) : true;
}

const isPhoneNumber = (value: string | undefined) => {
    return value ? /^[0-9]{10}$/.test(value) : true;
}

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).refine(isAlphanumericWithUppercase, {
        message: "Password must be alphanumeric with uppercase",
    }),
    phone: z.string().optional().refine(isPhoneNumber, {
        message: "Phone number must be with 10 digits",
    }),
    address: z.string().optional(),
    age: z.preprocess((value: any) => parseInt(value, 10),
        z.number().optional().refine(isAgePositiveInteger, {
            message: "Age must be a positive integer",
        }
        )),
    gender: z.string().optional(),
});

interface SignUpFormProps {
    className?: string;
}

export const SignUpForm: React.FC<SignUpFormProps> = (props: SignUpFormProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            phone: "",
            address: "",
            age: 0,
            gender: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        console.log(values);
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn("p-3 space-y-3 w-full overflow-auto", props.className)}
                >
                    <div className="flex justify-center">
                        <h1>Create account for Classroom!</h1>
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between items-center">
                                    <FormLabel className="w-[15%]">
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
                                    <FormLabel className="w-[15%]">
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

                    <div className="flex justify-between gap-4">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem
                                    className="w-[50%]"
                                >
                                    <FormLabel>Phone number</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Phone number"
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
                                <FormItem
                                    className="w-[50%]"
                                >
                                    <FormLabel>Address</FormLabel>
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
                                <FormItem
                                    className="w-[50%]"
                                >
                                    <FormLabel>Age</FormLabel>
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
                                <FormItem
                                    className="w-[50%]"
                                >
                                    <FormLabel>Gender</FormLabel>
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

                    {error.length > 0 && <em className="text-red-600">{error}</em>}

                    <div className="pt-6 space-x-2 flex items-center justify-end w-full"
                    >
                        <Link href="/sign-in" className={buttonVariants({variant: "outline"})}>Have account? Sign In</Link>

                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
};