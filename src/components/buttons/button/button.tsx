import styles from "./button.module.css";

interface ButtonProps {
  name: string;
  buttonColor: string;
}

function Button({ name, buttonColor }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[buttonColor]}`}>
      {name}
    </button>
  );
}

export default Button;
