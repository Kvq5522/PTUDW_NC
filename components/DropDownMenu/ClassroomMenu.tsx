import { MoreVertical, UserPlus, Scan, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { useRouter } from "next/router";
import { Separator } from "@/components/ui/separator";
import { Input } from "../ui/input";
import ShowResult from "../InviteStudent/ShowResult";
import SearchWithEmail from "../InviteStudent/SearchWithEmail";
import { Label } from "../ui/label";

const ClassroomMenu = () => {
  const classcode = "0123456789"; // Tối đa 10 ký tự
  const classlink =
    "https://classroom.google.com/c/NjQyNDY3MTk3Mzg4?cjc=xwhpugk";
  const copyToClipboard = () => {
    navigator.clipboard.writeText(classcode);
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="bg-transparent h-full w-full rounded-full"
          >
            <MoreVertical className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem className="flex items-center p-0">
            <div className="h-full w-full p-1">
              <DialogTrigger className="flex items-center h-full w-full">
                <UserPlus className="mx-1" />
                <span className="ml-1"> Invite to Class </span>
              </DialogTrigger>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-300" />
          <DropdownMenuLabel className="flex items-center justify-between h-9">
            <span className="block text-center mr-0">Class Code: </span>
            <span className="text-center font-light">{classcode}</span>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <Scan className="w-4 h-4" />
            </Button>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="invite-dialog">
        <DialogHeader>
          <DialogTitle className="font-medium tracking-wider">
            Invite Students
          </DialogTitle>
        </DialogHeader>
        <div className="inv-dialog-wrapper">
          <div className="inv-dialog-content">
            {/* Invite Link */}
            <div>
              <Label htmlFor="classlink" className="font-normal">
                Direct Link
              </Label>
              <div className="classlink-area">
                <Input
                  id="classlink"
                  className="font-extralight"
                  defaultValue={classlink}
                  readOnly
                />
                <Button
                  type="submit"
                  size="sm"
                  className="px-3"
                  onClick={copyToClipboard}
                >
                  <span className="sr-only">Copy</span>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Search Student */}
            <div className="inv-student-area">
              <div className="inv-student-wrapper">
                <Separator id="topline" />
                <div className="search-select">
                  <SearchWithEmail />
                </div>
                <Separator id="bottomline" />
                
                <ShowResult />
                
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button id="closeDia" type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button id="invite" type="button" className=" bg-blue-600">
            <span className="font-semibold">Invite</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClassroomMenu;
