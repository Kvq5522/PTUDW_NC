import React, { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { DialogOverlay} from "@radix-ui/react-dialog";

interface compositionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  classname?: string;
}

const CompositionDialog = (props: compositionDialogProps) => {
  return (
    <>
      <Dialog open={props.isOpen} onOpenChange={props.onClose} >
        <DialogOverlay />
        <DialogContent className={props.classname}>
          <div className="">{props.children}</div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CompositionDialog;
