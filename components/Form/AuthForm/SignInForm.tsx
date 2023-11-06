"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

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
import { Button } from "@/components/ui/button";

import { Axios as a } from "axios";
import { toast } from 'react-hot-toast';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    phone: z.string().min(10).max(10).optional(),
    address: z.string().optional(),
    age: z.number().min(1).max(100).optional(),
    gender: z.string().optional(),
});

const isAlphanumericWithUppercase = (value: string) => {
    return /^[0-9a-zA-Z]+$/.test(value) && /[A-Z]/.test(value);
}

formSchema.refine((data) => isAlphanumericWithUppercase(data.password), {
    message: "Password must be alphanumeric with uppercase",
    path: ["password"],
});

export const SignUpForm = () => {
    const [loading, setLoading] = useState<boolean>(false);

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

    
};