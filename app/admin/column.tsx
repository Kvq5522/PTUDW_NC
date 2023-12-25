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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Account = {
  id: string;
  name: string;
  email: string;
  image: string;
  Mapping: string;
  status: string;
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
    accessorKey: "mapping",
    header: "Mapping",
    cell: ({ row }) => {
      return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input type="email" id="email" placeholder="Student Mapping Email" />
        </div>
      );
    },
  },
  {
    header: "Status",
    id: "status",
    cell: ({ row }) => {
      return (
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Unban" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ban">Ban</SelectItem>
            <SelectItem value="Unban">Unban</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
];
