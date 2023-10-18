import styles from "./button.module.css";

interface ButtonProps {
  name: string;
}

function Button({ name }: ButtonProps) {
  return <button className={styles.button}>{name}</button>;
}

export default Button;
