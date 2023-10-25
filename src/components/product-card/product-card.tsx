import styles from "./product-card.module.css";
import Metadata from "../metadata/metadata";

interface ProductCardProps {
  header: string;
  price: string;
  city: string;
  time: string;
}

function ProductCard({ header, price, city, time }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.card_img}></div>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>{header}</h2>
        <p className={styles.price}>{price} ₽</p>
        <Metadata city={city} time={time} />
      </div>
    </div>
  );
}

export default ProductCard;
