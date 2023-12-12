import { GripHorizontal, ClipboardEdit, Pencil, Trash2 } from "lucide-react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CompositionDialog from "../Dialog/CompositionDialog";
import { useEffect, useState } from "react";

type gradeComposition = {
  index: number;
  id: string;
  name: string;
  scale: string;
  status: string;
}

interface gradeCompositionProps extends gradeComposition {
  
  // onRemove: () => void;
  // open: (type: string) => void;
  onScaleChange: (id: string, newScale: string) => void;
  onNameChange: (id: string, newName: string) => void;
  onRemoveChange: (id: string) => void;
  onOpenTable: (type: string, compositionID: string) => void;
}

const GradeComposition = (props: gradeCompositionProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newName, setNewName] = useState(props.name);
  const [inputText, setInputText] = useState(props.name);

  function handleOpenDialog() {
    setOpenDialog(true);
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSave = () => {
    setNewName(inputText);
    props.onNameChange(props.id, newName);
    handleCloseDialog();
  };

  const handleSelectChange = (value: string) => {
    console.log(props.id, value)
  }

  return (
    <>
      <Draggable key={props.id} draggableId={props.id} index={props.index}>
        {(provided, snapshot) => (
          <div
            className="dndl-item"
            ref={provided.innerRef}
            // {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <div className="dndl-item-wrapper">
              <div
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                className="mr-1"
              >
                <GripHorizontal />
              </div>

              <div className="dndlina">{newName}</div>

              <div className="dndliwi">
                <input
                  type="number"
                  className="w-12 text-center border-none p-0"
                  value={props.scale}
                  onChange={(e) =>
                    props.onScaleChange(props.id, e.target.value)
                  }
                  max={100}
                />
              </div>

              <div className="dndshare">
                <Select defaultValue={props.status} onValueChange={handleSelectChange}>
                  <SelectTrigger placeholder="Select state" className="w-[90px] h-[30px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public" >Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="dndl-item-actions">
                <Separator
                  orientation="vertical"
                  className="bg-slate-600 m-1"
                />
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-xl"
                    onClick={handleOpenDialog}
                  >
                    <Pencil className="h-5 w-5 text-blue-800" />
                  </Button>
                </div>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-xl"
                    onClick={() => props.onOpenTable("tableDialog", props.id)}
                  >
                    <ClipboardEdit className="h-5 w-5 text-green-800" />
                  </Button>
                </div>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-xl"
                    onClick={() => props.onRemoveChange(props.id)}
                  >
                    <Trash2 className="h-5 w-5 text-red-800" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>

      {/* Edit Dialog */}
      <CompositionDialog
        id={props.id}
        key={props.id}
        isOpen={openDialog}
        onClose={handleCloseDialog}
        classname=" h-auto w-auto"
      >
        <div className=" mb-2">
          <Label htmlFor="grade-name">Grade name</Label>
          <Input
            id="grade-name"
            type="text"
            value={inputText}
            className="bg-slate-200 "
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button variant="default" onClick={handleSave}>
            Save
          </Button>
          <Button variant="destructive" onClick={handleCloseDialog}>
            Close
          </Button>
        </div>
      </CompositionDialog>
    </>
  );
};

export default GradeComposition;
