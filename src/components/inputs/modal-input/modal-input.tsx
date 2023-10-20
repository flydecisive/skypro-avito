import styles from "./modal-input.module.css";
import { createLabel } from "../../../helpers";

interface SettingInputProps {
  width: string;
  placeholder: string;
  type: string;
}

function ModalInput({ width, placeholder, type }: SettingInputProps) {
  return (
    <form className={styles.form}>
      <label className={styles.label}>{createLabel(placeholder)}</label>
      <input
        className={styles.input}
        style={{ width: width }}
        placeholder={placeholder}
        type={type}
      />
    </form>
  );
}

export default ModalInput;
