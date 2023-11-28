"use client";
import {
  BookOpenCheck,
  Calendar,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  HardDriveDownload,
  Home,
  Settings,
} from "lucide-react";

import Link from "next/link";
import React, { ElementType, ReactNode, Children, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { boolean } from "zod";
import { type } from "os";
import { useSidebarContext } from "../Contexts/SideBarContext";
import { FirstNabarSection } from "../Navbar/DashboardNavbar";

const DashBoardSideBar = () => {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1  ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/"></SmallSidebarItem>
        <SmallSidebarItem
          Icon={Calendar}
          title="Calendar"
          url="/"
        ></SmallSidebarItem>
        <div className="border"></div>
        <SmallSidebarItem
          Icon={GraduationCap}
          title="sub"
          url="/"
        ></SmallSidebarItem>
        <div className="border"></div>
        <SmallSidebarItem
          Icon={HardDriveDownload}
          title="Home"
          url="/"
        ></SmallSidebarItem>
        <SmallSidebarItem
          Icon={Settings}
          title="asdas"
          url="/"
        ></SmallSidebarItem>
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2  ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen " : "hidden"}`}
      >
        <div className=" lg:hidden pt-2 pb-4 sticky top-0 bg-white">
          <FirstNabarSection />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem isActive Icon={Home} title="Home" url="/" />
          <LargeSidebarItem Icon={Calendar} title="Calendar" url="/" />
          <hr></hr>
          <LargeSidebarSection visibleItemCount={1}>
            <LargeSidebarItem
              Icon={GraduationCap}
              title="Subscription"
              url="/"
            />
            <LargeSidebarItem Icon={BookOpenCheck} title="To Do" url="/" />
          </LargeSidebarSection>

          <hr></hr>
          <LargeSidebarItem
            Icon={HardDriveDownload}
            title="Saved Classes"
            url="/"
          />
          <LargeSidebarItem Icon={Settings} title="Setting" url="/" />
        </LargeSidebarSection>
      </aside>
    </>
  );
};

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
  children?: React.ReactElement;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <Link
      href={url}
      className={twMerge(
        buttonVariants({ variant: "ghost" }),
        "py-4 px-1 flex items-center rounded-lg gap-1"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
}

type LagreSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
  isActive?: boolean;
};

type LagreSidebarSeactionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LagreSidebarSeactionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          variant="ghost"
          className="w-full flex items-center justify-normal rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "show less" : "show more"}</div>
        </Button>
      )}
    </div>
  );
}

function LargeSidebarItem({
  Icon,
  title,
  url,
  isActive = false,
}: LagreSidebarItemProps) {
  return (
    <Link
      href={url}
      className={twMerge(
        buttonVariants({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 justify-normal ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary " : undefined
        }`
      )}
    >
      <Icon className="h-6 w-6"></Icon>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </Link>
  );
}

export default DashBoardSideBar;
