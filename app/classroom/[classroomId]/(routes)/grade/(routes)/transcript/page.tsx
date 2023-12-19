"use client";

import "@/Styles/grade.css";
import DragNDropBox from "@/components/DnDList/DragNDropBox";
import GradeTable from "@/components/Table/GradeTable";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { useParams } from "next/navigation";
import { AXIOS } from "@/constants/ApiCall";
import Loader from "@/components/Loader/Loader";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setCurrentClassroom } from "@/redux/slices/classroom-info-slice";

const Transcript = () => {
  const params = useParams();
  // const [openTable, setOpenTable] = useState<boolean>(false);
  // const [tableType, setTableType] = useState<string>("all");
  const [compositionList, setCompositionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  // function handleOpenTable(type: string) {
  //   setOpenTable((current) => !current);
  //   if (openTable === true) setTableType(type);
  //   else setTableType("");
  //   console.log("Open success");
  // }

  const userInClass = useAppSelector(
    (state) => state.classroomInfoReducer.value?.currentClassroom?.user
  );
  const isStudent = userInClass?.member_role < 2;

  useEffect(() => {
    if (params.classroomId) {
      const fetchCurrentClassroom = async () => {
        setLoading(true);

        try {
          const res = await AXIOS.GET({
            uri: `/classroom/info/${params.classroomId}`,
            token: localStorage.getItem("access-token") ?? "",
          });

          console.log(res, res?.statusCode === 200);

          if (res.statusCode && res.statusCode === 200) {
            dispatch(setCurrentClassroom(res.metadata));
            return;
          }

          if (res && (res.status >= 400 || res.statusCode >= 400)) {
            throw new Error(res.message);
          }
        } catch (error) {
          // setError(true);
        } finally {
          setLoading(false);
        }
      };

      const fetchCompositions = async () => {
        try {
          const res = await AXIOS.GET({
            uri: `/grade/get-compositions/${params.classroomId}`,
            token: localStorage.getItem("access-token") ?? "",
          });
          
          if (res.statusCode === 200) {
            const _compositionList = res.metadata;
            _compositionList.sort((a: any, b: any) => a.index - b.index);
            setCompositionList(_compositionList);
          }
          
        } catch (error) {
          console.log("Error: ", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCurrentClassroom();
      fetchCompositions();
    }
  }, [params, dispatch]);

  if (loading)
    return (
      <Loader text="Getting grade compositions..." className="w-full h-full" />
    );

  return (
    <div className="grade-container">
      <div className="grade-wrapper">
        <div className="grade-top">
          <DragNDropBox
            compositionList={compositionList}
            classroomId={params.classroomId as string}
          />
        </div>
      </div>
    </div>
  );
};

export default Transcript;
