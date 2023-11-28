import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";

interface SSelectedCardProps {
  index: number,
  email: string,
  onRemove: () => void
}

const SSelectedCard = (props: SSelectedCardProps) => {
  return (
    <>
      <style jsx>
        {`
          .selected-item-wrapper {
            background: #fff;
            display: flex;
            flex-direction: row;
            min-width: 1px;
          }
          .custom-item {
            display: inline-flex;
            justify-content: center;
            flex-direction: column;
            background: white;
            box-shadow: 0 0 0 1px rgb(218, 220, 224) inset;
            margin: 3px;
            border-radius: 50vh;
            min-width: 1px;
            user-select: none;
            outline: 1px solid transparent;
          }
          .siWcwi {
            display: inline-flex;
            min-width: 1px;
          }
          .dTiwraper {
            align-items: center;
            display: flex;
            flex-flow: row nowrap;
            padding: 4px;
          }
          .item-name {
            align-items: stretch;
            display: flex;
            flex: auto;
            flex-flow: column nowrap;
            justify-content: center;
            margin-left: 8px;
            margin-right: 8px;
            justify-items: stretch;
            overflow: hidden;
          }
          .item-delete {
            align-items: center;
            display: flex;
            flex: initial;
            height: 20px;
            margin-left: 0;
            margin-right: 4px;
            width: 20px;
          }
        `}
      </style>
      <div key={props.index} draggable="true" className="selected-item-wrapper">
        <div className="siWcwi">
          <div className="custom-item">
            <div className="dTiwraper">
              <Avatar className="flex-initial h-7 w-7">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="item-name">{props.email}</div>
              <div className="item-delete" onClick={props.onRemove}>
                <X className="block"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SSelectedCard;
