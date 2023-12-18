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

interface gradeTableProps {
  compositionID: string;
  tableHeaders: string[];
  onInputChange: (
    value: string | number,
    studentID: string,
    header: string
  ) => void;
  data?: any[];
}

const GradeTable = (props: gradeTableProps) => {
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
              <TableRow
                key={`${student["Student ID"]} - ${student["Email"]}`}
                className="w-full"
              >
                {props.tableHeaders.map((header, index) => {
                  if (
                    props.compositionID !== "all" &&
                    header.includes("Grade")
                  ) {
                    return (
                      <TableCell
                        key={index}
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
                              header
                            );
                          }}
                        />
                      </TableCell>
                    );
                  } else if (
                    props.compositionID === "all" &&
                    header.includes("ID")
                  ) {
                    return (
                      <TableCell
                        key={index}
                        className={`font-medium whitespace-normal h-3 w-[${
                          100 / props.tableHeaders.length
                        }%] min-w-[15rem]`}
                      >
                        <input
                          type="text"
                          value={student[header]}
                          onChange={(e) => {
                            props.onInputChange(
                              e.target.value,
                              student["Student ID"],
                              header
                            );
                          }}
                        />
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell
                      key={index}
                      className={`font-medium whitespace-normal h-3 w-[${
                        100 / props.tableHeaders.length
                      }%] min-w-[15rem]`}
                    >
                      {student[header]}
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
