import styles from "./header.module.css";
import HeaderButton from "../buttons/header-button/header-button";

interface HeaderProps {
  names: string[];
}

function Header({ names }: HeaderProps) {
  const buttons = names.map((name, index) => {
    return <HeaderButton key={index} name={name} />;
  });

  return <header className={`${styles.header} center`}>{buttons}</header>;
}

export default Header;
