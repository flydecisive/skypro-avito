/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./seller-profile.module.css";
import Header from "../../components/header/header";
import PageNav from "../../components/page-nav/page-nav";
import Title from "../../components/title/title";
import ProductCard from "../../components/product-card/product-card";
import { useNavigate } from "react-router-dom";
import NumberButton from "../../components/buttons/number-button/number-button";
import Metadata from "../../components/metadata/metadata";
import AdModal from "../../components/modals/ad-modal/ad-modal";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLazyGetAllUsersQuery } from "../../services/ads";
import MobileNav from "../../components/mobile-nav/mobile-nav";
import { useIsMobileContext } from "../../contexts/isMobile";
import { ReactComponent as Back } from "../../assets/img/back.svg";

function SellerProfilePage() {
  const { id } = useParams();
  const allAds = useSelector((store: any) => store?.ads.allAds);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [targetButton, setTargetButton] = useState<string>("");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>();
  const [userAds, setUserAds] = useState<any>();
  const [fetchAllUsers, { data }] = useLazyGetAllUsersQuery();
  const { isMobile } = useIsMobileContext();

  useEffect(() => {
    data?.forEach((el: any) => {
      if (el.id === Number(id)) {
        setCurrentUser(el);
      }
    });
  }, [data]);

  useEffect(() => {
    fetchAllUsers();
  }, [id]);

  useEffect(() => {
    if (allAds) {
      const ads = [];
      for (let i = 0; i < allAds.length; i++) {
        if (allAds[i].user_id === Number(id)) {
          ads.push(
            <ProductCard
              key={allAds[i].id}
              header={allAds[i].title}
              price={allAds[i].price}
              city={allAds[i].user.city}
              time={allAds[i].created_on}
              images={allAds[i].images}
              onClick={() => navigate(`/adv/${allAds[i].id}`)}
            />
          );
        }
      }

      setUserAds(ads);
    }
  }, [allAds]);

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
      <div
        className={`${styles.seller} ${showModal ? styles.seller_filter : ""}`}
      >
        <Header
          showAddAdv={(e) => {
            setTargetButton(e.target.textContent);
            setShowModal(true);
          }}
          isSearch={false}
        />
        <div className={`${styles.wrapper} center`}>
          {!isMobile ? (
            <PageNav
              isSearch={false}
              buttonName="Вернуться на главную"
              buttonWidth="241px"
              onClick={() => {
                navigate("/");
              }}
            />
          ) : (
            ""
          )}
          <div className={styles.content}>
            <div className={styles.content_top}>
              <Title title="Профиль продавца" />
              <Back
                className={styles.back}
                onClick={() => {
                  navigate(-1);
                }}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.info_wrapper}>
                {!isMobile ? (
                  <>
                    <div className={styles.left}>
                      {currentUser?.avatar ? (
                        <img
                          className={styles.avatar}
                          src={`http://127.0.0.1:8090/${currentUser?.avatar}`}
                          alt=""
                        />
                      ) : (
                        <div className={styles.avatar}></div>
                      )}
                    </div>
                    <div className={styles.right}>
                      <div className={styles.right_container}>
                        <p className={styles.person}>{`${
                          currentUser?.name ? currentUser?.name : "user"
                        } ${
                          currentUser?.surname ? currentUser?.surname : ""
                        }`}</p>
                        <Metadata
                          city={currentUser?.city}
                          time={currentUser?.sells_from}
                          type="user"
                        />
                      </div>

                      <NumberButton
                        phone={currentUser?.phone}
                        onClick={() => {}}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.right_container}>
                      <p className={styles.person}>{`${
                        currentUser?.name ? currentUser?.name : "user"
                      } ${
                        currentUser?.surname ? currentUser?.surname : ""
                      }`}</p>
                      <Metadata
                        city={currentUser?.city}
                        time={currentUser?.sells_from}
                        type="user"
                      />
                    </div>
                    <div className={styles.left}>
                      {currentUser?.avatar ? (
                        <img
                          className={styles.avatar}
                          src={`http://127.0.0.1:8090/${currentUser?.avatar}`}
                          alt=""
                        />
                      ) : (
                        <div className={styles.avatar}></div>
                      )}
                    </div>
                    <NumberButton
                      phone={currentUser?.phone}
                      onClick={() => {}}
                    />
                  </>
                )}
              </div>
            </div>
            <h2 className={styles.header}>Товары продавца</h2>
            <div className={styles.cards}>
              {userAds && userAds.length !== 0 ? (
                userAds
              ) : (
                <p className={styles.no_ads}>У продавца нет объявлений</p>
              )}
            </div>
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

export default SellerProfilePage;
