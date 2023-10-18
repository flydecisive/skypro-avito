import styles from "./main.module.css";
import Header from "../../components/header/header";
import PageNav from "../../components/page-nav/page-nav";

function Main() {
  const buttonsNames = ["Вход в личный кабинет"];

  return (
    <div className={`${styles.main}`}>
      <Header names={buttonsNames} />
      <div className={`${styles.wrapper} center`}>
        <PageNav isSearch={true} />
      </div>
    </div>
  );
}

export default Main;
