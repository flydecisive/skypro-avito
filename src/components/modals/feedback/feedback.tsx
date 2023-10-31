import styles from "./feedback.module.css";
import { ReactComponent as Cross } from "../../../assets/img/cross.svg";
import Button from "../../buttons/button/button";
import { useAllowedContext } from "../../../contexts/allowed";

interface FeedbackProps {
  setShowFeedbackModal: (params: any) => void;
}

function Feedback({ setShowFeedbackModal }: FeedbackProps) {
  const { isAllowed } = useAllowedContext();

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
          ></textarea>
        </label>
        <Button
          name="Опубликовать"
          buttonColor="blue"
          width="180px"
          onClick={() => {}}
          isDisabledButton={!isAllowed}
        />
      </div>
      <div className={styles.feedbacks}>
        <div className={styles.feedback}>
          <div className={styles.feedback_avatar}></div>
          <div className={styles.comment}>
            <div className={styles.comment_info}>
              <p className={styles.comment_name}>Олег</p>
              <p className={styles.comment_date}>14 августа</p>
            </div>
            <div className={styles.comment_wrapper}>
              <h4 className={styles.comment_title}>Комментарий</h4>
              <p className={styles.comment_text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.feedback}>
          <div className={styles.feedback_avatar}></div>
          <div className={styles.comment}>
            <div className={styles.comment_info}>
              <p className={styles.comment_name}>Олег</p>
              <p className={styles.comment_date}>14 августа</p>
            </div>
            <div className={styles.comment_wrapper}>
              <h4 className={styles.comment_title}>Комментарий</h4>
              <p className={styles.comment_text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.feedback}>
          <div className={styles.feedback_avatar}></div>
          <div className={styles.comment}>
            <div className={styles.comment_info}>
              <p className={styles.comment_name}>Олег</p>
              <p className={styles.comment_date}>14 августа</p>
            </div>
            <div className={styles.comment_wrapper}>
              <h4 className={styles.comment_title}>Комментарий</h4>
              <p className={styles.comment_text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.feedback}>
          <div className={styles.feedback_avatar}></div>
          <div className={styles.comment}>
            <div className={styles.comment_info}>
              <p className={styles.comment_name}>Олег</p>
              <p className={styles.comment_date}>14 августа</p>
            </div>
            <div className={styles.comment_wrapper}>
              <h4 className={styles.comment_title}>Комментарий</h4>
              <p className={styles.comment_text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.feedback}>
          <div className={styles.feedback_avatar}></div>
          <div className={styles.comment}>
            <div className={styles.comment_info}>
              <p className={styles.comment_name}>Олег</p>
              <p className={styles.comment_date}>14 августа</p>
            </div>
            <div className={styles.comment_wrapper}>
              <h4 className={styles.comment_title}>Комментарий</h4>
              <p className={styles.comment_text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.feedback}>
          <div className={styles.feedback_avatar}></div>
          <div className={styles.comment}>
            <div className={styles.comment_info}>
              <p className={styles.comment_name}>Олег</p>
              <p className={styles.comment_date}>14 августа</p>
            </div>
            <div className={styles.comment_wrapper}>
              <h4 className={styles.comment_title}>Комментарий</h4>
              <p className={styles.comment_text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.feedback}>
          <div className={styles.feedback_avatar}></div>
          <div className={styles.comment}>
            <div className={styles.comment_info}>
              <p className={styles.comment_name}>Олег</p>
              <p className={styles.comment_date}>14 августа</p>
            </div>
            <div className={styles.comment_wrapper}>
              <h4 className={styles.comment_title}>Комментарий</h4>
              <p className={styles.comment_text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.feedback}>
          <div className={styles.feedback_avatar}></div>
          <div className={styles.comment}>
            <div className={styles.comment_info}>
              <p className={styles.comment_name}>Олег</p>
              <p className={styles.comment_date}>14 августа</p>
            </div>
            <div className={styles.comment_wrapper}>
              <h4 className={styles.comment_title}>Комментарий</h4>
              <p className={styles.comment_text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
