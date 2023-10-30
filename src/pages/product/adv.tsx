import styles from "./adv.module.css";
import Header from "../../components/header/header";
import PageNav from "../../components/page-nav/page-nav";
import { useNavigate, useParams } from "react-router-dom";
import Metadata from "../../components/metadata/metadata";
import Button from "../../components/buttons/button/button";
import NumberButton from "../../components/buttons/number-button/number-button";
import AdModal from "../../components/modals/ad-modal/ad-modal";
import { useEffect, useState } from "react";
import Feedback from "../../components/modals/feedback/feedback";
import { useSelector } from "react-redux";
import { useAllowedContext } from "../../contexts/allowed";
import { parseMonth } from "../../helpers";

function AdvPage() {
  const { isAllowed } = useAllowedContext();
  const { id } = useParams();
  const allAds = useSelector((store: any) => store?.ads.allAds);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [targetButton, setTargetButton] = useState<string>("");
  const navigate = useNavigate();
  const [currentAds, setCurrentAds] = useState<any>();

  useEffect(() => {
    for (let i = 0; i < Object.keys(allAds).length; i++) {
      if (allAds[i].id === Number(id)) {
        setCurrentAds(allAds[i]);
      }
    }
  }, [allAds, id]);

  const sellsFromData = (date: string): string => {
    const month = date?.slice(date?.lastIndexOf("-") + 1);
    const year = date?.slice(0, date?.indexOf("-"));

    return `${parseMonth(Number(month) - 1)} ${year}`;
  };

  // Добавить в API получение комментариев к объявлению
  // Незарегистрированный пользователь не может добавляеть объявление
  // Если это не объявление пользователя и он не зарегистрирован, то отображаются другие кнопки
  // Счетчик количества объявлений
  console.log(currentAds?.images);

  return (
    <>
      {showModal ? (
        <AdModal
          setShowModal={() => setShowModal(false)}
          targetButton={targetButton}
        />
      ) : (
        ""
      )}
      {showFeedbackModal ? (
        <Feedback
          setShowFeedbackModal={() => {
            setShowFeedbackModal(false);
          }}
        />
      ) : (
        ""
      )}
      <div
        className={`${styles.product} ${
          showModal || showFeedbackModal ? styles.product_filter : ""
        }`}
      >
        <Header
          showAddAdv={(e) => {
            setTargetButton(e.target.textContent);
            setShowModal(true);
          }}
        />
        <div className={`${styles.wrapper} center`}>
          <PageNav
            isSearch={false}
            buttonName="Вернуться на главную"
            buttonWidth="240px"
            onClick={() => {
              navigate("/");
            }}
          />
          <div className={styles.content}>
            <div className={styles.images}>
              {currentAds?.images.length !== 0 ? (
                <img
                  className={styles.image}
                  src={`http://127.0.0.1:8090/${currentAds?.images[0].url}`}
                  alt=""
                ></img>
              ) : (
                <div className={styles.image}>Изображение отсуствует</div>
              )}

              <div className={styles.image_switcher}>
                {currentAds?.images.length !== 0 ? (
                  <>
                    <img
                      className={styles.switcher_item}
                      src={`http://127.0.0.1:8090/${currentAds?.images[0].url}`}
                      alt=""
                    ></img>
                    <img
                      className={styles.switcher_item}
                      src={`http://127.0.0.1:8090/${currentAds?.images[0].url}`}
                      alt=""
                    ></img>
                    <img
                      className={styles.switcher_item}
                      src={`http://127.0.0.1:8090/${currentAds?.images[0].url}`}
                      alt=""
                    ></img>
                    <img
                      className={styles.switcher_item}
                      src={`http://127.0.0.1:8090/${currentAds?.images[0].url}`}
                      alt=""
                    ></img>
                    <img
                      className={styles.switcher_item}
                      src={`http://127.0.0.1:8090/${currentAds?.images[0].url}`}
                      alt=""
                    ></img>
                  </>
                ) : (
                  <>
                    <div className={styles.switcher_item}></div>
                    <div className={styles.switcher_item}></div>
                    <div className={styles.switcher_item}></div>
                    <div className={styles.switcher_item}></div>
                    <div className={styles.switcher_item}></div>
                  </>
                )}
              </div>
            </div>
            <div className={styles.data}>
              <h2 className={styles.title}>{currentAds?.title}</h2>
              <Metadata
                city={currentAds?.user.city}
                time={currentAds?.created_on}
              />
              <p
                className={styles.feedback}
                onClick={() => {
                  setShowFeedbackModal(true);
                }}
              >
                4 отзыва
              </p>
              <p className={styles.price}>{currentAds?.price} ₽</p>
              <div className={styles.buttons}>
                {isAllowed ? (
                  <>
                    <Button
                      name="Редактировать"
                      buttonColor="blue"
                      width="190px"
                      onClick={(e) => {
                        setTargetButton(e.target.textContent);
                        setShowModal(true);
                      }}
                    />
                    <Button
                      name="Снять с публикации"
                      buttonColor="blue"
                      width="225px"
                      onClick={() => {}}
                    />
                  </>
                ) : (
                  <NumberButton
                    phone={currentAds?.user.phone}
                    onClick={() => {}}
                  />
                )}
              </div>
              <div className={styles.user}>
                {currentAds?.user.avatar === null ? (
                  <div className={styles.user_avatar}></div>
                ) : (
                  <img
                    className={styles.user_avatar}
                    src={`http://127.0.0.1:8090/${currentAds?.user.avatar}`}
                    alt=""
                  ></img>
                )}

                <div className={styles.user_info}>
                  <div className={styles.user_name}>
                    {currentAds?.user.name}
                  </div>
                  <div className={styles.user_date}>
                    Продает товары с{" "}
                    {sellsFromData(currentAds?.user.sells_from)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.about_product}>
            <h2 className={styles.heading}>Описание товара</h2>
            <p className={styles.text}>
              {currentAds?.description
                ? currentAds?.description
                : "Описание товара отсутствует"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdvPage;
