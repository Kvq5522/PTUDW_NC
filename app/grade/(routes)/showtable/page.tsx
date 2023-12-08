import GradeTable from "@/components/Table/GradeTable";
import React from "react";

const ShowTable = () => {
  const openTable = true;
  return (
    <div className="grade-table-container">
      <div className="grade-table-wrapper"></div>
      <div className="grade-table-box">

      </div>
      {openTable ? <GradeTable /> : <>Show grade</>}
    </div>
  );
};

export default ShowTable;
