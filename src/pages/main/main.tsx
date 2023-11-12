/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./main.module.css";
import Header from "../../components/header/header";
import PageNav from "../../components/page-nav/page-nav";
import ProductCard from "../../components/product-card/product-card";
import Title from "../../components/title/title";
import { useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdModal from "../../components/modals/ad-modal/ad-modal";
import { useIsMobileContext } from "../../contexts/isMobile";
import MobileNav from "../../components/mobile-nav/mobile-nav";

function MainPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>();
  const allAds = useSelector((store: any) => store?.ads.allAds);
  const [productCards, setProductCards] = useState<JSX.Element[]>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [targetButton, setTargetButton] = useState<string>("");
  const { isMobile } = useIsMobileContext();

  useEffect(() => {
    if (!searchValue) {
      const cardsItems = allAds.map((el: any) => {
        return (
          <ProductCard
            key={el.id}
            header={el.title}
            price={el.price}
            city={el.user.city}
            time={el.created_on}
            images={el.images}
            onClick={() => navigate(`/adv/${el.id}`)}
          />
        );
      });

      setProductCards(cardsItems);
    }
  }, [allAds, searchValue]);

  const toggleSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  function renderCardsItems() {
    const cardsItems = allAds.map((el: any) => {
      if (el.title.toLowerCase().includes(searchValue?.toLowerCase())) {
        return (
          <ProductCard
            key={el.id}
            header={el.title}
            price={el.price}
            city={el.user.city}
            time={el.created_on}
            images={el.images}
            onClick={() => navigate(`/adv/${el.id}`)}
          />
        );
      }

      return "";
    });

    setProductCards(cardsItems);
  }

  useEffect(() => {
    if (searchValue && isMobile) {
      renderCardsItems();
    }
  }, [searchValue]);

  const handleSearchButton = () => {
    if (searchValue && !isMobile) {
      renderCardsItems();
    }
  };

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
        className={`${styles.main} ${
          showModal && !isMobile ? styles.main_filter : ""
        }`}
      >
        <Header
          showAddAdv={(e) => {
            setTargetButton(e.target.textContent);
            setShowModal(true);
          }}
          isSearch={true}
          toggleSearchValue={toggleSearchValue}
        />
        <div className={`${styles.wrapper} center`}>
          {!isMobile ? (
            <PageNav
              isSearch={true}
              buttonName="Найти"
              buttonWidth="158px"
              onClick={() => {
                handleSearchButton();
              }}
              toggleSearchValue={toggleSearchValue}
            />
          ) : (
            ""
          )}
          <div className={styles.content}>
            <Title title={"Объявления"} />
            {allAds.length === 0 ? (
              <p>Ошибка загрузки объявлений. Попробуйте позже.</p>
            ) : (
              <div className={styles.cards}>{productCards}</div>
            )}
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

export default MainPage;
