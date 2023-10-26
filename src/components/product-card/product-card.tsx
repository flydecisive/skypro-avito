import styles from "./product-card.module.css";
import Metadata from "../metadata/metadata";

interface ProductCardProps {
  header: string;
  price: string;
  city: string;
  time: string;
  // img_src: string;
}

function ProductCard({ header, price, city, time }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <img src={""} alt="" className={styles.card_img} />
      <div className={styles.wrapper}>
        <h2 className={styles.header}>{header}</h2>
        <p className={styles.price}>{price} ₽</p>
        <Metadata city={city} time={time} />
      </div>
    </div>
  );
}

export default ProductCard;
