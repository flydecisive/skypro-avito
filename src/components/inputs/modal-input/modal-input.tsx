import styles from "./modal-input.module.css";
import { createLabel } from "../../../helpers";

interface SettingInputProps {
  width: string;
  placeholder: string;
  type: string;
  onInput?: (e: any) => void;
}

function ModalInput({ width, placeholder, type, onInput }: SettingInputProps) {
  return (
    <form className={styles.form}>
      <label className={styles.label}>{createLabel(placeholder)}</label>
      <input
        className={styles.input}
        style={{ width: width }}
        placeholder={placeholder}
        type={type}
        onInput={onInput}
      ></input>
    </form>
  );
}

export default ModalInput;
