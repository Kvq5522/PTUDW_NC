"use client";

import { useCommentModal } from "@/hooks/comment-modal";
import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { AXIOS } from "@/constants/ApiCall";
import CommentArea from "../CommentArea";
import { useAppSelector } from "@/redux/store";
import Loader from "@/components/Loader/Loader";
import EmptyState from "@/components/EmptyState";

interface CommentModalProps {
  idClass: number;
  idCard: number;
  typeCard: string;
  currentuser: any;
}

export const CommentModal: React.FC<CommentModalProps> = ({
  idClass,
  idCard,
  typeCard,
  currentuser,
}) => {
  const createCommentModal = useCommentModal();
  const [loading, setLoading] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);
  const [detail, setDetail] = useState<ReviewDetail["detail"]>();
  const [comments, setComments] = useState<ReviewDetail["comments"]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AXIOS.GET({
          uri: `/announcement/get-announcement/${idClass}/detail/${idCard}`,
          token: localStorage.getItem("access-token") ?? "",
        });

        if (res.statusCode && res.statusCode === 200) {
          setDetail(res.metadata.detail);
          setComments(res.metadata.comments);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idClass, idCard]);

  if (loading) return <Loader text="Loading..." className="w-full h-full" />;

  if (!detail) return <EmptyState title="Error" subTitle="Can't find topic" />;

  const sendComment = async (value: string) => {
    const fetchData = async (value: string) => {
      try {
        setLoadingComment(true);

        const res = await AXIOS.POST({
          uri: `/announcement/create-comment/${idClass}/${idCard}`,
          token: localStorage.getItem("access-token") ?? "",
          params: {
            description: value,
          },
        });

        if (res.statusCode && res.statusCode === 201) {
          const fetchNewComments = await AXIOS.GET({
            uri: `/announcement/get-comments/${idClass}/${idCard}`,
            token: localStorage.getItem("access-token") ?? "",
          });

          if (
            fetchNewComments.statusCode &&
            fetchNewComments.statusCode === 200
          ) {
            setComments(fetchNewComments.metadata);
          }
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setLoadingComment(false);
      }
    };

    fetchData(value);
  };

  return (
    <Modal
      title="Class Comment"
      description=""
      isOpen={createCommentModal.isOpen}
      onClose={createCommentModal.onClose}
    >
      <div className="max-h-[25rem] overflow-x-auto p-1">
        <CommentArea
          onSubmitComment={sendComment}
          loading={loadingComment}
          data={comments}
          userAvatar={currentuser?.avatar}
        />
      </div>
    </Modal>
  );
};

export default CommentModal;

interface ReviewDetail {
  detail: {
    id: number;
    title: string;
    description: string;
    expected_grade: number;
    grade_category: number;
    grade_category_fk: {
      name: string;
    };
    classroom_id: number;
    classroom_id_fk: {
      name: string;
    };
    created_by: number;
    created_by_fk: {
      first_name: string;
      last_name: string;
      avatar: string;
    };
    account_student_id: string;
    student_id: string;
    student_id_fk: {
      email: string;
    };
    type: string;
    createdAt: string;
    current_grade: number;
  };
  comments: Comment[];
}

interface Comment {
  id: number;
  description: string;
  user_id: number;
  user_id_fk: {
    first_name: string;
    last_name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}
