import styles from "./header.module.css";
import HeaderButton from "../buttons/header-button/header-button";
import { ReactElement } from "react";
import { useAllowedContext } from "../../contexts/allowed";

interface HeaderProps {
  showAddAdv?: (params: any) => void;
}

function Header({ showAddAdv }: HeaderProps) {
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
        <HeaderButton name={"Личный кабинет"} onClick={() => {}} />
      </>
    );
  }

  return <header className={`${styles.header} center`}>{buttons}</header>;
}

export default Header;
