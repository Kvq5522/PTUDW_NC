"use client";

import { useToast } from "@/components/ui/use-toast";
import { Modal } from "./Modal";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Loader } from "lucide-react";

import { AXIOS } from "@/constants/ApiCall";
import { useSaveCompositionModal } from "@/hooks/save-composition-modal";
import { useState } from "react";

interface SaveCompositionModalProps {
  compositionId: number;
  classroomId: number;
  onAgree: (id: number) => void;
}

export const DeleteCompositionModal: React.FC<SaveCompositionModalProps> = ({
  compositionId,
  classroomId,
  onAgree,
}: SaveCompositionModalProps) => {
  const [loading, setLoading] = useState(false);
  const saveCompositionModal = useSaveCompositionModal();
  const toast = useToast();

  const handleDelete = () => {
    const deleteComposition = async () => {
      try {
        setLoading(true);

        const res = await AXIOS.POST({
          uri: "/grade/delete-composition",
          token: localStorage.getItem("access-token") ?? "",
          params: {
            classroom_id: classroomId,
            composition_id: compositionId,
          },
        });

        if (res.statusCode === 200) {
          toast.toast({
            title: "Success",
            description: "Delete composition successfully",
            className: "top-[-85vh] bg-green-500 text-white",
          });

          onAgree(compositionId);
          saveCompositionModal.onClose();
          
          return;
        }

        throw new Error("Something went wrong");
      } catch (error) {
        toast.toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
          className: "top-[-85vh]",
        });
      } finally {
        setLoading(false);
      }
    };

    deleteComposition();
  };

  return (
    <Modal
      title="Delete composition"
      description="Are you sure you want to delete this composition?"
      isOpen={saveCompositionModal.isOpen}
      onClose={saveCompositionModal.onClose}
    >
      <h1 className="text-lg font-bold text-red-500 whitespace-normal">
        Please check before delete, all of the following grades will be deleted
        as a result
      </h1>

      <div className="py-2 pb-4 flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() => saveCompositionModal.onClose()}
        >
          Disagree
        </Button>
        <Button type="button" onClick={handleDelete} disabled={loading}>
          Agree
        </Button>
      </div>
    </Modal>
  );
};
