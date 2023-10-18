import styles from "./main.module.css";
import Header from "../../components/header/header";
import PageNav from "../../components/page-nav/page-nav";
import ProductCard from "../../components/product-card/product-card";
import { cardData } from "../../data";

function Main() {
  const buttonsNames = ["Вход в личный кабинет"];
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
    <div className={`${styles.main}`}>
      <Header names={buttonsNames} />
      <div className={`${styles.wrapper} center`}>
        <PageNav isSearch={true} />
        <div className={styles.content}>
          <h1 className={styles.title}>Объявления</h1>
          <div className={styles.cards}>{cardsItems}</div>
        </div>
      </div>
    </div>
  );
}

export default Main;
