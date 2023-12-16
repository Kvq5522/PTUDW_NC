import React, { useEffect, useState } from "react";
import CompositionDialog from "./CompositionDialog";
import { Button } from "../ui/button";
import GradeTable from "../Table/GradeTable";
import { X, Save, FileUp, FileDown } from "lucide-react";
import * as XLSX from "xlsx";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { gradeComposition, studentGrade } from "@/constants/mockdata";

type StudentGrade = {
  studentId: string;
  studentEmail: string;
};

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
  compositionID: string;
  onHandleDialog: (type: string, comp: string) => void;
}

let defaultHeaders = ["studentId", "studentEmail"];

const ShowGradeDialog = (props: showGradeProps) => {
  const [isSave, setIsSave] = useState(false);
  const [studentGrades, setStudentGrades] = useState(studentGrade);
  const [headers, setHeaders] = useState(defaultHeaders);

  const getTableHeader = () => {
    setHeaders(defaultHeaders);
    if (props.compositionID === "all") {
      setHeaders((current) => [
        ...current,
        ...gradeComposition.map((cmp) => cmp.name),
      ]);
    } else {
      const selectedComp = gradeComposition.find(
        (cmp) => cmp.id === props.compositionID
      );
      if (selectedComp) {
        setHeaders((current) => [...current, selectedComp.name]);
      }
    }
  };

  const handleSaveTable = () => {
    setIsSave((current) => !current);
  };

  const handleUploadTable = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target?.result;

        if (typeof data === "string") {
          let list: string[] = [];
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);
          const newHeaders = jsonData;
          console.log(newHeaders);
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleDownloadTable = () => {};

  useEffect(() => {
    getTableHeader();
  }, [props.compositionID])

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
          className="h-7 w-7 hover:bg-red-500"
        >
          <X />
        </Button>
        <input
          type="text"
          value={props.compositionID}
          className="h-full w-[50%] rounded-sm"
          readOnly
        />
        <div className="flex flex-row gap-1 items-center">
          <Button
            className="bg-blue-300 hover:bg-blue-600 tbNavBtn tbUploadBtn"
            variant="ghost"
            // onClick={handleUploadTable}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <FileUp className="h-5 w-5" />
            <span>Upload</span>
            <Input
              id="fileInput"
              type="file"
              accept=".xlsx, .xls"
              style={{ display: "none" }}
              onChange={handleUploadTable}
            />
          </Button>

          <Button
            className="bg-blue-300 hover:bg-blue-600 tbNavBtn"
            variant="ghost"
            onClick={() => props.onHandleDialog("tableDialog", "all")}
            disabled={!isSave}
          >
            <FileDown className="h-5 w-5" />
            <span>Download</span>
          </Button>
          <Button
            className="bg-blue-300 hover:bg-blue-600 tbNavBtn"
            variant="ghost"
            onClick={handleSaveTable}
          >
            <Save className="h-5 w-5" />
            <span>Save</span>
          </Button>
        </div>
      </div>
      <div className="table-box">
        <GradeTable compositionID={props.id} tableHeaders={headers} />
      </div>
    </CompositionDialog>
  );
};

export default ShowGradeDialog;
