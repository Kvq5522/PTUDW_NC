"use client";

import { Separator } from "@radix-ui/react-select";
import { Plus, Table2 } from "lucide-react";
import { useState } from "react";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import GradeComposition from "../Card/GradeComposition";
import { Button } from "../ui/button";

const gradeComposition = [
  {
    id: "oie112",
    name: "Midterm",
    scale: 30,
  },
  {
    id: "asd1232",
    name: "Exercises1",
    scale: 5,
  },
  {
    id: "fas1241",
    name: "Finalterm",
    scale: 50,
  },
  {
    id: "sdf1231",
    name: "Exercises2",
    scale: 5,
  },
  {
    id: "fgw1421",
    name: "Exercises3",
    scale: 2,
  },
  {
    id: "fad1235",
    name: "Exercises5",
    scale: 2,
  },
  {
    id: "asg0693",
    name: "Exercises4",
    scale: 2,
  },
];

const DragNDropBox = () => {
  const [itemList, setItemList] = useState(gradeComposition);
  let totalScale = 0;
  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(itemList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setItemList(items);
  }
  function calcSum() {
    totalScale = 0;
    for (let i = 0; i < gradeComposition.length; i++) {
      totalScale += gradeComposition[i].scale;
    }
    return totalScale;
  }
  calcSum();
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
          <input type="text" className="w-9 text-center" value={totalScale} disabled />
          <div className="flex flex-row gap-1 dndl-tools-actions">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 addIPlustbtn"
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
    </div>
  );
};

export default DragNDropBox;
