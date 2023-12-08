"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useAppSelector } from "@/redux/store";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoreVertical, UserPlus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import InviteTeacherModal from "@/components/Modal/InviteTeacherModal";
import { useInviteTeacherModal } from "@/hooks/invite-teacher-modal";

const People = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const inviteTeacherModal = useInviteTeacherModal();

  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useAppSelector((state) => state.userInfoReducer.value);
  const currentClassroom = useAppSelector((state) =>
    state.classroomInfoReducer.value?.classroomList?.find(
      (classroom: any) =>
        classroom?.classroom_id === Number(params?.classroomId)
    )
  );

  if (!userInfo || !currentClassroom) {
    const fetchUser = async () => {};
  }

  return (
    <div className="overflow-x-auto px-8">
      <div className="grid gap-4 h-[50%]">
        <Card>
          <CardHeader>
            <div className="flex gap-10 lg:gap20 justify-between py-2 mb-6 mx-4 border-b-4">
              <div className="text-3xl">Teacher</div>

              <InviteTeacherModal invite_code="test" invite_uri="test" />

              <div
                className="cursor-pointer"
                onClick={() => inviteTeacherModal.onOpen()}
              >
                <UserPlus />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex gap-10 lg:gap20 justify-between pt-2 mb-6 mx-4 ">
              <div className="flex gap-8">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="font-bold pt-[0.35rem]">
                  Name
                </div>
              </div>

              <div className="pt-[0.35rem]">
                <MoreVertical />
              </div>
            </div>

            <div className="flex gap-10 lg:gap20 justify-between pt-2 mb-6 mx-4 ">
              <div className="flex gap-8">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <strong>Andrew Alfred</strong>
              </div>

              <MoreVertical />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 pt-6 h-[50%]">
        <Card>
          <CardHeader>
            <div className="flex gap-10 lg:gap20 justify-between py-2 mb-6 mx-4 border-b-4">
              <div className="text-3xl">Student</div>

              <Popover>
                <PopoverTrigger>
                  <UserPlus />
                </PopoverTrigger>
                <PopoverContent>
                  Place content for the popover here.
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-10 lg:gap20 justify-between pt-2 mb-6 mx-4 ">
              <div className="flex gap-8">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <strong>Andrew Alfred</strong>
              </div>

              <MoreVertical />
            </div>
            <div className="flex gap-10 lg:gap20 justify-between pt-2 mb-6 mx-4 ">
              <div className="flex gap-8">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <strong>Andrew Alfred</strong>
              </div>

              <MoreVertical />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default People;
