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
import { getAllUsers } from "../../api";
import { useSelector } from "react-redux";

function SellerProfilePage() {
  const { id } = useParams();
  const allAds = useSelector((store: any) => store?.ads.allAds);
  getAllUsers();
  console.log(id);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [targetButton, setTargetButton] = useState<string>("");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>();
  const [userAds, setUserAds] = useState<any>();

  const getAndSetUsers = async (id: string) => {
    const users = await getAllUsers();

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === Number(id)) {
        setCurrentUser(users[i]);
        break;
      }
    }
  };

  useEffect(() => {
    if (id) {
      getAndSetUsers(id);
    }
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
        />
        <div className={`${styles.wrapper} center`}>
          <PageNav
            isSearch={false}
            buttonName="Вернуться на главную"
            buttonWidth="241px"
            onClick={() => {
              navigate("/");
            }}
          />
          <div className={styles.content}>
            <Title title="Профиль продавца" />
            <div className={styles.info}>
              <div className={styles.info_wrapper}>
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
                    <p
                      className={styles.person}
                    >{`${currentUser?.name} ${currentUser?.surname}`}</p>
                    <Metadata
                      city={currentUser?.city}
                      time={currentUser?.sells_from}
                      type="user"
                    />
                  </div>

                  <NumberButton phone={currentUser?.phone} onClick={() => {}} />
                </div>
              </div>
            </div>
            <h2 className={styles.header}>Товары продавца</h2>
            <div className={styles.cards}>
              {userAds ? userAds : "У продавца нет объявлений"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerProfilePage;
