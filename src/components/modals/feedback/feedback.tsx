import styles from "./feedback.module.css";
import { ReactComponent as Cross } from "../../../assets/img/cross.svg";
import Button from "../../buttons/button/button";
import { useAllowedContext } from "../../../contexts/allowed";
import { parseData, parseMonth } from "../../../helpers";
import { useNavigate } from "react-router-dom";
import { useCreateCommentMutation } from "../../../services/ads";
import { useState, ChangeEvent } from "react";
import { ReactComponent as DeleteIcon } from "../../../assets/img/delete.svg";
import { UseAuthUserContext } from "../../../contexts/authUser";

interface FeedbackProps {
  setShowFeedbackModal: (params: any) => void;
  feedback: any;
  adsId: string | undefined;
}

function Feedback({ setShowFeedbackModal, feedback, adsId }: FeedbackProps) {
  const { authUser } = UseAuthUserContext();
  const { isAllowed } = useAllowedContext();
  const [comment, setComment] = useState<string>();
  const navigate = useNavigate();
  const [createCommentTrigger] = useCreateCommentMutation();

  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (
    adsId: string | undefined,
    comment: string | undefined
  ) => {
    if (comment && adsId) {
      createCommentTrigger({
        id: adsId,
        text: comment,
      });
    }
  };

  const normalizeDate = (time: string) => {
    const date = new Date(time);
    const day = parseData(date.getDate());
    const month = parseMonth(date.getMonth());

    return `${day} ${month}`;
  };

  return (
    <div className={styles.modal}>
      <div className={styles.top}>
        <h2 className={styles.header}>Отзывы о товаре</h2>
        <button className={styles.button}>
          <Cross
            className={styles.cross}
            onClick={() => setShowFeedbackModal(false)}
          />
        </button>
      </div>
      <div className={styles.add_feedback}>
        <label className={styles.label}>
          Добавить отзыв
          <textarea
            className={styles.textarea}
            placeholder="Введите отзыв"
            onInput={handleComment}
          ></textarea>
        </label>
        <Button
          name="Опубликовать"
          buttonColor="blue"
          width="180px"
          onClick={() => {
            handleCommentSubmit(adsId, comment);
          }}
          isDisabledButton={!isAllowed}
        />
      </div>
      <div className={styles.feedbacks}>
        {feedback.length !== 0 ? (
          feedback.toReversed().map((el: any, i: number) => {
            return (
              <div className={styles.feedback} key={i}>
                {el.author.avatar ? (
                  <img
                    className={styles.feedback_avatar}
                    src={`http://127.0.0.1:8090/${el.author.avatar}`}
                    alt=""
                    onClick={() => {
                      navigate(`/seller/${el.author.id}`);
                    }}
                  />
                ) : (
                  <div
                    className={styles.feedback_avatar}
                    onClick={() => {
                      navigate(`/seller/${el.author.id}`);
                    }}
                  ></div>
                )}

                <div className={styles.comment}>
                  <div className={styles.comment_info}>
                    <p className={styles.comment_name}>
                      {el.author.name ? el.author.name : "User"}
                    </p>
                    <p className={styles.comment_date}>
                      {normalizeDate(el.created_on)}
                    </p>
                  </div>
                  <div className={styles.comment_wrapper}>
                    <h4 className={styles.comment_title}>Комментарий</h4>
                    <p className={styles.comment_text}>{el.text}</p>
                  </div>
                </div>
                {el.author.id === authUser?.id ? (
                  <DeleteIcon
                    className={styles.delete_feedback}
                    onClick={() => {
                      alert("Функционал еще не реализован");
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })
        ) : (
          <p>Отзывы отсутствуют</p>
        )}
      </div>
    </div>
  );
}

export default Feedback;
