import { useState } from "react";
import styles from "./number-button.module.css";

interface ButtonProps {
  onClick: () => void;
  phone: string;
}

function NumberButton({ onClick, phone }: ButtonProps) {
  const [showPhone, seetShowPhone] = useState<boolean>(false);
  const parsePhone = (phone: string): string => {
    if (phone === null) {
      return "Номер отсуствует";
    } else {
      return phone?.slice(0, 4) + " XXX XX XX";
    }
  };

  return (
    <button
      className={styles.button}
      onClick={() => {
        seetShowPhone(!showPhone);
      }}
    >
      <p className={styles.button_name}>Показать номер</p>
      <p className={styles.number_mask}>
        {showPhone && phone !== null ? phone : parsePhone(phone)}
      </p>
    </button>
  );
}

export default NumberButton;
