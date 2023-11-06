import styles from "./modal-input.module.css";
import { createLabel } from "../../../helpers";

interface SettingInputProps {
  width: string;
  placeholder: string;
  type: string;
  onInput?: (e: any) => void;
  defaultValue?: string;
}

function ModalInput({
  width,
  placeholder,
  type,
  onInput,
  defaultValue,
}: SettingInputProps) {
  return (
    <form className={styles.form}>
      <label className={styles.label}>{createLabel(placeholder)}</label>
      <input
        className={styles.input}
        style={{ width: width }}
        placeholder={placeholder}
        defaultValue={defaultValue}
        type={type}
        onInput={onInput}
      ></input>
    </form>
  );
}

export default ModalInput;
