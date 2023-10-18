import styles from "./header-button.module.css";

interface ButtonProps {
  name: string;
}

function HeaderButton({ name }: ButtonProps) {
  return <button className={styles.button}>{name}</button>;
}

export default HeaderButton;
