import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import CompositionDialog from "./CompositionDialog";
import { Button } from "../ui/button";
import GradeTable from "../Table/GradeTable";
import { X, Save, FileUp, FileDown } from "lucide-react";
import { Input } from "../ui/input";

import Loader from "../Loader/Loader";
import { AXIOS } from "@/constants/ApiCall";
import EmptyState from "../EmptyState";

import { useAppSelector } from "@/redux/store";
import { useToast } from "../ui/use-toast";
import { Modal } from "../Modal/Modal";

type StudentGrade = {
  name: string;
  member_id: any;
  email: any;
};

interface showGradeProps {
  id: string;
  typeTable: string;
  isOpen: boolean;
  compositionID: string;
  classroomId: string;
  onHandleDialog: (type: string, comp: string) => void;
}

const ShowGradeDialog = (props: showGradeProps) => {
  const [studentGrades, setStudentGrades] = useState<any[]>([]);
  const [filteredStudentGrades, setFilteredStudentGrades] = useState<any[]>([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Getting data...");
  const [errorMessage, setErrorMessage] = useState("");
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorModalChildren, setErrorModalChildren] = useState(<></>);
  const [uri, setUri] = useState("");
  const toast = useToast();

  const [searchInput, setSearchInput] = useState("");

  const handleDialog = () => {
    setSearchInput("");
    props.onHandleDialog("tableDialog", "all");
  };

  const handleSaveTable = () => {
    if (
      props.compositionID !== "all" &&
      !studentGrades.every((item: any) => !isNaN(item["Student Grade"]))
    ) {
      toast.toast({
        title: "Error",
        description: "Please input number only",
        variant: "destructive",
        className: "top-[-85vh]",
      });

      return;
    } else if (props.compositionID === "all") {
      //check duplicate student id
      const studentIDs = studentGrades.map((item: any) => item["Student ID"]);

      const isDuplicate = studentIDs.some(
        (item: any, index: number) => studentIDs.indexOf(item) !== index
      );

      if (isDuplicate) {
        toast.toast({
          title: "Error",
          description: "Student ID is duplicated",
          variant: "destructive",
          className: "top-[-80vh]",
        });

        return;
      }
    }

    const updateData = async () => {
      try {
        setLoadingMessage("Updating data...");
        setLoading(true);

        const updateURI =
          props.compositionID === "all"
            ? "/grade/map-student-id-in-grade-board"
            : "/grade/edit-student-grade-by-composition";

        let data: any[] = [];

        if (props.compositionID === "all") {
          data = studentGrades.map((item: any) => {
            return {
              name: item["Student Name"],
              student_id: item["Student ID"],
              email: item["Email"],
            };
          });
        } else {
          data = studentGrades.map((item: any) => {
            const info = {
              name: item["Student Name"],
              student_id: item["Student ID"],
              email: item["Email"],
            };

            if (props.compositionID !== "all") {
              info["grade" as keyof typeof info] = item["Student Grade"];
            }

            return info;
          });
        }

        const _data =
          props.compositionID === "all"
            ? { student_ids: data }
            : { student_grades: data };

        const res = await AXIOS.POST({
          uri: updateURI,
          token: localStorage.getItem("access-token") ?? "",
          params: {
            classroom_id: parseInt(props.classroomId),
            grade_category: parseInt(props.compositionID),
            ..._data,
          },
        });

        if (res.statusCode === 200) {
          toast.toast({
            title: "Success",
            description:
              props.compositionID === "all"
                ? "Update student Ids successfully"
                : "Update student grades successfully",
            className: "top-[-80vh] bg-green-500 text-white",
          });

          const failedData = res.metadata.failed;

          if (Array.isArray(failedData) && failedData.length > 0) {
            setOpenErrorModal(true);
            setErrorModalChildren(
              <div className="overflow-auto">
                {failedData.map((item: any, index: number) => {
                  return (
                    <div key={index} className="flex justify-between gap-8">
                      <p>Student Name: {item.name}</p>
                      <p>Reason: {item.reason}</p>
                    </div>
                  );
                })}
              </div>
            );
          }

          await fetchData(uri);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error: any) {
        console.log(error);
        toast.toast({
          title: "Error",
          description: error.message ?? "Something went wrong",
          variant: "destructive",
          className: "top-[-80vh]",
        });
      } finally {
        setLoading(false);
      }
    };

    updateData();
  };

  const handleUploadTable = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      toast.toast({
        title: "Error",
        description: "Please choose a file",
        variant: "destructive",
        className: "top-[-80vh]",
      });
      return;
    }

    const uploadData = async () => {
      try {
        setLoading(true);

        const res = await AXIOS.POST({
          uri: `/grade/upload-student-grade-by-composition`,
          token: localStorage.getItem("access-token") ?? "",
          params: {
            classroom_id: parseInt(props.classroomId),
            composition_id: parseInt(props.compositionID),
            excel: file,
          },
          hasFile: true,
        });

        if (res.statusCode === 200) {
          toast.toast({
            title: "Success",
            description: "Upload student list successfully",
            className: "top-[-85vh] bg-green-500 text-white",
          });

          const failedData = res.metadata.failed;

          if (Array.isArray(failedData) && failedData.length > 0) {
            setOpenErrorModal(true);
            setErrorModalChildren(
              <div className="overflow-auto">
                {failedData.map((item: any, index: number) => {
                  return (
                    <div key={index} className="flex justify-between gap-8">
                      <p>Student Name: {item.name}</p>
                      <p>Reason: {item.reason}</p>
                    </div>
                  );
                })}
              </div>
            );
          }

          await fetchData(uri);
        } else {
          throw new Error("Please ensure your file matches the template");
        }
      } catch (error: any) {
        toast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
          className: "top-[-85vh]",
        });
      } finally {
        setLoading(false);
        //flush event files
        event.target.value = "";
      }
    };

    uploadData();
  };

  const handleDownloadTable = () => {
    const fetchData = async () => {
      try {
        setLoadingMessage("Downloading data...");
        setLoading(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  const fetchData = useCallback(
    async (uri: string) => {
      try {
        setLoadingMessage("Getting data...");
        setLoading(true);

        const res = await AXIOS.GET({
          uri: uri,
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

                    return `Grade ${cmp.name}:${grade?.grade}:${
                      grade?.grade_percent
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
        } else {
          setErrorMessage(res.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [props.compositionID]
  );

  useEffect(() => {
    const filtered = studentGrades.filter((grade) =>
      grade["Student Name"].toLowerCase().includes(searchInput.toLowerCase()) ||
      grade["Student ID"].toLowerCase().includes(searchInput.toLowerCase()) || 
      grade["Email"].toLowerCase().includes(searchInput.toLowerCase())
    );

    if (searchInput === "" || filtered === null) {
      setFilteredStudentGrades(studentGrades);
    } else {
      setFilteredStudentGrades(filtered);
    }
  }, [searchInput, studentGrades]);

  const handleInputChange = (
    value: string | number,
    compareValue: string,
    compositionID: string,
    header: string
  ) => {
    setStudentGrades(
      (current) =>
        current.map((item: any) => {
          if (compositionID !== "all" && item["Student ID"] === compareValue) {
            item[header] = value;
          } else if (item["Email"] === compareValue) {
            item[header] = value;
          }

          return item;
        }) as never[]
    );
  };

  const userInClass = useAppSelector(
    (state) => state.classroomInfoReducer.value?.currentClassroom?.user
  );
  const isStudent = userInClass?.member_role < 2;

  useEffect(() => {
    let _uri = ``;

    if (!props.compositionID) return;

    if (props.compositionID === "all") {
      _uri = isStudent
        ? `/grade/get-student-grades/${props.classroomId}`
        : `/grade/get-student-grade-board/${props.classroomId}`;
      setUri(_uri);
    } else {
      _uri = `/grade/get-student-grades-by-composition/${props.classroomId}/${props.compositionID}`;
      setUri(_uri);
    }

    fetchData(_uri);
  }, [props.compositionID, props.classroomId, fetchData, isStudent]);

  useEffect(() => {
    console.log(errorMessage);
  }, [errorMessage]);

  return (
    <CompositionDialog
      id="tableDialog"
      isOpen={props.isOpen}
      onClose={() => props.onHandleDialog("tableDialog", "all")}
      classname="table-dialog"
    >
      {loading && (
        <Loader
          text={loadingMessage}
          className="absolute w-screen h-screen z-[1000] opacity-70 bg-white"
        />
      )}
      <div className="table-nav">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDialog}
          className="h-7 w-7 hover:bg-red-500"
          type="button"
        >
          <X />
        </Button>
        <input
          id="search"
          type="text"
          placeholder="Enter (Student's Name, ID, Email)"
          value={searchInput}
          className="h-full w-[50%] rounded-sm"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="flex flex-row gap-1 items-center">
          {props.compositionID !== "all" && (
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
          )}

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

      {(!Array.isArray(studentGrades) || !studentGrades.length) && !loading ? (
        <EmptyState
          title={
            !errorMessage
              ? isStudent
                ? "Your grade hasn't been published"
                : "You haven't upload student grades"
              : "Error"
          }
          subTitle={
            !errorMessage
              ? isStudent
                ? "Please wait until your teacher announces you"
                : "Please download templates and upload your data"
              : errorMessage
          }
        />
      ) : (
        <>
          <div className="table-box">
            <GradeTable
              compositionID={props.compositionID}
              onInputChange={handleInputChange}
              tableHeaders={headers}
              data={filteredStudentGrades}
            />
          </div>
        </>
      )}

      {/* Show fail list */}
      <Modal
        title="Fail list"
        description="The following data is failed to update, please check again"
        isOpen={openErrorModal}
        onClose={() => setOpenErrorModal((current) => !current)}
      >
        {errorModalChildren}
      </Modal>
    </CompositionDialog>
  );
};

export default ShowGradeDialog;
