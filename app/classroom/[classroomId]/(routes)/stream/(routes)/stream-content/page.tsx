"use client";

import AnnounceCard from "@/components/Card/AnnounceCard";
import UpcomingCard from "@/components/Card/UpcomingCard";
import ClassroomMenu from "@/components/DropDownMenu/ClassroomMenu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const StreamContent = () => {
  const [isTeacher, setIsTeacher] = useState(true);
  const isNecessary = false;

  return (
    <div className="stream-container">
      <div className="stream-header">
        <div className="wrapper">
          <div className="stream-header-image"></div>
          <div className="stream-header-label">
            <div className="main-label">CLASSROOM&lsquo;S NAME</div>
            <div className="sub-label">Advanced Web Programming</div>
            {isTeacher && isNecessary ? (
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
          {isTeacher ? (
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
              <div className=" announce-box">StreamStack</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default StreamContent;
