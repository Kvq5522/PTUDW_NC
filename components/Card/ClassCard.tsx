import * as React from "react";
import Link from "next/link";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ClassCardProps {
  id: string;
  classroomName: string;
  creatorName: string;
  creatorPhoto: string;
  className?: string;
}

const ClassCard: React.FC<ClassCardProps> = ({
  id,
  classroomName,
  creatorName,
  creatorPhoto,
  className,
}) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="border-b">
        <CardTitle>
          <HoverCard>
            <HoverCardTrigger
              href={`/classroom/${id}/stream/stream-content`}
            >
              <div className="truncate">{classroomName}</div>
            </HoverCardTrigger>
          </HoverCard>
        </CardTitle>

        <Avatar>
          <AvatarImage
            src={creatorPhoto}
            className="object-cover"
            alt="@shadcn"
          />
          <AvatarFallback>
            <Image
              src="/images/user-default-avatar.png"
              fill
              className="object-cover w-full h-full"
              alt="User Avatar"
            />
          </AvatarFallback>
        </Avatar>
      </CardHeader>

      <CardContent></CardContent>

      <CardFooter className="flex justify-right overflow-x-auto">
        <p>Owner: {creatorName}</p>

        {/* <Button variant="ghost">
          <FolderOpen />
        </Button>

        <Button variant="ghost">
          <UserPlus />
        </Button> */}
      </CardFooter>
    </Card>
  );
};
export default ClassCard;
