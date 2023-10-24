import styles from "./button.module.css";

interface ButtonProps {
  name: string;
  buttonColor: string;
  width: string;
  onClick: (params: any) => void;
}

function Button({ name, buttonColor, width, onClick }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[buttonColor]}`}
      style={{ width: width }}
      onClick={(e) => {
        onClick(e);
      }}
    >
      {name}
    </button>
  );
}

export default Button;
