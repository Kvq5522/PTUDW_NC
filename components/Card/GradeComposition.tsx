import { GripHorizontal, ClipboardEdit, Pencil, Trash2 } from "lucide-react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import CompositionDialog from "../Dialog/CompositionDialog";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface gradeCompositionProps {
  index: number;
  id: string;
  name: string;
  scale: string;
  // onRemove: () => void;
  // open: (type: string) => void;
  onScaleChange: (id: string, newScale: string) => void;
  onRemoveChange: (id: string) => void;
}

const GradeComposition = (props: gradeCompositionProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  function handleOpenDialog() {
    setOpenDialog(true);
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
              <div className="dndlina">{props.name}</div>

              <div className="dndliwi">
                <input
                  type="number"
                  className="w-10 text-center border-none p-0"
                  value={props.scale}
                  onChange={(e) =>
                    props.onScaleChange(props.id, e.target.value)
                  }
                />
              </div>
              <Separator orientation="vertical" className="bg-slate-600" />
              <div className="dndl-item-actions">
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

      <CompositionDialog
        key={props.id}
        isOpen={openDialog}
        onClose={handleCloseDialog}
      >
        <div className="">
          <Label htmlFor="grade-name">Grade name</Label>
          <Input id="grade-name" type="text" value={props.name} />
        </div>
        <div>
          <Button onClick={handleCloseDialog}>Close Dialog</Button>
        </div> 
      </CompositionDialog>
    </>
  );
};

export default GradeComposition;
