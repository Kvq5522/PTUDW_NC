"use client";
import { Input } from "@/components/ui/input";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setUserById } from "@/redux/slices/admin-slice";

export type Account = {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  authorization: number;
  student_id: string;
  is_banned: boolean;
};

export const columns: ColumnDef<Account>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "authorization",
    header: ({ column }) => {
      return <div>Authorization</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="grid w-full max-w-[12rem] items-center gap-1.5">
          {row.original.authorization < 4 ? "User" : "Admin"}
        </div>
      );
    },
  },
  {
    accessorKey: "student_id",
    header: "Student ID",
    cell: ({ row }) => {
      return (
        <div className="grid w-full max-w-[12rem] items-center gap-1.5">
          <MyInput
            value={row.original.student_id}
            id={row.original.id}
            field={"student_id"}
          />
        </div>
      );
    },
  },
  {
    header: "Status",
    id: "status",
    cell: ({ row }) => {
      return (
        <MySelect
          value={String(row.original.is_banned)}
          id={row.original.id}
          field="is_banned"
        />
      );
    },
  },
];

interface Props {
  value: string;
  id: number;
  field: string;
}

const MyInput: React.FC<Props> = ({ value, id, field }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    dispatch(setUserById({ id, field, data: newValue }));
  };

  return (
    <Input
      type="text"
      id="student_id"
      value={value ?? ""}
      onChange={handleInputChange}
      minLength={0}
      maxLength={10}
      placeholder={value ?? "Not Assigned"}
    />
  );
};

const MySelect: React.FC<Props> = ({ value, id, field }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectChange = (value: string) => {
    const newValue = value === "true";

    dispatch(setUserById({ id, field, data: newValue }));
  };

  return (
    <Select defaultValue={value} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="true">Is Banned</SelectItem>
        <SelectItem value="false">Is Not Banned</SelectItem>
      </SelectContent>
    </Select>
  );
};
