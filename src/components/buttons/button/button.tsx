import styles from "./button.module.css";

interface ButtonProps {
  name: string;
  buttonColor: string;
  width: string;
  onClick: () => void;
}

function Button({ name, buttonColor, width, onClick }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[buttonColor]}`}
      style={{ width: width }}
      onClick={() => {
        onClick();
      }}
    >
      {name}
    </button>
  );
}

export default Button;
