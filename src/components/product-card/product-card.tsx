import styles from "./product-card.module.css";
import Metadata from "../metadata/metadata";
import { ReactComponent as NoImage } from "../../assets/img/image_no_icon_216618.svg";
import { useIsMobileContext } from "../../contexts/isMobile";

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
  const { isMobile } = useIsMobileContext();
  let cardHeader: string;

  if (isMobile) {
    if (header?.length > 40) {
      cardHeader = `${header.slice(0, 31)}...`;
    } else {
      cardHeader = header;
    }
  } else {
    if (header?.length > 50) {
      cardHeader = `${header.slice(0, 40)}...`;
    } else {
      cardHeader = header;
    }
  }
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
          {cardHeader}
        </h2>
        <p className={styles.price}>{price} ₽</p>
        <Metadata city={city} time={time} type="card" />
      </div>
    </div>
  );
}

export default ProductCard;
