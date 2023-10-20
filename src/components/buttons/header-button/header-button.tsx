import styles from "./header-button.module.css";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  name: string;
}

function HeaderButton({ name }: ButtonProps) {
  const navigate = useNavigate();

  const handleOnClick = (name: string) => {
    switch (name) {
      case "Вход в личный кабинет": {
        return navigate("/login");
      }
      default: {
        return () => {};
      }
    }
  };

  return (
    <button
      className={styles.button}
      onClick={() => {
        handleOnClick(name);
      }}
    >
      {name}
    </button>
  );
}

export default HeaderButton;
