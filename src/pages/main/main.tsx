import styles from "./main.module.css";
import Header from "../../components/header/header";
import PageNav from "../../components/page-nav/page-nav";
import ProductCard from "../../components/product-card/product-card";
import { cardData } from "../../data";
import Title from "../../components/title/title";
import { useSelector } from "react-redux";

function MainPage() {
  const allAds = useSelector((store: any) => store?.ads.allAds);
  console.log(allAds);
  const cardsItems = allAds?.map((el: any, index: number) => {
    return (
      <ProductCard
        key={index}
        header={el.title}
        price={el.price}
        city={el.user.city}
        time={el.created_on}
      />
    );
  });

  return (
    <div className={`${styles.main}`}>
      <Header buttonsCount={1} />
      <div className={`${styles.wrapper} center`}>
        <PageNav
          isSearch={true}
          buttonName="Найти"
          buttonWidth="158px"
          onClick={() => {}}
        />
        <div className={styles.content}>
          <Title title={"Объявления"} />
          <div className={styles.cards}>{cardsItems}</div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
