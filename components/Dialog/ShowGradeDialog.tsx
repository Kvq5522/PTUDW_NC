import React from "react";
import CompositionDialog from "./CompositionDialog";
import { Button } from "../ui/button";
import GradeTable from "../Table/GradeTable";
import { X, Save, FileUp, FileDown } from "lucide-react";

type gradeTable = {
  id: string;
  typeTable: string;
  isOpen: boolean;
  composition: string;
};

interface showGradeProps {
  id: string;
  typeTable: string;
  isOpen: boolean;
  composition: string;
  onHandleDialog: (type: string, comp: string) => void;
}

const ShowGradeDialog = (props: showGradeProps) => {
  return (
    <CompositionDialog
      id="tableDialog"
      isOpen={props.isOpen}
      onClose={() => props.onHandleDialog("tableDialog", "all")}
      classname="table-dialog"
    >
      <div className="table-nav">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => props.onHandleDialog("tableDialog", "all")}
          className="h-6 w-6"
        >
          <X  />
        </Button>
        <input type="text" value={props.composition} />
        <Button
          className="h-[2rem] w-[5rem] bg-blue-300 hover:bg-blue-600 text-[14px] font-bold text-gray-800 flex flex-row gap-1"
          variant="ghost"
          onClick={() => props.onHandleDialog("tableDialog", "all")}
        >
          <Save className="h-5 w-5" />
          <span>Save</span>
        </Button>
      </div>
      <div className="table-box">
        <GradeTable composition={props.composition} />
      </div>
    </CompositionDialog>
  );
};

export default ShowGradeDialog;
