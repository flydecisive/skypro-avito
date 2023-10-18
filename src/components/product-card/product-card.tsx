import styles from "./product-card.module.css";

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
        <div className={styles.data_items}>
          <p className={styles.data_item}>{city}</p>
          <p className={styles.data_item}>{time}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
