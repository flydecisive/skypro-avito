import styles from "./input.module.css";

interface InputProps {
  type: string;
  placeholder: string;
  onInput?: (params: any) => void;
}

function Input({ type, placeholder, onInput }: InputProps) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      onInput={onInput}
    />
  );
}

export default Input;
