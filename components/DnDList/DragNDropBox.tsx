"use client";

import { Separator } from "@radix-ui/react-select";
import {
  Plus,
  Table2,
  X,
  Save,
  FileKey2,
  FileLock2,
  FileDown,
  FileUp,
} from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  DragDropContext,
  DropResult,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import GradeComposition from "../Card/GradeComposition";
import CompositionDialog from "../Dialog/CompositionDialog";

import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "../ui/dialog";

import { gradeComposition } from "@/constants/mockdata";
import ShowGradeDialog from "../Dialog/ShowGradeDialog";
import TooltipPro from "../TooltipPro";
import { AXIOS } from "@/constants/ApiCall";
import { useToast } from "../ui/use-toast";
import { DeleteCompositionModal } from "../Modal/DeleteCompositionModal";
import { useSaveCompositionModal } from "@/hooks/save-composition-modal";

import { useAppSelector } from "@/redux/store";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  scale: z.preprocess(
    (value: any) => (value === "" ? 0 : Number(value)),
    z.number().min(0).max(100)
  ),
  status: z.string(),
});

interface dndProps {
  compositionList: any[];
  classroomId: string;
}

const DragNDropBox = (props: dndProps) => {
  const [itemList, setItemList] = useState(props.compositionList);
  const [openDialog, setOpenDialog] = useState(false);
  const [composition, setComposition] = useState<string>("");
  const [totalScale, setTotalScale] = useState(0);
  const [isChange, setIsChange] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [isSave, setIsSave] = useState(true);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [hasDeleted, setHasDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState(-1);
  const saveCompositionModal = useSaveCompositionModal();

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    let items = Array.from(itemList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    //re index
    for (let i = 0; i < items.length; i++) {
      items[i].index = i;
    }
    
    setItemList(items);
  }

  const calcSum = useCallback(() => {
    let sum = 0;
    for (let i = 0; i < itemList.length; i++) {
      sum += parseFloat(itemList[i].grade_percent) || 0;
    }
    setTotalScale(sum);
  }, [itemList]);

  const handleScaleChange = (id: string, newScale: number) => {
    setItemList((prevItems) =>
      prevItems.map((item) =>
        item.id === parseInt(id) ? { ...item, grade_percent: newScale } : item
      )
    );
  };

  const handleStatusChange = (id: string, newStatus: boolean) => {
    setItemList((prevItems) =>
      prevItems.map((item) =>
        item.id === parseInt(id) ? { ...item, is_finalized: newStatus } : item
      )
    );
  };

  const handleNameChange = (id: string, newName: string) => {
    setItemList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  const showAlert = (id: string) => {
    saveCompositionModal.onOpen();
    setDeleteId(parseInt(id));
  };

  const handleDelete = (id: number) => {
    //delete composition has id = id
    const _itemList = [...itemList];
    const _index = _itemList.findIndex((item) => item.id === id);
    _itemList.splice(_index, 1);
    setItemList(_itemList);
  };

  const handleDialog = (type: string, compoID: string) => {
    setOpenDialog((current) => !current);
    if (openDialog === false) form.reset();
    setDialogType(type);
    setComposition(compoID);
  };

  const handleUpload = () => {
    // Update the status property of each item to "public"
    console.log("Upload success");
  };

  const handleDownload = () => {
    const fetchData = async () => {
      try {
        const res = await AXIOS.POST_DOWNLOAD_FILE({
          uri: "/grade/download-student-list",
          token: localStorage.getItem("access-token") ?? "",
          params: {
            classroom_id: parseInt(props.classroomId),
          },
        });

        const blob = new Blob([res]);

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "student-list-template.xlsx");
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  };

  const handleSaveBox = () => {
    if (totalScale !== 100.0) {
      toast.toast({
        title: "Error",
        description: "Please check grade scale again",
        variant: "destructive",
        className: "top-[-85vh]",
      });
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await AXIOS.POST({
          uri: "/grade/edit-composition",
          token: localStorage.getItem("access-token") ?? "",
          params: {
            classroom_id: parseInt(props.classroomId),
            grade_compositions: itemList.map((item) => {
              return {
                id: item.id,
                name: item.name,
                grade_percent: item.grade_percent,
                is_finalized: item.is_finalized,
                index: item.index,
              };
            }),
          },
        });

        if (res.statusCode === 200) {
          toast.toast({
            title: "Success",
            description: "Save grade compositions successfully",
            className: "top-[-85vh] bg-green-500 text-white",
          });
        } else {
          throw new Error(res.message as string);
        }
      } catch (error: any) {
        toast.toast({
          title: "Error",
          description: error.message ?? "Something went wrong",
          variant: "destructive",
          className: "top-[-85vh]",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  const checkNameDuplicate = (name: string) => {
    if (itemList.some((item) => item.name === name)) {
      return true;
    }
    return false;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      scale: 0,
      status: "private",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!values.name) {
      form.setError("name", {
        type: "manual",
        message: "Name is required",
      });
      return;
    }
    //check if name is already exist
    if (
      itemList.filter((item) => item.name === values.name).length > 0 &&
      values.id === ""
    ) {
      form.setError("name", {
        type: "manual",
        message: "Name is already exist",
      });
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await AXIOS.POST({
          uri: "/grade/add-composition",
          token: localStorage.getItem("access-token") ?? "",
          params: {
            classroom_id: parseInt(props.classroomId),
            grade_compositions: [
              {
                name: values.name,
                grade_percent: values.scale,
                is_finalized: values.status,
                index: itemList.length - 1,
              },
            ],
          },
        });

        if (res.statusCode === 200) {
          toast.toast({
            title: "Success",
            description: "Class created successfully",
            className: "top-[-85vh] bg-green-500 text-white",
          });

          const metadata = res.metadata;

          console.log(metadata);

          const newItem = {
            id: metadata.id,
            name: metadata.name,
            grade_percent: metadata.grade_percent,
            status: metadata.is_finalized,
          };

          setItemList((prevItems) => [...prevItems, newItem]);
          handleDialog("addDialog", newItem.id);
        }
      } catch (error) {
        toast.toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
          className: "top-[-85vh]",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  const userInClass = useAppSelector(
    (state) => state.classroomInfoReducer.value?.currentClassroom?.user
  );
  const isStudent = userInClass?.member_role < 2;

  useEffect(() => {
    calcSum();
    setIsSave(false);
  }, [itemList, isChange, calcSum]);

  useEffect(() => {
    setItemList(props.compositionList);
  }, [props.compositionList]);

  return (
    <div className="dnd-list-container">
      <div className="dnd-list-wrapper">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="list-container">
            {(provided: DroppableProvided) => (
              <div
                className="dndl-content"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {Array.isArray(itemList) &&
                  itemList.map((grade, index) => {
                    return (
                      <GradeComposition
                        key={`${grade.id}-${index}`}
                        index={index}
                        id={String(grade.id)}
                        name={grade.name}
                        scale={grade.grade_percent}
                        status={grade.is_finalized}
                        checkNameDuplicate={checkNameDuplicate}
                        onScaleChange={handleScaleChange}
                        onNameChange={handleNameChange}
                        onStatusChange={handleStatusChange}
                        onRemoveChange={showAlert}
                        onOpenTable={handleDialog}
                      />
                    );
                  })}
                <DeleteCompositionModal
                  compositionId={deleteId}
                  classroomId={parseInt(props.classroomId)}
                  onAgree={(e: number) => handleDelete(e)}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Separator className="bg-black h-[2px]" />
        <div className="dndl-tools">
          <div className="flex flex-row dndl-tools-actions">
            {!isStudent && (
              <TooltipPro description="Upload Student List">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 addIPlustbtn"
                  onClick={() =>
                    document.getElementById("studentInput")?.click()
                  }
                >
                  <FileUp />
                  <Input
                    id="studentInput"
                    type="file"
                    accept=".xlsx, .xls"
                    style={{ display: "none" }}
                    onChange={handleUpload}
                  />
                </Button>
              </TooltipPro>
            )}
            <TooltipPro description="Download Student List">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 addIPlustbtn"
                onClick={handleDownload}
                type="button"
              >
                <FileDown />
              </Button>
            </TooltipPro>
          </div>

          <div className="flex flex-row gap-1 items-center justify-between p-0">
            <div className="block text-[16px] font-bold">Total Scale: </div>
            <input
              type="text"
              className="w-9 text-center rounded-sm"
              value={totalScale}
              readOnly
            />
          </div>

          <div className="flex flex-row gap-1 dndl-tools-actions">
            {!isStudent ? (
              <>
                <TooltipPro description="Add Composition">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 addIPlustbtn"
                    onClick={() => handleDialog("addDialog", "all")}
                  >
                    <Plus />
                  </Button>
                </TooltipPro>

                <TooltipPro description="Show Grade Board">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 createTbtn"
                    onClick={() => handleDialog("tableDialog", "all")}
                  >
                    <Table2 />
                  </Button>
                </TooltipPro>

                <TooltipPro description="Save Compostions">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 saveTbtn"
                    onClick={handleSaveBox}
                  >
                    <Save />
                  </Button>
                </TooltipPro>
              </>
            ) : (
              <>
                <TooltipPro description="Show Grade Board">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 createTbtn"
                    onClick={() => handleDialog("tableDialog", "all")}
                  >
                    <Table2 />
                  </Button>
                </TooltipPro>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add Dialog */}
      <CompositionDialog
        id="addDialog"
        isOpen={openDialog && dialogType === "addDialog"}
        onClose={() => handleDialog("addDialog", "all")}
        classname="h-fit w-[32rem] block"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-1 mb-3 mt-3 flex gap-3 flex-col h-[10rem] w-full">
              <h1 className="font-bold text-lg">Add new Composition!</h1>
              {loading && <h6>Adding...</h6>}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-start flex-col">
                      <FormLabel className="w-[15%] truncate">
                        Name (<span className="text-red-500">*</span>)
                      </FormLabel>
                      <FormControl>
                        <div className="w-full">
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter Grade Composition Name"
                            className="mt-1"
                          />
                          {form.formState.errors.name && (
                            <div className="text-red-500 text-sm mt-1">
                              {form.formState.errors.name.message}
                            </div>
                          )}
                        </div>
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scale"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-center items-start flex-col">
                      <FormLabel className="w-[15%] truncate">Scale</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter Scale"
                          className="mt-1"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row justify-end gap-2 pt-2">
              <Button type="submit" disabled={loading}>
                Add
              </Button>
              <DialogClose asChild>
                <Button
                  id="closeDia"
                  type="button"
                  variant="destructive"
                  disabled={loading}
                >
                  Close
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </CompositionDialog>

      {/* ---------------------------------------------------------- */}

      {/* Show Table Dialog */}
      <ShowGradeDialog
        id="tableDialog"
        compositionID={composition}
        typeTable="tableDialog"
        onHandleDialog={handleDialog}
        isOpen={openDialog && dialogType === "tableDialog"}
        classroomId={props.classroomId}
      />
    </div>
  );
};

export default DragNDropBox;
