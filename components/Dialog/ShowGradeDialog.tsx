import React, { useEffect, useState } from "react";
import CompositionDialog from "./CompositionDialog";
import { Button } from "../ui/button";
import GradeTable from "../Table/GradeTable";
import { X, Save, FileUp, FileDown } from "lucide-react";
import * as XLSX from "xlsx";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { gradeComposition, studentGrade } from "@/constants/mockdata";
import Loader from "../Loader/Loader";
import { AXIOS } from "@/constants/ApiCall";
import EmptyState from "../EmptyState";

import { useAppSelector } from "@/redux/store";

interface showGradeProps {
  id: string;
  typeTable: string;
  isOpen: boolean;
  compositionID: string;
  classroomId: string;
  onHandleDialog: (type: string, comp: string) => void;
}

const ShowGradeDialog = (props: showGradeProps) => {
  const [isSave, setIsSave] = useState(false);
  const [studentGrades, setStudentGrades] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uri, setUri] = useState("");

  // const getTableHeader = () => {
  //   setHeaders(defaultHeaders);
  //   if (props.compositionID === "all") {
  //     setHeaders((current) => [
  //       ...current,
  //       ...gradeComposition.map((cmp) => cmp.name),
  //     ]);
  //   } else {
  //     const selectedComp = gradeComposition.find(
  //       (cmp) => cmp.id === props.compositionID
  //     );
  //     if (selectedComp) {
  //       setHeaders((current) => [...current, selectedComp.name]);
  //     }
  //   }
  // };

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
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleDownloadTable = () => {
    const fetchData = async () => {
      const _params = {
        classroom_id: parseInt(props.classroomId),
      };
      const _uri =
        props.compositionID === "all"
          ? "/grade/download-student-grade-board"
          : "/grade/download-student-grade-by-composition";
      const downloadName =
        props.compositionID === "all"
          ? "student-grade-board-template.xlsx"
          : "student-grade-composition-template.xlsx";

      if (props.compositionID !== "all") {
        _params["composition_id" as keyof typeof _params] = parseInt(
          props.compositionID
        );
      }

      try {
        const res = await AXIOS.POST_DOWNLOAD_FILE({
          uri: _uri,
          token: localStorage.getItem("access-token") ?? "",
          params: _params,
        });

        const blob = new Blob([res]);

        //create a link for download res
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", downloadName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the URL object
        URL.revokeObjectURL(url);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  };

  useEffect(() => {
    let _uri = ``;

    if (!props.compositionID) return;

    if (props.compositionID === "all") {
      _uri = `/grade/get-student-grade-board/${props.classroomId}`;
      setUri(_uri);
    } else {
      _uri = `/grade/get-student-grades-by-composition/${props.classroomId}/${props.compositionID}`;
      setUri(_uri);
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await AXIOS.GET({
          uri: _uri,
          token: localStorage.getItem("access-token") ?? "",
        });

        if (res.statusCode === 200) {
          const grades = res.metadata.grades;

          if (props.compositionID === "all") {
            const compositionNames = res.metadata.grade_compositions;

            const compHeaders = res.metadata.grade_compositions.map(
              (cmp: any) => {
                return `Grade ${cmp.name}`;
              }
            );
            let formatGrades = Array.isArray(grades)
              ? grades.map((item) => {
                  const mapGrade = compositionNames.map((cmp: any) => {
                    const grade = item.grades.find(
                      (x: any) => x.grade_category === cmp.grade_category
                    );

                    return `Grade ${cmp.name}:${grade?.grade || 0}:${
                      grade?.grade_percent || 0
                    }`;
                  });

                  const info = {
                    "Student Name": item.name,
                    "Student ID": item.student_id,
                    Email: item.email,
                  };

                  const totalGrade = mapGrade.reduce(
                    (acc: number, cur: string) => {
                      const grade = parseFloat(cur.split(":")[1]) ?? 0;
                      const percent = parseFloat(cur.split(":")[2]) ?? 0;

                      return acc + grade * (percent / 100);
                    },
                    0
                  );

                  mapGrade.forEach((grade: any, index: number) => {
                    const name = grade.split(":")[0];
                    const value = grade.split(":")[1];
                    info[name as keyof typeof info] = parseFloat(value) ?? 0;
                  });

                  info["Total Grade" as keyof typeof info] = totalGrade;

                  return info;
                })
              : [];

            setStudentGrades(formatGrades as never[]);
            setHeaders([
              "Student Name",
              "Student ID",
              "Email",
              ...compHeaders,
              "Total Grade",
            ] as never[]);
          } else {
            let formatGrades = Array.isArray(grades)
              ? grades?.map((grade: any) => {
                  const info = {
                    "Student Name": grade.student_id_fk.name,
                    "Student ID": grade.student_id,
                    Email: grade.student_id_fk.email,
                    "Student Grade": grade.grade,
                  };

                  return info;
                })
              : [];

            setStudentGrades(formatGrades as never[]);

            setHeaders([
              "Student Name",
              "Student ID",
              "Email",
              "Student Grade",
            ] as never[]);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.compositionID, props.classroomId]);

  const handleInputChange = (
    value: string | number,
    studentID: string,
    header: string
  ) => {
    setStudentGrades(
      (current) =>
        current.map((item: any) => {
          if (item["Student ID"] === studentID) {
            item["Student Grade"] = value;
          }

          return item;
        }) as never[]
    );
  };

  const userInClass = useAppSelector(
    (state) => state.classroomInfoReducer.value?.currentClassroom?.user
  );
  const isStudent = userInClass?.member_role < 2;

  if (loading)
    return <Loader text="Getting grades..." className="w-full h-full" />;

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
          type="button"
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
            disabled={loading}
            hidden={isStudent}
          >
            <FileUp className="h-5 w-5" />
            <span>Upload</span>
            <Input
              id="fileInput"
              type="file"
              accept=".xlsx"
              style={{ display: "none" }}
              onChange={handleUploadTable}
            />
          </Button>

          <Button
            className="bg-blue-300 hover:bg-blue-600 tbNavBtn"
            variant="ghost"
            onClick={handleDownloadTable}
            disabled={loading}
          >
            <FileDown className="h-5 w-5" />
            <span>Download</span>
          </Button>
          <Button
            className="bg-blue-300 hover:bg-blue-600 tbNavBtn"
            variant="ghost"
            onClick={handleSaveTable}
            disabled={loading}
            hidden={isStudent}
          >
            <Save className="h-5 w-5" />
            <span>Save</span>
          </Button>
        </div>
      </div>
      {!Array.isArray(studentGrades) || !studentGrades.length ? (
        <EmptyState
          title="You haven't upload student grades"
          subTitle="Please download templates and upload your data"
        />
      ) : (
        <>
          <div className="table-box h-full">
            <GradeTable
              compositionID={props.compositionID}
              onInputChange={handleInputChange}
              tableHeaders={headers}
              data={studentGrades}
            />
          </div>
        </>
      )}
    </CompositionDialog>
  );
};

export default ShowGradeDialog;
