import * as React from "react";
import { FolderOpen, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ClassCard() {
  //   const history = useHistory();
  //   const goToClass = () => {
  //     history.push(`/class/${id}`);
  //   };
  return (
    <Card className="w-[350px]">
      <CardHeader className="border-b">
        <CardTitle>20KTPM02-Huy Ha</CardTitle>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-right">
        <Button variant="ghost">
          <FolderOpen />
        </Button>
        <Button variant="ghost">
          <UserPlus />
        </Button>
      </CardFooter>
    </Card>
    // <div className="classCard">
    //   <div className="classCard__upper">
    //     <div className="classCard__className">20KTPM02</div>
    //     <div className="classCard__creatorName">Huy Ha</div>
    //     <img className="classCard__creatorPhoto" />
    //   </div>
    //   <div className="classCard__middle"></div>
    //   <div className="classCard__lower">
    //     <IconButton>
    //       <FolderOpenOutlined />
    //     </IconButton>
    //
    //   </div>
    // </div>
  );
}
export default ClassCard;
