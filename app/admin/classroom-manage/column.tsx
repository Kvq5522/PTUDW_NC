"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setClassroomById } from "@/redux/slices/admin-slice";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Classroom = {
  id: number;
  name: string;
  owner_name: string;
  owner_email: string;
  is_archived: boolean;
};

export const columns: ColumnDef<Classroom>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Class Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "owner_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Owner Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "owner_email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Owner Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: "Status",
    id: "status",
    cell: ({ row }) => {
      return (
        <MySelect
          value={String(row.original.is_archived)}
          id={row.original.id}
          field="is_archived"
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

const MySelect: React.FC<Props> = ({ value, id, field }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectChange = (value: string) => {
    const newValue = value === "true";

    dispatch(setClassroomById({ id, field, data: newValue }));
  };

  return (
    <Select defaultValue={value} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="true">Is Archived</SelectItem>
        <SelectItem value="false">Is Not Archived</SelectItem>
      </SelectContent>
    </Select>
  );
};
