"use client";

import React, { useState, KeyboardEvent, ChangeEvent } from "react";

import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Modal } from "./Modal";

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

import { Button } from "@/components/ui/button";

import { Copy, Loader } from "lucide-react";

import { AXIOS } from "@/constants/ApiCall";

import MultiValueInput from "@/components/Input/MultipleValueInput";
import { useParams } from "next/navigation";
import { useGradeReviewModal } from "@/hooks/grade-review-modal";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

const formSchema = z.object({
  description: z.string().min(1),
  expected_grade: z.preprocess(
    (value: any) => (value === "" ? NaN : Number(value)),
    z.number().min(0).max(10)
  ),
});

interface GradeReviewModalProps {
  classroomId: number;
  grade?: number;
  gradeCategory: number;
  gradeCategoryName: string;
  status: boolean;
}

export const GradeReviewModal: React.FC<GradeReviewModalProps> = ({
  classroomId,
  grade,
  gradeCategory,
  gradeCategoryName,
  status,
}) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const gradeReviewModal = useGradeReviewModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      expected_grade: 0,
    },
  });

  const { setValue, setError, clearErrors } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (!status) {
        throw new Error("Grade is not available for review");
      }

      setLoading(true);

      const res = await AXIOS.POST({
        uri: "/grade/create-grade-review",
        token: localStorage.getItem("access-token") ?? "",
        params: {
          ...data,
          classroom_id: classroomId,
          grade_category: gradeCategory,
        },
      });

      if (res.statusCode === 201) {
        toast.toast({
          title: "Success",
          description: "Upload student list successfully",
          className: "top-[-85vh] bg-green-500 text-white",
        });
        
        gradeReviewModal.onClose();
        setValue("description", "");
        setValue("expected_grade", 0);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error: any) {
      toast.toast({
        title: "Error",
        description: error.message ?? "Something went wrong",
        variant: "destructive",
        className: "top-[-85vh]",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`Create a grade review for Grade "${gradeCategoryName}"`}
      description="Explain to teacher why you need to review your grade"
      isOpen={gradeReviewModal.isOpen}
      onClose={gradeReviewModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  <span className="pt-1">Show your opinion</span>{" "}
                  {loading && <Loader className="animate-spin" />}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Input text here"
                    className="w-[30vw] h-[5vw]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expected_grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  <span className="pt-1">{"What's your expected grade?"}</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="number" min={0} max={10} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button
              disabled={loading}
              onClick={gradeReviewModal.onClose}
              variant="outline"
              type="button"
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              Create
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default GradeReviewModal;
