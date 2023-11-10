import styles from "./setting-input.module.css";
import { useState } from "react";

interface SettingInputProps {
  width: string;
  placeholder: string;
  value: string;
  onChange: (params: any) => void;
}

function SettingInput({
  width,
  placeholder,
  value,
  onChange,
}: SettingInputProps) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <form className={styles.form}>
      <label className={`${styles.label} ${active ? styles.label_active : ""}`}>
        {placeholder}
      </label>
      <input
        className={styles.input}
        style={{ width: width }}
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
        onFocus={() => {
          setActive(true);
        }}
        onBlur={() => {
          setActive(false);
        }}
      />
    </form>
  );
}

export default SettingInput;
