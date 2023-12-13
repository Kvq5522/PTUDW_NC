import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { DialogOverlay } from "@radix-ui/react-dialog";

interface compositionDialogProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  classname?: string;
}

const CompositionDialog = (props: compositionDialogProps) => {
  return (
    <Dialog key={props.id} open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className={props.classname}>
        {props.children}
      </DialogContent>
    </Dialog>
  );
};

export default CompositionDialog;
