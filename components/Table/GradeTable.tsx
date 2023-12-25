import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

import { useAppSelector } from "@/redux/store";

type StudentGrade = {
  studentId: string;
  studentEmail: string;
};

interface gradeTableProps {
  compositionID: string;
  tableHeaders: string[];
  onInputChange: (
    value: string | number,
    compareValue: string,
    compositionID: string,
    header: string
  ) => void;
  data?: any[];
}

const GradeTable = (props: gradeTableProps) => {
  const userInClass = useAppSelector(
    (state) => state.classroomInfoReducer.value?.currentClassroom?.user
  );
  const isStudent = userInClass?.member_role < 2;

  return (
    <div className="min-h-full">
      <Table className="min-h-[26rem]">
        <TableHeader className="bg-slate-300">
          <TableRow>
            {props.tableHeaders.map((header, index) => (
              <TableHead key={uuidv4()} className="min-w-[13rem]">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-auto min-h-full">
          {Array.isArray(props.data) &&
            props.data.length > 0 &&
            props.data.map((student, index) => (
              <TableRow key={`${index}`} className="w-full">
                {props.tableHeaders.map((header, _index) => {
                  if (
                    props.compositionID !== "all" &&
                    header.includes("Grade") &&
                    !isStudent
                  ) {
                    return (
                      <TableCell
                        key={`${index} - ${_index}`}
                        className={`font-medium whitespace-normal h-3 w-[${
                          100 / props.tableHeaders.length
                        }%] min-w-[15rem]`}
                      >
                        <input
                          type="number"
                          min={0}
                          max={10}
                          value={student[header]}
                          onChange={(e) => {
                            let value = parseFloat(e.target.value);
                            if (value > 10) value = 10;
                            if (value < 0) value = 0;

                            props.onInputChange(
                              value,
                              student["Student ID"],
                              props.compositionID,
                              header
                            );
                          }}
                        />
                      </TableCell>
                    );
                  } else if (
                    props.compositionID === "all" &&
                    header.includes("ID") &&
                    !isStudent
                  ) {
                    return (
                      <TableCell
                        key={`${index} - ${_index}`}
                        className={`font-medium whitespace-normal h-3 w-[${
                          100 / props.tableHeaders.length
                        }%] min-w-[15rem]`}
                      >
                        <input
                          type="text"
                          value={student[header]}
                          onChange={(e) => {
                            let value = e.target.value;

                            if (value.length > 10) value = value.slice(0, 10);

                            props.onInputChange(
                              value,
                              student["Email"],
                              props.compositionID,
                              header
                            );
                          }}
                        />
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell
                      key={`${index} - ${_index}`}
                      className={`font-medium whitespace-normal h-3 w-[${
                        100 / props.tableHeaders.length
                      }%] min-w-[15rem]`}
                    >
                      {/*  Check type */}
                      {typeof student[header] === "number"
                        ? isNaN(student[header])
                          ? `Not available`
                          : Math.round(student[header] * 100) / 100
                        : student[header]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>

        {/* <TableFooter className="fixed bottom-0 left-0 right-0 h-[2.5rem] flex items-center">
        <TableRow>
          <TableCell colSpan={props.tableHeaders.length - 1}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </div>
  );
};

export default GradeTable;
