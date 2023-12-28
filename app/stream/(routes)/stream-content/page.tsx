"use client";

import AnnounceCard from "@/components/Card/AnnounceCard";
import UpcomingCard from "@/components/Card/UpcomingCard";
import ClassroomMenu from "@/components/DropDownMenu/ClassroomMenu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setCurrentClassroom } from "@/redux/slices/classroom-info-slice";
import { useParams } from "next/navigation";
import { AXIOS } from "@/constants/ApiCall";

const StreamContent = () => {
  const isNecessary = false;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const currentClassroom = useAppSelector(
    (state) => state.classroomInfoReducer.value?.currentClassroom
  );
  const classList = useAppSelector(
    (state) => state.classroomInfoReducer.value?.classroomList
  );

  const userInClass = useAppSelector(
    (state) => state.classroomInfoReducer.value?.currentClassroom?.user
  );
  const isStudent = userInClass?.member_role < 2;
  const classname = classList.filter((classroom: any) => classroom.classroom_id === currentClassroom)
  console.log(classname);

  if (!currentClassroom) {
    const fetchCurrentClassroom = async () => {
      setLoading(true);

      try {
        const res = AXIOS.GET({
          uri: `/classroom/info/${params.classroomId}`,
          token: localStorage.getItem("access-token") ?? "",
        });

        console.log(res);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentClassroom();
  }

  return (
    <div className="stream-container">
      <div className="stream-header">
        <div className="wrapper">
          <div className="stream-header-image"></div>
          <div className="stream-header-label">
            <div className="main-label">
              CLASSROOM&lsquo;S NAME
              {classname}
            </div>
            <div className="sub-label">Advanced Web Programming</div>
            {!isStudent && isNecessary ? (
              <div className="change-theme-btn">
                <Button variant="link" className="text-white text-xs">
                  Select Theme
                </Button>
                <Button variant="link" className="text-white text-xs text-left">
                  Upload Theme
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
          {!isStudent ? (
            <div className="classroom-sharing">
              <ClassroomMenu />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="stream-body">
        <aside role="complementary" className="stream-aside">
          <div className="stream-aside-wrapper">
            <div className="upcoming">
              <UpcomingCard />
            </div>
          </div>
        </aside>
        <main className="stream-main">
          <section role="section" id="streamContent">
            <div className="streamContent-wrapper">
              <AnnounceCard />
              <div className="announce-box">StreamStack</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default StreamContent;
