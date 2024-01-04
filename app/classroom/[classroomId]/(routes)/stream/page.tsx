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

import StreamItemCard from "@/components/Card/StreamItemCard";
import CommentModal from "@/components/Modal/CommentModal";
import { useCommentModal } from "@/hooks/comment-modal";
import { number } from "zod";

const StreamContent = () => {
  const isNecessary = false;
  const [streamItems, setStreamItems] = useState<ClassroomAnnouncement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cardSpecs, setCardSpecs] = useState<any>({
    itemId: -1,
    itemType: "",
    classId: -1,
  });
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const toast = useToast();

  const userInClass = useAppSelector(
    (state) => state.classroomInfoReducer.value?.currentClassroom?.user
  );
  const isStudent = userInClass?.member_role < 2;
  const currentClassroom = useAppSelector(
    (state) => state.classroomInfoReducer.value?.currentClassroom
  );
  const classroomList = useAppSelector(
    (state) => state.classroomInfoReducer.value?.classroomList
  );
  const classList: Array<any> = Array.isArray(classroomList)
    ? classroomList
    : [];
  const currclr = classList.find(
    (item) => item.classroom_id.toString() === params.classroomId
  );
  const currentUser = useAppSelector(
    (state) => state.userInfoReducer.value?.userInfo
  );

  const commentModal = useCommentModal();
  const handleOpenComment = (cid: number, iid: number, itype: string) => {
    setCardSpecs({
      itemId: iid,
      itemType: itype,
      classId: cid,
    });
    commentModal.onOpen();
  };

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

    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const res = await AXIOS.GET({
          uri: `/announcement/get-classroom-announcement/${params.classroomId}`,
          token: localStorage.getItem("access-token") ?? "",
        });

        if (res.statusCode === 200) {
          setStreamItems(res.metadata);
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
      setLoading(false);
    };

    if (!currentClassroom.user.classroom_id) fetchCurrentClassroom();
    fetchAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <div className="main-label">{currclr.classroom_id_fk.name}</div>
            <div className="sub-label"></div>
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
          {/* {!isStudent ? (
            <div className="classroom-sharing">
              <ClassroomMenu />
            </div>
          ) : (
            <></>
          )} */}
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

        <main className="stream-main relative">
          {loading && (
            <Loader
              className="absolute w-full h-[50%] z-[1000] bg-white"
              text="Getting announcements..."
            />
          )}

          <section role="section" id="streamContent">
            <div className="streamContent-wrapper">
              <AnnounceCard />
              {streamItems.length === 0 ? (
                <div className="empty-box">
                  <div className="h-[13rem] px-6 py-5 w-full flex flex-row justify-center">
                    <svg
                      viewBox="0 0 241 149"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="Fnu4gf"
                    >
                      <path
                        d="M138.19 145.143L136.835 145.664C134.646 146.498 132.249 145.352 131.519 143.164L82.4271 8.37444C81.5933 6.18697 82.7398 3.79117 84.9286 3.06201L86.2836 2.54118C88.4724 1.70786 90.8697 2.85368 91.5993 5.04115L140.691 139.831C141.421 142.018 140.379 144.414 138.19 145.143Z"
                        stroke="#5F6368"
                        strokeWidth="2"
                      ></path>
                      <path
                        d="M76.6602 10.5686C78.2029 12.2516 83.3923 14.7762 88.4414 13.0932C98.5395 9.72709 96.8565 2.57422 96.8565 2.57422"
                        stroke="#5F6368"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M60.1224 147.643C94.7266 135.143 112.55 96.9147 99.938 62.4361C87.4305 27.8532 49.1783 10.1451 14.5742 22.6449L60.1224 147.643ZM65.855 98.4772C77.3203 94.3106 83.2613 81.4983 79.0922 70.0401C74.923 58.4777 62.207 52.5403 50.6376 56.8111L65.855 98.4772Z"
                        fill="#CEEAD6"
                        className="VnOHwf-Ysl7Fe"
                      ></path>
                      <path
                        d="M58.1473 128.38L52.2567 130.905M52.2567 110.288L45.5246 112.812M44.6831 92.6157L39.2132 94.7195M38.3717 74.5232L32.9019 76.6269M32.4811 56.4306L26.5905 58.5344M25.749 38.7588L19.8584 40.8626"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M87.5996 128.38C94.472 121.227 105.86 101.199 103.168 78.3098C100.475 55.4206 89.7034 42.1247 84.6543 38.3379"
                        stroke="#5F6368"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M225.952 147.956H157.994C154.554 147.956 151.74 145.143 151.74 141.706V73.79C151.74 70.3525 154.554 67.54 157.994 67.54H225.952C229.391 67.54 232.205 70.3525 232.205 73.79V141.706C232.205 145.247 229.495 147.956 225.952 147.956Z"
                        stroke="#5F6368"
                        strokeWidth="2"
                      ></path>
                      <path
                        d="M232.205 73.79C232.205 70.3525 229.391 67.54 225.952 67.54H157.994C154.554 67.54 151.74 70.3525 151.74 73.79V100.977L232.205 81.4982V73.79Z"
                        fill="#5F6368"
                      ></path>
                      <path
                        d="M191.66 131.497C204.957 131.497 215.737 120.724 215.737 107.435C215.737 94.146 204.957 83.373 191.66 83.373C178.363 83.373 167.583 94.146 167.583 107.435C167.583 120.724 178.363 131.497 191.66 131.497Z"
                        fill="white"
                        stroke="#5F6368"
                        strokeWidth="2"
                      ></path>
                      <path
                        d="M211.303 90.0912L207.095 93.4573M191.527 82.5176V87.1459M174.697 88.8289L178.063 93.4573M165.44 106.921L170.91 107.763M178.063 122.49L174.697 126.697M191.527 128.801V133.429M205.833 122.49L209.62 126.697M213.407 107.763H218.456"
                        stroke="#5F6368"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M191.66 114.935C195.804 114.935 199.164 111.578 199.164 107.435C199.164 103.293 195.804 99.9355 191.66 99.9355C187.515 99.9355 184.155 103.293 184.155 107.435C184.155 111.578 187.515 114.935 191.66 114.935Z"
                        fill="#5F6368"
                      ></path>
                      <path
                        d="M10.7177 130.977C12.698 130.977 12.698 127.852 10.7177 127.852C8.73733 127.852 8.73733 130.977 10.7177 130.977Z"
                        fill="#5F6368"
                      ></path>
                      <path
                        d="M19.4368 106.921L8.49707 82.0967"
                        stroke="#5F6368"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M13.126 93.0719C13.126 90.9273 13.5467 89.2442 14.7268 87.1405C17.0871 82.9328 22.162 83.7743 22.8034 86.3398C23.2241 88.0229 22.3005 91.7688 19.7759 93.072C16.8301 94.5926 14.809 94.755 13.9675 94.755"
                        stroke="#5F6368"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M13.2331 93.6244C11.8849 91.9565 10.4997 90.9119 8.25948 90.0176C3.77892 88.2289 0.360966 92.0735 1.47485 94.4719C2.20559 96.0453 3.84062 97.8046 8.06124 97.8046C11.3764 97.8046 12.9821 95.9913 13.6366 95.4624"
                        stroke="#5F6368"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M26.5609 148.997C39.7431 148.997 50.4294 138.317 50.4294 125.143C50.4294 111.969 39.7431 101.289 26.5609 101.289C13.3787 101.289 2.69238 111.969 2.69238 125.143C2.69238 138.317 13.3787 148.997 26.5609 148.997Z"
                        fill="#DADCE0"
                      ></path>
                      <path
                        d="M16.8671 139.622C18.8475 139.622 18.8475 136.497 16.8671 136.497C14.8867 136.497 14.8867 139.622 16.8671 139.622Z"
                        fill="#5F6368"
                      ></path>
                      <path
                        d="M21.245 131.81C23.2254 131.81 23.2254 128.685 21.245 128.685C19.2647 128.685 19.2647 131.81 21.245 131.81Z"
                        fill="#5F6368"
                      ></path>
                      <path
                        d="M29.3749 138.685C31.3553 138.685 31.3553 135.56 29.3749 135.56C27.3946 135.56 27.3946 138.685 29.3749 138.685Z"
                        fill="#5F6368"
                      ></path>
                      <path
                        d="M23.538 143.477C25.5184 143.477 25.5184 140.352 23.538 140.352C21.5576 140.352 21.5576 143.477 23.538 143.477Z"
                        fill="#5F6368"
                      ></path>
                      <path
                        d="M18.3261 102.748C5.92283 107.227 -0.435161 120.977 4.0467 133.373C5.29745 136.914 7.38204 139.935 9.98777 142.435L34.0647 102.54C29.0617 100.873 23.6418 100.769 18.3261 102.748Z"
                        fill="#5F6368"
                      ></path>
                      <path
                        d="M149.451 35.8135C150.433 41.143 154.921 51.129 163.336 48.4362C171.751 45.7433 168.666 35.1122 165.861 29.9229"
                        stroke="#5F6368"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M167.374 31.082L148.926 37.4361C147.154 32.332 149.864 26.8112 154.971 25.0404C160.078 23.2696 165.602 25.9779 167.374 31.082Z"
                        fill="#1E8E3E"
                        className="VnOHwf-Wvd9Cc"
                      ></path>
                      <path
                        d="M199.581 23.0616L194.474 8.99933C195.933 7.95767 197.184 6.60353 198.122 5.04105C198.539 4.31189 198.956 3.47857 198.956 2.64525C198.956 1.81193 198.33 0.87444 197.497 0.87444C197.184 0.87444 196.871 0.978606 196.559 1.08277C194.474 1.91609 193.119 3.89523 191.972 5.87437L189.784 6.70769C190.201 4.52022 189.575 2.12442 188.116 0.45778C187.907 0.249449 187.803 0.145284 187.491 0.0411187C186.969 -0.167212 186.448 0.45778 186.136 0.978606C184.885 3.16607 184.781 5.87437 185.614 8.27017L168.104 14.6242C165.811 15.4576 164.56 18.0617 165.394 20.3533L166.228 22.7491C166.957 24.8324 169.25 25.8741 171.335 25.1449L174.045 32.5407C171.231 33.0615 168.625 34.7281 166.228 36.3948C165.186 37.1239 164.143 37.9573 164.247 39.3114C164.352 40.4572 165.186 41.2905 166.228 41.7072C168.104 42.3322 169.876 41.603 171.648 40.978C173.211 40.3531 174.879 39.7281 176.442 39.1031L176.859 40.3531C173.732 43.0614 171.752 47.1238 171.752 51.6029C171.752 56.3945 173.941 60.6653 177.485 63.3736C175.713 63.5819 173.837 64.1027 172.273 64.936C171.752 65.1444 171.335 65.4569 171.127 65.9777C170.71 66.811 171.439 67.8527 172.377 68.1652C173.315 68.4777 174.253 68.2693 175.192 68.061C176.963 67.7485 184.676 67.2277 188.637 66.4985C194.474 66.4985 212.714 66.4985 216.258 66.4985C224.596 66.4985 231.267 56.8112 231.267 48.4779C231.267 43.478 228.765 38.9989 224.909 36.2906C224.596 30.4574 230.225 31.3948 231.996 31.7073C234.185 32.2282 236.374 33.8948 238.459 32.3323C239.293 31.7073 239.709 30.6657 239.918 29.7282C245.338 7.43685 204.688 -2.97967 199.581 23.0616Z"
                        fill="#DADCE0"
                      ></path>
                      <path
                        d="M185.302 16.0826C186.108 16.0826 186.761 15.4297 186.761 14.6243C186.761 13.8189 186.108 13.166 185.302 13.166C184.496 13.166 183.843 13.8189 183.843 14.6243C183.843 15.4297 184.496 16.0826 185.302 16.0826Z"
                        fill="#5F6368"
                      ></path>
                      <path
                        d="M211.303 27.3983C213.406 25.7153 218.96 22.8541 224.346 24.8738C229.732 26.8934 232.2 30.7644 232.761 32.4474M211.303 20.2454C213.266 18.0014 219.044 14.3548 226.45 17.7209C231.359 19.9521 236.969 24.8738 239.073 31.1852M200.363 21.9285C199.942 23.4713 199.101 27.4825 199.101 31.1852C199.101 34.8878 199.942 40.0211 200.363 42.1248"
                        stroke="#5F6368"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M165.172 18.1085L168.233 16.9138"
                        stroke="#5F6368"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M172.172 67.3701H216.351"
                        stroke="#5F6368"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M135.145 49.6982L127.151 65.687M116.211 11.8301L118.735 36.6548"
                        stroke="#5F6368"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                    <div className=" w-full px-10 flex items-center">
                      <span className="text-[21px] font-bold">
                        You have no announcements
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                streamItems.map((itemS, index) => (
                  <StreamItemCard
                    key={index}
                    title={itemS.title}
                    idCard={itemS.id}
                    itemType={itemS.type}
                    createdAt={itemS.createdAt}
                    commentCount={itemS?.comment_count}
                    classroomId={parseInt(params.classroomId as string)}
                    onOpenComment={handleOpenComment}
                  />
                ))
              )}
            </div>
          </section>
        </main>
      </div>
      <CommentModal
        idCard={cardSpecs.itemId}
        idClass={cardSpecs.classId}
        typeCard={cardSpecs.itemType}
        currentuser={currentUser}
      />
    </div>
  );
};

interface ClassroomAnnouncement {
  id: number;
  description: string;
  title: string;
  created_by: number;
  grade_category: number;
  grade_category_fk: {
    name: string;
  };
  created_by_fk: {
    first_name: string;
    last_name: string;
    avatar: string;
  };
  type: "GRADE_REVIEW" | "GRADE_ANOUNCEMENT"; // Adjust if there are more types
  createdAt: string;
  comment_count: number;
}

export default StreamContent;
