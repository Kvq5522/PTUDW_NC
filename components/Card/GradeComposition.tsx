import { GripHorizontal, ClipboardEdit, Pencil, Trash2 } from "lucide-react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface gradeCompositionProps {
  index: number;
  id: string;
  name: string;
  scale: number;
  // onRemove: () => void;
}

const GradeComposition = (props: gradeCompositionProps) => {
  return (
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
                type="text"
                className="w-8 text-center"
                value={props.scale}
              />
            </div>
            <Separator orientation="vertical" className="bg-slate-600" />
            <div className="dndl-item-actions">
              <div>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-xl">
                  <Pencil className="h-5 w-5 text-blue-800" />
                </Button>
              </div>
              <div>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-xl">
                  <ClipboardEdit className="h-5 w-5 text-green-800" />
                </Button>
              </div>
              <div>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-xl">
                  <Trash2 className="h-5 w-5 text-red-800" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default GradeComposition;
