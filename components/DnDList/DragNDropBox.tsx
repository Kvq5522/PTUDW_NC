"use client";

import { Separator } from "@radix-ui/react-select";
import { Plus, Table2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import GradeComposition from "../Card/GradeComposition";
import { Button } from "../ui/button";
import CompositionDialog from "../Dialog/CompositionDialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "../ui/dialog";

const gradeComposition = [
  {
    id: "oie112",
    name: "Midterm",
    scale: "30",
  },
  {
    id: "asd1232",
    name: "Exercises1",
    scale: "5",
  },
  {
    id: "fas1241",
    name: "Finalterm",
    scale: "50",
  },
  {
    id: "sdf1231",
    name: "Exercises2",
    scale: "5",
  },
  {
    id: "fgw1421",
    name: "Exercises3",
    scale: "2",
  },
  {
    id: "fad1235",
    name: "Exercises5",
    scale: "2",
  },
  {
    id: "asg0693",
    name: "Exercises4",
    scale: "2",
  },
];

const formSchema = z.object({
  id: z.string(),
  name: z.string(),
  scale: z.string(),
});

interface dndProps {}

const DragNDropBox = (props: dndProps) => {
  const [itemList, setItemList] = useState(gradeComposition);
  const [openDialog, setOpenDialog] = useState(false);
  const [inputText, setInputText] = useState<string>("");
  const [totalScale, setTotalScale] = useState<string>("0");
  const [isChange, setIsChange] = useState(false);

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(itemList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setItemList(items);
  }

  const calcSum = useCallback(() => {
    let sum = 0;
    for (let i = 0; i < itemList.length; i++) {
      sum += parseInt(itemList[i].scale, 10) || 0;
    }
    setTotalScale(sum.toString());
  }, [itemList]);

  const handleScaleChange = (id: string, newScale: string) => {
    setIsChange(true);
    setItemList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, scale: newScale } : item
      )
    );
    setIsChange(false);
  };
  const handleDelete = (id: string) => {
    setItemList(itemList.filter((item) => item.id != id));
  };

  const handleAddCompositionDialog = () => {
    setOpenDialog((current) => !current);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      scale: "0",
    },
  });

  useEffect(() => {
    console.log("OK");
    calcSum();
  }, [itemList, isChange, calcSum]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newItem = {
      id: values.id || Date.now().toString(), // Use existing ID or generate a timestamp-based ID
      name: values.name || "",
      scale: values.scale || "0",
    };

    // Update the itemList state with the new item
    setItemList((prevItems) => [...prevItems, newItem]);

    // Close the composition dialog
    handleAddCompositionDialog();
  };

  return (
    <div className="dnd-list-container">
      <div className="dnd-list-wrapper">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="itemlist">
            {(provided) => (
              <div
                className="dndl-content"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {itemList.map(({ id, name, scale }, index) => {
                  return (
                    <GradeComposition
                      key={id}
                      index={index}
                      id={id}
                      name={name}
                      scale={scale}
                      onScaleChange={handleScaleChange}
                      onRemoveChange={handleDelete}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Separator className="bg-black h-[2px]" />
        <div className="dndl-tools">
          <div className="dndlina ml-3">Total Scale: </div>
          <input type="text" className="w-9 text-center" value={totalScale} />
          <div className="flex flex-row gap-1 dndl-tools-actions">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 addIPlustbtn"
              onClick={handleAddCompositionDialog}
            >
              <Plus />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 createTbtn"
            >
              <Table2 />
            </Button>
          </div>
        </div>
      </div>
      <CompositionDialog
        isOpen={openDialog}
        onClose={handleAddCompositionDialog}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-1 mb-4 mt-4 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="w-[15%] truncate">
                        Name (<span className="text-red-500">*</span>)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter Grade Composition Name"
                        />
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
                    <div className="flex justify-between items-center">
                      <FormLabel className="w-[15%] truncate">
                        Scale (<span className="text-red-500">*</span>)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter Scale"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row justify-end gap-1">
              <Button type="submit">Add</Button>
              <DialogClose asChild>
                <Button id="closeDia" type="button" variant="default">
                  Close
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </CompositionDialog>
    </div>
  );
};

export default DragNDropBox;
