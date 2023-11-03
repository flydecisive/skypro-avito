import styles from "./product-card.module.css";
import Metadata from "../metadata/metadata";
import { ReactComponent as NoImage } from "../../assets/img/image_no_icon_216618.svg";

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
        <NoImage className={styles.card_img} onClick={onClick} />
      )}

      <div className={styles.wrapper}>
        <h2 className={styles.header} onClick={onClick}>
          {header?.length > 50 ? `${header.slice(0, 40)}...` : header}
        </h2>
        <p className={styles.price}>{price} ₽</p>
        <Metadata city={city} time={time} type="card" />
      </div>
    </div>
  );
}

export default ProductCard;
