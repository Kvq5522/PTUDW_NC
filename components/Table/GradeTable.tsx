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
import { invoices, studentGrade } from "@/constants/mockdata";
import { useEffect } from "react";


type StudentGrade = {
  studentId: string;
  studentEmail: string;
}

interface gradeTableProps {
  compositionID: string;
  tableHeaders: string[];
}

const GradeTable = (props: gradeTableProps) => {
  return (
    <Table className="min-h-[26rem]">
      <div className="min-h-full flex flex-col">
        <TableHeader className="bg-slate-300">
          <TableRow>
            {props.tableHeaders.map((header, index) => (
              <TableHead key={index} className="min-w-[13rem]">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {studentGrade.map((student, index) => (
            <TableRow key={student.studentId} className="w-full">
              {props.tableHeaders.map((header, index) => (
                <TableCell key={index} className="font-medium h-3 bg-slate-500">
                  {student[header as keyof StudentGrade]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </div>

      <TableFooter className="fixed bottom-0 left-0 right-0 h-[2.5rem] flex items-center">
        <TableRow>
          <TableCell colSpan={props.tableHeaders.length-1}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default GradeTable;
