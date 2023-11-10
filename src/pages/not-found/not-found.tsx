import styles from "./not-found.module.css";

function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.info}>404. Страница не найдена</h2>
    </div>
  );
}

export default NotFound;
