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
import InviteStudentModal from "@/components/Modal/InviteStudentModal";
import { useInviteStudentModal } from "@/hooks/invite-student-modal";

import { useToast } from "@/components/ui/use-toast";
import { AXIOS } from "@/constants/ApiCall";
import { setCurrentClassroom } from "@/redux/slices/classroom-info-slice";
import Loader from "@/components/Loader/Loader";
import EmptyState from "@/components/EmptyState";
import Image from "next/image";

const People = () => {
  const inviteTeacherModal = useInviteTeacherModal();
  const inviteStudentModal = useInviteStudentModal();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  const members = useAppSelector(
    (state) => state.classroomInfoReducer.value?.currentClassroom?.members
  );
  const userInClass = useAppSelector(
    (state) => state.classroomInfoReducer.value?.currentClassroom?.user
  );
  const invitations = useAppSelector(
    (state) => state.classroomInfoReducer.value?.currentClassroom?.invitations
  );
  const isStudent = userInClass?.member_role < 2;
  const isOwner = userInClass?.member_role === 3;

  useEffect(() => {
    const fetchCurrentClassroom = async () => {
      setLoading(true);

      try {
        const res = await AXIOS.GET({
          uri: `/classroom/info/${params.classroomId}`,
          token: localStorage.getItem("access-token") ?? "",
        });

        if (res.statusCode && res.statusCode === 200) {
          dispatch(setCurrentClassroom(res.metadata));
          return;
        }

        if (res && (res.status >= 400 || res.statusCode >= 400)) {
          throw new Error(res.message ?? res.data.message);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentClassroom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return <Loader className="w-[100%] h-[100%]" text="Loading..." />;

  if (error)
    return (
      <div className="w-[100%] h-[100%]">
        <EmptyState
          title="No result found"
          subTitle="Something's wrong :("
          showReset
        />
      </div>
    );

  return (
    <div className="overflow-x-auto px-8 pt-[2rem]">
      <div className="grid gap-4 h-[50%]">
        <Card>
          <CardHeader>
            <div className="flex gap-10 lg:gap20 justify-between py-2 mb-6 mx-4 border-b-4">
              <div className="text-3xl">Teacher</div>

              <InviteTeacherModal
                invite_code={invitations.teacher_invite_code}
                invite_uri={invitations.teacher_invite_uri_code}
              />

              {!isStudent && (
                <div
                  className="cursor-pointer"
                  onClick={() => inviteTeacherModal.onOpen()}
                >
                  <UserPlus />
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent>
            {members?.map((member: any, index) => {
              if (member.member_role < 2) return null;

              return (
                <div
                  key={index}
                  className="flex gap-10 lg:gap20 justify-between pt-2 mb-6 mx-4 "
                >
                  <div className="flex gap-8">
                    <Avatar className="object-cover">
                      <AvatarImage src={member?.member_id_fk.avatar} />
                      <AvatarFallback>
                        <Image
                          src="/images/user-default-avatar.png"
                          fill
                          className="w-full h-full"
                          alt="User Avatar"
                        />
                      </AvatarFallback>
                    </Avatar>

                    <div className="font-bold pt-[0.35rem]">
                      {member?.member_id_fk.email}
                    </div>
                  </div>

                  {isOwner && (
                    <div className="pt-[0.35rem]">
                      <MoreVertical />
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 pt-6 h-[50%]">
        <Card>
          <CardHeader>
            <div className="flex gap-10 lg:gap20 justify-between py-2 mb-6 mx-4 border-b-4">
              <div className="text-3xl">Student</div>

              <InviteStudentModal
                invite_code={invitations.student_invite_code}
                invite_uri={invitations.student_invite_uri_code}
              />

              <div
                className="cursor-pointer"
                onClick={() => inviteStudentModal.onOpen()}
              >
                <UserPlus />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {members?.map((member: any, index) => {
              if (member.member_role > 1) return null;

              return (
                <div
                  key={index}
                  className="flex gap-10 lg:gap20 justify-between pt-2 mb-6 mx-4 "
                >
                  <div className="flex gap-8">
                    <Avatar className="object-cover">
                      <AvatarImage src={member?.member_id_fk.avatar} />
                      <AvatarFallback>
                        <Image
                          src="/images/user-default-avatar.png"
                          fill
                          className="w-full h-full"
                          alt="User Avatar"
                        />
                      </AvatarFallback>
                    </Avatar>

                    <div className="font-bold pt-[0.35rem]">
                      {member?.member_id_fk.email}
                    </div>
                  </div>

                  {(!isStudent ||
                    member.member_email === userInClass.member_id_fk.email) && (
                    <div className="pt-[0.35rem]">
                      <MoreVertical />
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default People;
