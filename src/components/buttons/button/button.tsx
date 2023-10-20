import styles from "./button.module.css";

interface ButtonProps {
  name: string;
  buttonColor: string;
  width: string;
}

function Button({ name, buttonColor, width }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[buttonColor]}`}
      style={{ width: width }}
    >
      {name}
    </button>
  );
}

export default Button;
