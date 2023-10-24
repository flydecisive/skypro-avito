import styles from "./input.module.css";

interface InputProps {
  type: string;
  placeholder: string;
}

function Input({ type, placeholder }: InputProps) {
  return (
    <input className={styles.input} type={type} placeholder={placeholder} />
  );
}

export default Input;
