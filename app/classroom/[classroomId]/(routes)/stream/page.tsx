"use client";

import AnnounceCard from "@/components/Card/AnnounceCard";
import UpcomingCard from "@/components/Card/UpcomingCard";
import ClassroomMenu from "@/components/DropDownMenu/ClassroomMenu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setCurrentClassroom } from "@/redux/slices/classroom-info-slice";
import { useParams } from "next/navigation";
import { AXIOS } from "@/constants/ApiCall";

import "@/Styles/stream.css";
import { toast, useToast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader/Loader";
import EmptyState from "@/components/EmptyState";
import { streamDataItems } from "@/constants/mockdata";

import StreamItemCard from "@/components/Card/StreamItemCard";

const StreamContent = () => {
  const isNecessary = false;
  const [streamItems, setStreamItems] = useState(streamDataItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const toast = useToast();

  const userInClass = useAppSelector(
    (state) => state.classroomInfoReducer.value?.currentClassroom?.user
  );
  const isStudent = userInClass?.member_role < 2;

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
          throw new Error(res.message);
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
    <div className="stream-container">
      <div className="stream-header">
        <div className="wrapper">
          <div className="stream-header-image"></div>
          <div className="stream-header-label">
            <div className="main-label">CLASSROOM&lsquo;S NAME</div>
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
              {streamItems.length === 0 ? (
                <div className=" announce-box">Default</div>
              ) : (
                streamItems.map((itemS, index) => (
                  itemS.type === "grade-material"? (
                    // <StreamCardtoGrade key={itemS.id}/>
                    <StreamItemCard key={itemS.id} idCard={itemS.id} itemType="grade-material" />
                  ) : (
                    <StreamItemCard key={itemS.id} idCard={itemS.id} itemType="detail-material" />
                  )
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default StreamContent;
