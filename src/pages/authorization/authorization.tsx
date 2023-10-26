import styles from "./authorization.module.css";
import { useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/logo2.svg";
import Input from "../../components/inputs/input/input";
import Button from "../../components/buttons/button/button";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { registerUser, loginUser } from "../../api";
import { ChangeEvent, useState } from "react";

function AuthorizationPage() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleFirstnameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };

  const handleSurnameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };

  const handleCityInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleRegisterButton = (
    email: string,
    password: string,
    confirmPassword: string,
    firstname: string,
    surname: string,
    city: string
  ) => {
    if (
      email.length !== 0 &&
      password.length !== 0 &&
      confirmPassword.length !== 0
    ) {
      if (password === confirmPassword) {
        registerUser(email, password, firstname, surname, city);
      } else {
        console.log("Введенные пароли не совпадают");
      }
    } else {
      console.log("Заполните обязательные поля");
    }
  };

  const handleLoginUser = (email: string, password: string) => {
    if (email.length !== 0 && password.length !== 0) {
      loginUser(email, password);
    } else {
      console.log("Заполните обязательные поля");
    }
  };

  return path === "/login" ? (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <div className={styles.inputs}>
          <Input type="text" placeholder="email" onInput={handleEmailInput} />
          <Input
            type="password"
            placeholder="Пароль"
            onInput={handlePasswordInput}
          />
        </div>
        <div className={styles.buttons}>
          <Button
            name="Войти"
            buttonColor="blue"
            width="278px"
            onClick={() => {
              handleLoginUser(email, password);
            }}
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
            <Input type="text" placeholder="email" onInput={handleEmailInput} />
            <Input
              type="password"
              placeholder="Пароль"
              onInput={handlePasswordInput}
            />
            <Input
              type="password"
              placeholder="Повторите пароль"
              onInput={handleConfirmPasswordInput}
            />
            <Input
              type="text"
              placeholder="Имя (необязательно)"
              onInput={handleFirstnameInput}
            />
            <Input
              type="text"
              placeholder="Фамилия (необязательно)"
              onInput={handleSurnameInput}
            />
            <Input
              type="text"
              placeholder="Город (необязательно)"
              onInput={handleCityInput}
            />
          </div>
          <div className={styles.buttons}>
            <Button
              name="Зарегистрироваться"
              buttonColor="blue"
              width="278px"
              onClick={() => {
                handleRegisterButton(
                  email,
                  password,
                  confirmPassword,
                  firstname,
                  surname,
                  city
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorizationPage;
