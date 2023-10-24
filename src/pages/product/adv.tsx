import styles from "./adv.module.css";
import Header from "../../components/header/header";
import PageNav from "../../components/page-nav/page-nav";
import { useNavigate } from "react-router-dom";
import Metadata from "../../components/metadata/metadata";
import Button from "../../components/buttons/button/button";
import NumberButton from "../../components/buttons/number-button/number-button";
import AdModal from "../../components/modals/ad-modal/ad-modal";
import { useState } from "react";

function AdvPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [targetButton, setTargetButton] = useState<string>("");
  const navigate = useNavigate();

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
        className={`${styles.product} ${
          showModal ? styles.product_filter : ""
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
            buttonWidth="240px"
            onClick={() => {
              navigate("/");
            }}
          />
          <div className={styles.content}>
            <div className={styles.images}>
              <div className={styles.image}></div>
              <div className={styles.image_switcher}>
                <div className={styles.switcher_item}></div>
                <div className={styles.switcher_item}></div>
                <div className={styles.switcher_item}></div>
                <div className={styles.switcher_item}></div>
                <div className={styles.switcher_item}></div>
              </div>
            </div>
            <div className={styles.data}>
              <h2 className={styles.title}>
                Ракетка для большого тенниса Triumph Pro STС Б/У
              </h2>
              <Metadata city={"Санкт-Петербург"} time={"Сегодня в 10:45"} />
              <p className={styles.feedback}>4 отзыва</p>
              <p className={styles.price}>2 200 ₽</p>
              <div className={styles.buttons}>
                {true ? (
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
                  <NumberButton onClick={() => {}} />
                )}
              </div>
              <div className={styles.user}>
                <div className={styles.user_avatar}></div>
                <div className={styles.user_info}>
                  <div className={styles.user_name}>Антон</div>
                  <div className={styles.user_date}>
                    Продает товары с мая 2022
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.about_product}>
            <h2 className={styles.heading}>Описание товара</h2>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdvPage;
