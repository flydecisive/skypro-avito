import styles from "./button.module.css";

interface ButtonProps {
  name: string;
  buttonColor: string;
  width: string;
  onClick: (params: any) => void;
  isDisabledButton?: boolean;
}

function Button({
  name,
  buttonColor,
  width,
  onClick,
  isDisabledButton,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[buttonColor]}`}
      style={{ width: width }}
      onClick={onClick}
      disabled={isDisabledButton}
    >
      {name}
    </button>
  );
}

export default Button;
