import styles from "./product-card.module.css";
import Metadata from "../metadata/metadata";
import { useSelector } from "react-redux";

interface ProductCardProps {
  header: string;
  price: string;
  city: string;
  time: string;
  images: any;
  onClick: () => void;
}

function ProductCard({
  header,
  price,
  city,
  time,
  images,
  onClick,
}: ProductCardProps) {
  const allAds = useSelector((store: any) => store?.ads.allAds);

  return (
    <div className={styles.card}>
      {images[0]?.url ? (
        <img
          src={`http://127.0.0.1:8090/${images[0]?.url}`}
          alt=""
          className={styles.card_img}
          onClick={onClick}
        />
      ) : (
        <div className={styles.card_img} onClick={onClick}>
          Изображение отсутствует
        </div>
      )}

      <div className={styles.wrapper}>
        <h2 className={styles.header} onClick={onClick}>
          {header}
        </h2>
        <p className={styles.price}>{price} ₽</p>
        <Metadata city={city} time={time} type="card" />
      </div>
    </div>
  );
}

export default ProductCard;
