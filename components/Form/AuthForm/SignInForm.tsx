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
});

interface SignInFormProps {
    className?: string;
}

export const SignInForm: React.FC<SignInFormProps> = (props: SignInFormProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("p-3 overflow-auto", props.className)}
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

                    {error.length > 0 && <em className="text-red-600">{error}</em>}

                    <div className="pt-6 space-x-2 flex items-center justify-end w-full"
                    >
                        <Link 
                            href="/sign-up" 
                            className={                                
                                cn(
                                    buttonVariants({ variant: "outline" }), 
                                    loading ? "pointer-events-none opacity-50" : ""
                                )
                            }
                        >
                            Sign Up Here
                        </Link>

                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            Sign In
                        </Button>
                    </div>

                    <div className="flex items-center justify-end w-full"
                    >
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
    )
};