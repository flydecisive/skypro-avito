import styles from "./setting-input.module.css";

interface SettingInputProps {
  width: string;
  placeholder: string;
}

function SettingInput({ width, placeholder }: SettingInputProps) {
  return (
    <form className={styles.form}>
      <label className={styles.label}>{placeholder}</label>
      <input
        className={styles.input}
        style={{ width: width }}
        placeholder={placeholder}
      />
    </form>
  );
}

export default SettingInput;
