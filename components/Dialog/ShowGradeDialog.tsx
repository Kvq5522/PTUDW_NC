import React, { useState } from "react";
import CompositionDialog from "./CompositionDialog";
import { Button } from "../ui/button";
import GradeTable from "../Table/GradeTable";
import { X, Save, FileUp, FileDown } from "lucide-react";
import { current } from "@reduxjs/toolkit";

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
  const [isSave, setIsSave] = useState(false)

  const handleSaveTable = () => {
    setIsSave(current => !current)
  }

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
          <X />
        </Button>
        <input type="text" value={props.composition} />
        <div className="flex flex-row gap-1">
          <Button
            className="h-[2rem] w-fit bg-blue-300 hover:bg-blue-600 text-[14px] font-bold text-gray-800 flex flex-row gap-1"
            variant="ghost"
            onClick={() => props.onHandleDialog("tableDialog", "all")}
            disabled={!isSave}
          >
            <FileDown className="h-5 w-5" />
            <span>Download</span>
          </Button>
          <Button
            className="h-[2rem] w-fit bg-blue-300 hover:bg-blue-600 text-[14px] font-bold text-gray-800 flex flex-row gap-1"
            variant="ghost"
            onClick={handleSaveTable}
          >
            <Save className="h-5 w-5" />
            <span>Save</span>
          </Button>
        </div>
      </div>
      <div className="table-box">
        <GradeTable composition={props.composition} />
      </div>
    </CompositionDialog>
  );
};

export default ShowGradeDialog;
