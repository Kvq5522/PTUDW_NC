"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { AXIOS } from "@/constants/ApiCall";
import { useAppSelector } from "@/redux/store";
import { cn } from "@/lib/utils";

interface ProfileButtonProps {
  className?: string;
}

export const NotificationButton: React.FC<ProfileButtonProps> = (
  props: ProfileButtonProps
) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newNoti, setNewNoti] = useState(false);

  const userId = useAppSelector(
    (state) => state.userInfoReducer.value?.userInfo?.id
  );

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await AXIOS.GET({
          uri: `/announcement/get-notifications`,
          token: localStorage.getItem("access-token") ?? "",
        });

        if (res.statusCode && res.statusCode === 200) {
          setNotifications(res.metadata);

          const checkHasSeen = res.metadata.some((item: Notification) =>
            item.has_seen.includes(String(userId))
          );

          if (!checkHasSeen) {
            setNewNoti(true);
          } else {
            setNewNoti(false);
          }

          return;
        }

        if (res && (res.status >= 400 || res.statusCode >= 400)) {
          throw new Error(res.message);
        }
      } catch (error) {
        console.log(error);
        setNotifications([]);
      }
    };

    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative" onClick={() => setNewNoti(false)}>
          <Bell />

          {newNoti && (
            <div className="absolute z-[10] rounded-lg bg-red-500 w-2 h-2 top-[-3px] right-[-3px]"></div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[65vw] sm:w-[25vw] md:w-[18vw] overflow-auto max-h-[50vh] overflow-y-auto">
        <DropdownMenuLabel>Your notifications...</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Array.isArray(notifications) &&
          notifications.length > 0 &&
          notifications.map((item, index) => {
            let url = "";

            switch (item.type) {
              case "GRADE_REVIEW":
                url = `/classroom/${item.classroom_id}/stream/${item.announcement_id}/stream-detail`;
                break;
              case "GRADE_ANNOUNCEMENT":
                url = `/classroom/${item.classroom_id}/grade/transcript`;
                break;
              default:
                break;
            }

            return (
              <DropdownMenuItem
                className={cn(
                  "my-2",
                  !item.has_seen.includes(String(userId))
                    ? "bg-blue-300 bg-opacity-25 "
                    : ""
                )}
                key={index}
              >
                <Link href={url} className="w-full">
                  <h1
                    className={cn(
                      "text-lg break-words w-full border-b-2 mb-2",
                      !item.has_seen.includes(String(userId))
                        ? "font-semibold"
                        : "font-light"
                    )}
                  >
                    {`"${item.classroom_fk.name}" has new announcement`}
                  </h1>
                  <p className="text-md font-light break-words">{`${item.title}`}</p>
                </Link>
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface Notification {
  title: string;
  to_members: string;
  createdAt: string;
  updatedAt: string;
  classroom_id: number;
  classroom_fk: {
    name: string;
  };
  announcement_id: number;
  has_seen: string;
  type: string;
}
