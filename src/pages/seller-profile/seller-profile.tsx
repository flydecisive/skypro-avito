import styles from "./seller-profile.module.css";
import Header from "../../components/header/header";
import PageNav from "../../components/page-nav/page-nav";
import Title from "../../components/title/title";
import { cardData } from "../../data";
import ProductCard from "../../components/product-card/product-card";
import { useNavigate } from "react-router-dom";
import NumberButton from "../../components/buttons/number-button/number-button";
import Metadata from "../../components/metadata/metadata";
import AdModal from "../../components/modals/ad-modal/ad-modal";
import { useState } from "react";

function SellerProfilePage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [targetButton, setTargetButton] = useState<string>("");
  const navigate = useNavigate();
  const cardsItems = cardData.map((el, index) => {
    return (
      <ProductCard
        key={index}
        header={el.header}
        price={el.price}
        city={el.city}
        time={el.time}
      />
    );
  });

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
          buttonsCount={2}
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
                  <div className={styles.avatar}></div>
                </div>
                <div className={styles.right}>
                  <div className={styles.right_container}>
                    <p className={styles.person}>Кирилл Матвеев</p>
                    <Metadata
                      city="Санкт-Петербург"
                      time="Продает товары с августа 2021"
                    />
                  </div>

                  <NumberButton onClick={() => {}} />
                </div>
              </div>
            </div>
            <h2 className={styles.header}>Товары продавца</h2>
            <div className={styles.cards}>{cardsItems}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerProfilePage;
