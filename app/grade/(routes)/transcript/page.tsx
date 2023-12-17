"use client"

import "@/Styles/grade.css";
import DragNDropBox from "@/components/DnDList/DragNDropBox";
import GradeTable from "@/components/Table/GradeTable";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
 
const Transcript = () => {
  const [ openTable, setOpenTable ] = useState<boolean>(false);
  const [ tableType, setTableType ] = useState<string>("all");
  
  function handleOpenTable(type: string) {
    setOpenTable((current) => !current);
    if (openTable === true) setTableType(type);
    else setTableType("");
    console.log("Open success")
  }
  
  return (
    <div className="grade-container">
      <div className="grade-wrapper"> 
        <div className="grade-top">
          <DragNDropBox />
        </div>
      </div>
    </div>
  );
}

export default Transcript;