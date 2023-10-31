/* eslint-disable react-hooks/exhaustive-deps */
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
import { getAdsFeedback } from "../../api";
import { sellsFromData } from "../../helpers";

function AdvPage() {
  const { isAllowed } = useAllowedContext();
  const { id } = useParams();
  const allAds = useSelector((store: any) => store?.ads.allAds);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [targetButton, setTargetButton] = useState<string>("");
  const navigate = useNavigate();
  const [currentAds, setCurrentAds] = useState<any>();
  const [adsImages, setAdsImages] = useState<any>();
  const [mainImageSrc, setMainImageSrc] = useState<any>();
  const [feedback, setFeedback] = useState<any>();

  const adsFeedback = async () => {
    const feedback = await getAdsFeedback(String(id));

    setFeedback(feedback);
  };

  useEffect(() => {
    adsFeedback();
  }, [currentAds]);

  useEffect(() => {
    const images = [];
    for (let i = 0; i < 5; i++) {
      if (
        currentAds?.images[i] === null ||
        currentAds?.images[i] === undefined
      ) {
        images.push(<div className={styles.switcher_item} key={i}></div>);
      } else {
        images.push(
          <img
            className={`${styles.switcher_item} ${
              i === 0 ? styles.active_item : ""
            }`}
            src={`http://127.0.0.1:8090/${currentAds?.images[i].url}`}
            alt=""
            key={i}
            onClick={(e: any) => {
              console.log(e.target.src);
            }}
          ></img>
        );
      }
    }

    if (images[0].type === "img") {
      setMainImageSrc(images[0].props.src);
    }

    setAdsImages(images);
  }, [currentAds]);

  useEffect(() => {
    for (let i = 0; i < Object.keys(allAds).length; i++) {
      if (allAds[i].id === Number(id)) {
        setCurrentAds(allAds[i]);
      }
    }
  }, [allAds, id]);

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
          feedback={feedback}
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
              {mainImageSrc ? (
                <img className={styles.image} src={mainImageSrc} alt=""></img>
              ) : (
                <div className={styles.image}>Изображение отсуствует</div>
              )}

              <div className={styles.image_switcher}>{adsImages}</div>
            </div>
            <div className={styles.data}>
              <h2 className={styles.title}>{currentAds?.title}</h2>
              <Metadata
                city={currentAds?.user.city}
                time={currentAds?.created_on}
                type="user"
              />
              <p
                className={styles.feedback}
                onClick={() => {
                  setShowFeedbackModal(true);
                }}
              >
                {feedback?.length} отзыва(ов)
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
              <div
                className={styles.user}
                onClick={() => {
                  navigate(`/seller/${currentAds?.user.id}`);
                }}
              >
                {currentAds?.user.avatar === null ? (
                  <div className={styles.user_avatar}></div>
                ) : (
                  <img
                    className={styles.user_avatar}
                    src={
                      currentAds?.user.avatar
                        ? `http://127.0.0.1:8090/${currentAds?.user.avatar}`
                        : ""
                    }
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
