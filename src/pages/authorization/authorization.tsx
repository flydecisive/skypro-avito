import styles from "./authorization.module.css";
import { useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/logo2.svg";
import Input from "../../components/input/input";
import Button from "../../components/buttons/button/button";

function AuthorizationPage() {
  const location = useLocation();
  const path = location.pathname;
  return path === "/login" ? (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <Logo />
        <Input type="text" placeholder="email" />
        <Input type="text" placeholder="Пароль" />
        <Button name="Войти" buttonColor="blue" />
        <Button name="Зарегистрироваться" buttonColor="white" />
      </div>
    </div>
  ) : (
    <div className={styles.wrapper}></div>
  );
}

export default AuthorizationPage;
