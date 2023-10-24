import styles from "./number-button.module.css";

interface ButtonProps {
  onClick: () => void;
}

function NumberButton({ onClick }: ButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={() => {
        onClick();
      }}
    >
      <p className={styles.button_name}>Показать номер</p>
      <p className={styles.number_mask}>8 905 XXX XX XX</p>
    </button>
  );
}

export default NumberButton;
