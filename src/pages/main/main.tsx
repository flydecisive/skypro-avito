import styles from "./main.module.css";
import Header from "../../components/header/header";
import { ReactComponent as Logo } from "../../assets/img/Logo.svg";
import Search from "../../components/search/search";
import Button from "../../components/buttons/button/button";

function Main() {
  const buttonsNames = ["Вход в личный кабинет"];

  return (
    <div className={`${styles.main}`}>
      <Header names={buttonsNames} />
      <div className={`${styles.wrapper} center`}>
        <div className={styles.top}>
          <Logo />
          <Search />
          <Button name="Найти" />
        </div>
      </div>
    </div>
  );
}

export default Main;
