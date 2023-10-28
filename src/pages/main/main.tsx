import styles from "./main.module.css";
import Header from "../../components/header/header";
import PageNav from "../../components/page-nav/page-nav";
import ProductCard from "../../components/product-card/product-card";
import Title from "../../components/title/title";
import { useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";

function MainPage() {
  const [searchValue, setSearchValue] = useState<string>();
  const allAds = useSelector((store: any) => store?.ads.allAds);
  const allImgs = useSelector((store: any) => store?.ads.allImgs);
  const [productCards, setProductCards] = useState<JSX.Element[]>();

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
          />
        );
      });
      setProductCards(cardsItems);
    } else {
      const cardsItems = allAds.map((el: any) => {
        if (el.title.toLowerCase().includes(searchValue.toLowerCase())) {
          return (
            <ProductCard
              key={el.id}
              header={el.title}
              price={el.price}
              city={el.user.city}
              time={el.created_on}
              images={el.images}
            />
          );
        }

        return "";
      });

      setProductCards(cardsItems);
    }
  }, [allAds, searchValue]);

  const toggleSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={`${styles.main}`}>
      <Header buttonsCount={1} />
      <div className={`${styles.wrapper} center`}>
        <PageNav
          isSearch={true}
          buttonName="Найти"
          buttonWidth="158px"
          onClick={() => {}}
          toggleSearchValue={toggleSearchValue}
        />
        <div className={styles.content}>
          <Title title={"Объявления"} />
          <div className={styles.cards}>{productCards}</div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
