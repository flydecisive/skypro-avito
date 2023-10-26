import styles from "./profile.module.css";
import Header from "../../components/header/header";
import PageNav from "../../components/page-nav/page-nav";
import Title from "../../components/title/title";
import ProductCard from "../../components/product-card/product-card";
import SettingInput from "../../components/inputs/setting-input/setting-input";
import Button from "../../components/buttons/button/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AdModal from "../../components/modals/ad-modal/ad-modal";

function ProfilePage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [targetButton, setTargetButton] = useState<string>("");
  const navigate = useNavigate();
  // const cardsItems = cardData.map((el, index) => {
  //   return (
  //     <ProductCard
  //       key={index}
  //       header={el.header}
  //       price={el.price}
  //       city={el.city}
  //       time={el.time}
  //     />
  //   );
  // });

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
        className={`${styles.profile} ${
          showModal ? styles.profile_filter : ""
        }`}
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
            <Title title="Здравствуйте, Антон!" />
            <div className={styles.settings}>
              <h2 className={styles.header}>Настройки профиля</h2>
              <div className={styles.settings_wrapper}>
                <div className={styles.left}>
                  <div className={styles.avatar}></div>
                  <p className={styles.left_text}>Заменить</p>
                </div>
                <div className={styles.right}>
                  <div className={styles.inputs}>
                    <div className={styles.right_container}>
                      <SettingInput width="300px" placeholder="Имя" />
                      <SettingInput width="300px" placeholder="Фамилия" />
                    </div>
                    <SettingInput width="300px" placeholder="Город" />
                    <SettingInput width="614px" placeholder="Телефон" />
                  </div>
                  <Button
                    name="Сохранить"
                    buttonColor="blue"
                    width="154px"
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
            <h2 className={styles.header}>Мои товары</h2>
            <div className={styles.cards}>{[]}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
