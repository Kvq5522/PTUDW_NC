import GradeTable from "@/components/Table/GradeTable";
import React from "react";
import "@/Styles/grade.css";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react"

const ShowTable = () => {
  const openTable = true;
  return (
    <div className="grade-table-container">
      <div className="grade-table-box">
        <div className="grade-table-nav">
          <Button variant="ghost" size="icon"><Delete /></Button>
        </div>
        <div>
          <GradeTable />
        </div>
      </div>
    </div>
  );
};

export default ShowTable;
