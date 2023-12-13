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
import { invoices } from "@/constants/mockdata";
import { FileUp, FileDown } from "lucide-react";

interface gradeTableProps {
  composition: string;
}

const GradeTable = (props: gradeTableProps) => {
  return (
    <Table className="">
      <div className="h-[28rem]">
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[200px]">ID</TableHead>
            <TableHead className="max-w-[200px]">
              Student&rsquo;s name
            </TableHead>
            <TableHead className="max-w-[200px]">{props.composition}</TableHead>
            <TableHead className="max-w-[200px]">Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Test1</TableHead>
            <TableHead>Test2</TableHead>
            <TableHead className="max-w-[200px]">Demo Testing</TableHead>
            <TableHead className="max-w-[200px]">Demo Testing</TableHead>
            <TableHead className="max-w-[200px]">Demo Testing</TableHead>
            <TableHead className="max-w-[200px]">Demo Testing</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-[25rem]">
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice} className="">
              <TableCell className="font-medium h-3 bg-blue-800">
                {invoice.invoice}
              </TableCell>
              <TableCell className="font-medium h-3">
                {invoice.paymentStatus}
              </TableCell>
              <TableCell className="font-medium h-3">
                {invoice.paymentMethod}
              </TableCell>
              <TableCell className="text-right">
                <Input
                  className=" w-fit"
                  type="text"
                  value={invoice.totalAmount}
                />
              </TableCell>
              <TableCell className="text-right">
                <Input
                  className=" w-fit"
                  type="text"
                  value={invoice.totalAmount}
                />
              </TableCell>
              <TableCell>{invoice.test1}</TableCell>
              <TableCell>{invoice.test2}</TableCell>
              <TableCell className="text-right">
                <Input
                  className=" w-fit"
                  type="text"
                  value={invoice.totalAmount}
                />
              </TableCell>
              <TableCell>{invoice.Demotesting}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </div>

      <TableFooter className=" fixed bottom-0 left-0 right-0">
        <TableRow>
          <TableCell colSpan={10}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default GradeTable;
