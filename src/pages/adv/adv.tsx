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
import { sellsFromData } from "../../helpers";
import { UseAuthUserContext } from "../../contexts/authUser";
import {
  useLazyGetAdsFeedbackQuery,
  useDeleteAdsMutation,
} from "../../services/ads";
import { ReactComponent as NoImage } from "../../assets/img/image_no_icon_216618.svg";
import { useIsMobileContext } from "../../contexts/isMobile";
import { ReactComponent as Back } from "../../assets/img/back.svg";
import MobileNav from "../../components/mobile-nav/mobile-nav";
import Slider from "../../components/slider/slider";

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
  const [mainImage, setMainImage] = useState<any>();
  const [feedback, setFeedback] = useState<any>();
  const { authUser } = UseAuthUserContext();
  const [fetchAdsFeedback, { data: getAdsFeedbackData }] =
    useLazyGetAdsFeedbackQuery();
  const [triggerDeleteAds] = useDeleteAdsMutation();
  const [imagesState, setImagesState] = useState<any>({
    0: true,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [prevImageId, setPrevImageId] = useState<number>();
  const { isMobile } = useIsMobileContext();

  useEffect(() => {
    if (getAdsFeedbackData) {
      setFeedback(getAdsFeedbackData);
    }
  }, [getAdsFeedbackData]);

  useEffect(() => {
    fetchAdsFeedback({ ads_id: id });
  }, [currentAds]);

  useEffect(() => {
    for (let i = 0; i < Object.keys(allAds).length; i++) {
      if (allAds[i].id === Number(id)) {
        setCurrentAds(allAds[i]);
      }
    }
  }, [allAds, id]);

  function renderAdvImages(data: any) {
    const elemsData = data?.images.map((el: any, index: number) => {
      return (
        <img
          key={index}
          id={String(index)}
          className={`${styles.switcher_item} ${
            imagesState[index] ? styles.active_item : ""
          }`}
          alt=""
          src={`http://127.0.0.1:8090/${el.url}`}
          onClick={(e: any) => {
            setMainImage(e.target.src);
            const id = Number(e.target.id);
            if (id !== prevImageId) {
              setImagesState({
                ...imagesState,
                [id]: true,
                [Number(prevImageId)]: false,
              });
              setPrevImageId(id);
            }
          }}
        />
      );
    });

    if (!mainImage && currentAds?.images.length !== 0) {
      setMainImage(elemsData?.[0]?.props.src);
      setPrevImageId(0);
    }

    if (mainImage && currentAds?.images.length === 0) {
      setMainImage(undefined);
    }

    setAdsImages(elemsData);
  }

  useEffect(() => {
    renderAdvImages(currentAds);
  }, [imagesState, currentAds]);

  return (
    <>
      {showModal ? (
        <AdModal
          setShowModal={() => setShowModal(false)}
          targetButton={targetButton}
          currentAds={currentAds}
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
          adsId={id}
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
          isSearch={false}
        />
        {isMobile ? <Slider images={adsImages} /> : ""}
        <div className={`${styles.wrapper} center`}>
          {!isMobile ? (
            <PageNav
              isSearch={false}
              buttonName="Вернуться на главную"
              buttonWidth="240px"
              onClick={() => {
                navigate("/");
              }}
            />
          ) : (
            ""
          )}
          <div className={styles.content}>
            {!isMobile ? (
              <div className={styles.images}>
                {mainImage ? (
                  <img className={styles.image} src={mainImage} alt="" />
                ) : (
                  <NoImage className={styles.image} />
                )}

                <div className={styles.image_switcher}>{adsImages}</div>
              </div>
            ) : (
              ""
            )}
            <div className={styles.data}>
              <h2 className={styles.title}>{currentAds?.title}</h2>
              <Metadata
                city={currentAds?.user.city}
                time={currentAds?.created_on}
                type="card"
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
                {isAllowed && currentAds?.user_id === authUser?.id ? (
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
                      onClick={() => {
                        triggerDeleteAds({ id: id });
                        navigate("/");
                      }}
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
                  navigate(
                    currentAds?.user.id === authUser?.id
                      ? `/profile`
                      : `/seller/${currentAds?.user.id}`
                  );
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
                    {currentAds?.user.name ? currentAds?.user.name : "user"}
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
        {isMobile ? (
          <MobileNav
            showAddAdv={(e) => {
              setTargetButton(e.target.textContent);
              setShowModal(true);
            }}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default AdvPage;
