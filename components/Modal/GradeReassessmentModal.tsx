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

import { useGradeReassessmentModal } from "@/hooks/grade-reassessment-modal";
import { Input } from "../ui/input";

const formSchema = z.object({
  new_grade: z.preprocess(
    (value: any) => (value === "" ? NaN : Number(value)),
    z.number().min(0).max(10)
  ),
});

interface GradeReassessmentModalProps {
  classroomId: number;
  gradeCategory: number;
  gradeCategoryName: string;
  studentName: string;
  studentId: string;
  email: string;
}

export const GradeReassessmentModal: React.FC<GradeReassessmentModalProps> = ({
  classroomId,
  gradeCategory,
  gradeCategoryName,
  studentName,
  studentId,
  email,
}) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const gradeReassessmentModal = useGradeReassessmentModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_grade: 0,
    },
  });

  const { setValue, setError, clearErrors } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const res = await AXIOS.POST({
        uri: "/grade/reassess-student-grade-by-composition",
        token: localStorage.getItem("access-token") ?? "",
        params: {
          classroom_id: classroomId,
          grade_category: gradeCategory,
          name: studentName,
          student_id: studentId,
          email: email,
          grade: data.new_grade,
        },
      });

      if (res.statusCode === 201) {
        toast.toast({
          title: "Success",
          description: "Create grade review successfully",
          className: "top-[-85vh] bg-green-500 text-white",
        });

        gradeReassessmentModal.onClose();
        setValue("new_grade", 0);
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
      title={`Reassess for student in Grade "${gradeCategoryName}"`}
      description="Give your student a chance to improve their grade!"
      isOpen={gradeReassessmentModal.isOpen}
      onClose={gradeReassessmentModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="new_grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  <span className="pt-1">{"What's your new assessed grade?"}</span>
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
              onClick={gradeReassessmentModal.onClose}
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

export default GradeReassessmentModal;
