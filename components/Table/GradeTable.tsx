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
  data?: any[];
}

const GradeTable = (props: gradeTableProps) => {

  const userInClass = useAppSelector(
    (state) => state.classroomInfoReducer.value?.currentClassroom?.user
  );
  const isStudent = userInClass?.member_role < 2;

  return (
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
      <TableBody className="overflow-y-auto">
        {Array.isArray(props.data) &&
          props.data.length > 0 &&
          props.data.map((student, index) => (
            <TableRow key={uuidv4()} className="w-full">
              {props.tableHeaders.map((header, index) => (
                <TableCell
                  key={index}
                  className={`font-medium h-3 w-[${
                    100 / props.tableHeaders.length
                  }%]`}
                >
                  {student[header]}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>

      <TableFooter className="fixed bottom-0 left-0 right-0 h-[2.5rem] flex items-center">
        <TableRow>
          <TableCell colSpan={props.tableHeaders.length - 1}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default GradeTable;
