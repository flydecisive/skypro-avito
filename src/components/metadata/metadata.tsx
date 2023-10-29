import styles from "./metadata.module.css";
import { parseMonth, parseData } from "../../helpers";

interface MetadataProps {
  city: string;
  time: string;
}

function Metadata({ city, time }: MetadataProps) {
  const normalizeDate = (time: string) => {
    const date = new Date(time);
    const day = parseData(date.getDate());
    const month = parseMonth(date.getMonth());
    const hours = parseData(date.getHours());
    const minutes = parseData(date.getMinutes());

    return `${day} ${month} в ${hours}:${minutes}`;
  };

  return (
    <div className={styles.data_items}>
      <p className={styles.data_item}>{city}</p>
      <p className={styles.data_item}>{normalizeDate(time)}</p>
    </div>
  );
}

export default Metadata;
