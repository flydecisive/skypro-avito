import styles from "./header.module.css";
import HeaderButton from "../buttons/header-button/header-button";
import { ReactElement } from "react";

interface HeaderProps {
  buttonsCount: number;
  showAddAdv?: (params: any) => void;
}

function Header({ buttonsCount, showAddAdv }: HeaderProps) {
  let buttons: ReactElement;

  if (buttonsCount === 1) {
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
