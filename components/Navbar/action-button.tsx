import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { AlignJustify } from "lucide-react";
import Link from "next/link";

const ActionButton = () => {
  return (
    <div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <AlignJustify />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <div className="flex flex-col space-y-4 items-start w-full text-lg text-black alt-10">
                  <Link href="/sign-in">Sign In</Link>
                  <Link href="/sign-up">Sign Up</Link>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:flex md:space-x-4 ">
        <Button className="text-md bg-green-500">
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button className="text-md bg-green-500 ">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};

export default ActionButton;
