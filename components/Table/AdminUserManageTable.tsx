"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Copy, FileDown, FileUp } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getPaginationRowModel,
  getCoreRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
  VisibilityState,
  RowSelection,
  Filters,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import TooltipPro from "../TooltipPro";
import { useAppSelector } from "@/redux/store";
import Select from "react-select";
import { useToast } from "../ui/use-toast";
import Loader from "../Loader/Loader";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  type: string;
  onUpdate: (data: any[]) => void;
  onDownload: () => void;
  onUpload: (file: File) => void;
  loading: boolean;
  loadingMessage?: string;
}

export function DataTable<TData, TValue>({
  columns,
  type,
  onUpdate,
  onDownload,
  onUpload,
  loading,
  loadingMessage = "Loading...",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [rowSelection, setRowSelection] = useState({});

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [adminInfo, setAdminInfo] = useState<AddAdminInfo[]>([]);
  const toast = useToast();

  const dataFromRedux: { [key: string]: TData[] } = {
    manage_user: useAppSelector(
      (state) => state.adminPropReducer.value.users
    ) as TData[],
    manage_classroom: useAppSelector(
      (state) => state.adminPropReducer.value.classrooms
    ) as TData[],
  };

  const table = useReactTable({
    data: dataFromRedux[type],
    columns,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  const updateUsers = () => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);

    if (selectedRows.length === 0) {
      toast.toast({
        title: "Error",
        description: "Please select at least 1 row to update!",
        variant: "destructive",
        className: "top-[-85vh]",
      });
      return;
    }

    onUpdate(selectedRows);
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    // Update the status property of each item to "public"
    const file = event.target.files?.[0];

    if (!file) {
      toast.toast({
        title: "Error",
        description: "Please choose a file",
        variant: "destructive",
        className: "top-[-80vh]",
      });

      return;
    }

    onUpload(file as File);
    event.target.value = "";
  };

  return (
    <div className="relative">
      {loading && (
        <Loader
          text={loadingMessage}
          className="absolute z-[1000] w-full h-full opacity-70 bg-white"
        />
      )}

      {/*table*/}
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter email or name..."
            onChange={(event) => {
              const filterValue = event.target.value;

              table.setGlobalFilter(filterValue);
            }}
            disabled={loading}
            className="max-w-sm"
          />
        </div>

        <div className="flex gap-2">
          <TooltipPro description="Download Student List">
            <Button
              variant="outline"
              size="icon"
              onClick={onDownload}
              type="button"
            >
              <FileDown />
            </Button>
          </TooltipPro>

          <TooltipPro description="Upload Student List">
            <Button
              variant="outline"
              size="icon"
              onClick={() => document.getElementById("uploadUser")?.click()}
            >
              <FileUp />
              <Input
                id="uploadUser"
                type="file"
                accept=".xlsx"
                style={{ display: "none" }}
                onChange={handleUpload}
                disabled={loading}
                multiple={false}
              />
            </Button>
          </TooltipPro>

          <Button type="button" onClick={updateUsers}>
            Update
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={loading}>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <hr />
      </div>

      {/*pagination*/}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected
      </div>
    </div>
  );
}

interface AddAdminInfo {
  id: number;
  email: string;
}
