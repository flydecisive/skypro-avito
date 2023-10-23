import styles from "./metadata.module.css";

interface MetadataProps {
  city: string;
  time: string;
}

function Metadata({ city, time }: MetadataProps) {
  return (
    <div className={styles.data_items}>
      <p className={styles.data_item}>{city}</p>
      <p className={styles.data_item}>{time}</p>
    </div>
  );
}

export default Metadata;
