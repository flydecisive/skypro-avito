import styles from "./header.module.css";
import HeaderButton from "../buttons/header-button/header-button";
import { ReactElement } from "react";
import { useAllowedContext } from "../../contexts/allowed";
import { useLocation } from "react-router-dom";
import { useIsMobileContext } from "../../contexts/isMobile";
import { ReactComponent as MobileLogo } from "../../assets/img/mobile-logo.svg";
import Search from "../search/search";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  showAddAdv?: (params: any) => void;
  toggleSearchValue?: (params: any) => void;
  isSearch?: boolean;
}

function Header({ showAddAdv, toggleSearchValue, isSearch }: HeaderProps) {
  const locationPath = useLocation().pathname;
  const { setIsAllowed } = useAllowedContext();
  const { isMobile } = useIsMobileContext();
  const navigate = useNavigate();

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
              setIsAllowed?.(false);
            }}
          />
        )}
      </>
    );
  }

  if (isMobile) {
    return (
      <header className={`${styles.header} center`}>
        <MobileLogo
          className={styles.logo}
          onClick={() => {
            navigate("/");
          }}
        />
        {isSearch ? <Search onInput={toggleSearchValue} /> : ""}
      </header>
    );
  } else {
    return <header className={`${styles.header} center`}>{buttons}</header>;
  }
}

export default Header;
