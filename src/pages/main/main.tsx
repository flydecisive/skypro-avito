import styles from "./main.module.css";
import Header from "../../components/header/header";
import PageNav from "../../components/page-nav/page-nav";
import ProductCard from "../../components/product-card/product-card";
import Title from "../../components/title/title";
import { useSelector } from "react-redux";

function MainPage() {
  const allAds = useSelector((store: any) => store?.ads.allAds);
  const allImgs = useSelector((store: any) => store?.ads.allImgs);
  let cardsItems: any[] = [];

  for (let i = 0; i < Object.keys(allAds).length; i++) {
    cardsItems.push(
      <ProductCard
        key={allAds[i].id}
        header={allAds[i].title}
        price={allAds[i].price}
        city={allAds[i].user.city}
        time={allAds[i].created_on}
      />
    );
  }

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
