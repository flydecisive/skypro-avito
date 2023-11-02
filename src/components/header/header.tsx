import styles from "./header.module.css";
import HeaderButton from "../buttons/header-button/header-button";
import { ReactElement } from "react";
import { useAllowedContext } from "../../contexts/allowed";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  showAddAdv?: (params: any) => void;
}

function Header({ showAddAdv }: HeaderProps) {
  const locationPath = useLocation().pathname;
  const { setIsAllowed } = useAllowedContext();

  const { isAllowed } = useAllowedContext();
  let buttons: ReactElement;

  if (!isAllowed) {
    buttons = (
      <HeaderButton name={"Вход в личный кабинет"} onClick={() => {}} />
    );
  } else {
    buttons = (
      <>
        <HeaderButton
          name={"Разместить объявление"}
          onClick={(e) => {
            showAddAdv?.(e);
          }}
        />
        {locationPath !== "/profile" ? (
          <HeaderButton name={"Личный кабинет"} onClick={() => {}} />
        ) : (
          <HeaderButton
            name={"Выйти"}
            onClick={() => {
              localStorage.clear();
              // navigate("/");
              setIsAllowed?.(false);
            }}
          />
        )}
      </>
    );
  }

  return <header className={`${styles.header} center`}>{buttons}</header>;
}

export default Header;
