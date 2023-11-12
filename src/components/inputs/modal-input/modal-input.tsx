import styles from "./modal-input.module.css";
import { createLabel } from "../../../helpers";
import { useState } from "react";

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
  const [active, setActive] = useState<boolean>(false);

  return (
    <form className={styles.form}>
      <label className={`${styles.label} ${active ? styles.label_active : ""}`}>
        {createLabel(placeholder)}
      </label>
      <input
        className={styles.input}
        style={{ width: width }}
        placeholder={placeholder}
        defaultValue={defaultValue}
        type={type}
        onInput={onInput}
        onFocus={() => {
          setActive(true);
        }}
        onBlur={() => {
          setActive(false);
        }}
      ></input>
    </form>
  );
}

export default ModalInput;
