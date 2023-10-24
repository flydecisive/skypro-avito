import styles from "./authorization.module.css";
import { useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/logo2.svg";
import Input from "../../components/inputs/input/input";
import Button from "../../components/buttons/button/button";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function AuthorizationPage() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  return path === "/login" ? (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <div className={styles.inputs}>
          <Input type="text" placeholder="email" />
          <Input type="password" placeholder="Пароль" />
        </div>
        <div className={styles.buttons}>
          <Button
            name="Войти"
            buttonColor="blue"
            width="278px"
            onClick={() => {}}
          />
          <Button
            name="Зарегистрироваться"
            buttonColor="white"
            width="278px"
            onClick={() => {
              navigate("/register");
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <NavLink to="/">
            <Logo />
          </NavLink>
          <div className={styles.inputs}>
            <Input type="text" placeholder="email" />
            <Input type="password" placeholder="Пароль" />
            <Input type="password" placeholder="Повторите пароль" />
            <Input type="text" placeholder="Имя (необязательно)" />
            <Input type="text" placeholder="Фамилия (необязательно)" />
            <Input type="text" placeholder="Город (необязательно)" />
          </div>
          <div className={styles.buttons}>
            <Button
              name="Зарегистрироваться"
              buttonColor="blue"
              width="278px"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorizationPage;
