import styles from "./header-button.module.css";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  name: string;
  onClick: (params: any) => void;
}

function HeaderButton({ name, onClick }: ButtonProps) {
  const navigate = useNavigate();

  const handleOnClick = (name: string) => {
    switch (name) {
      case "Вход в личный кабинет": {
        return navigate("/login");
      }
      case "Личный кабинет": {
        return navigate("/profile");
      }
      default: {
        return () => {};
      }
    }
  };

  return (
    <button
      className={styles.button}
      onClick={(e) => {
        onClick(e);
        handleOnClick(name);
      }}
    >
      {name}
    </button>
  );
}

export default HeaderButton;
