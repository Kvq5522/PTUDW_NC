"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useAppSelector } from "@/redux/store";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoreVertical, UserPlus } from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

const People = () => {
  const inviteTeacherModal = useInviteTeacherModal();
  const inviteStudentModal = useInviteStudentModal();

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
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
      setLoadingMessage("Loading classroom info...");

      try {
        const res = await AXIOS.GET({
          uri: `/classroom/info/${params.classroomId}`,
          token: localStorage.getItem("access-token") ?? "",
        });

        if (res.statusCode && res.statusCode === 200) {
          const { user, members, invitations } = res.metadata;
          members.sort((a: any, b: any) => a.member_role - b.member_role);

          dispatch(setCurrentClassroom({ user, members, invitations }));
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

  const deleteUsersFromClass = async (memberId: number) => {
    const user = members?.find((member: any) => member.member_id === memberId);

    if (!user) return;

    try {
      setLoading(true);
      setLoadingMessage("Deleting user from class...");

      const res = await AXIOS.POST({
        uri: `/classroom/delete-member`,
        token: localStorage.getItem("access-token") ?? "",
        params: {
          classroom_id: params.classroomId,
          member_emails: [user?.member_id_fk?.email as string],
        },
      });

      if (res.statusCode && res.statusCode === 200) {
        toast.toast({
          title: "Success",
          description: "Update Successfully!",
          className: "top-[-80vh] bg-green-500 text-white",
        });
        const deleteMember = res.metadata.success;
        const deletedEmail = deleteMember.map(
          (member: any) => member.member_email
        );

        const newMembers = members
          ?.filter(
            (member: any) => !deletedEmail.includes(member.member_id_fk.email)
          )
          .sort((a: any, b: any) => a.member_role - b.member_role);

        dispatch(
          setCurrentClassroom({
            user: userInClass,
            members: newMembers,
            invitations: invitations,
          })
        );

        return;
      }
    } catch (error: any) {
      toast.toast({
        title: "Error",
        description: error.message ?? "Something went wrong",
        variant: "destructive",
        className: "top-[-85vh]",
      });
    } finally {
      setLoading(false);
    }
  };

  if (error)
    return (
      <div className="w-full h-full">
        <EmptyState
          title="No result found"
          subTitle="Something's wrong :("
          showReset
        />
      </div>
    );

  if (loading)
    return (
      <div className="w-full h-full">
        <Loader text={loadingMessage} className="w-full h-full" />
      </div>
    );

  return (
    <div className="overflow-x-auto px-8 pt-6 relative">
      <Toaster />
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

                  {isOwner &&
                    member?.member_id_fk.email !==
                      userInClass?.member_id_fk?.email && (
                      <div className="pt-[0.35rem]">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreVertical />
                          </DropdownMenuTrigger>

                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                  deleteUsersFromClass(member.member_id)
                                }
                              >
                                Delete user from class
                              </Button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

                  {isOwner &&
                    member?.member_id_fk.email !==
                      userInClass?.member_id_fk?.email && (
                      <div className="pt-[0.35rem]">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreVertical />
                          </DropdownMenuTrigger>

                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                  deleteUsersFromClass(member.member_id)
                                }
                              >
                                Delete user from class
                              </Button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
