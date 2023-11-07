import styles from "./authorization.module.css";
import { useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/logo2.svg";
import Input from "../../components/inputs/input/input";
import Button from "../../components/buttons/button/button";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { registerUser, loginUser } from "../../api";
import { ChangeEvent, useState } from "react";
import PushNotice from "../../components/push-notice/push-notice";
import { validateEmail } from "../../helpers";
import { useAllowedContext } from "../../contexts/allowed";

function AuthorizationPage() {
  const { isAllowed, setIsAllowed } = useAllowedContext();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [noticeText, setNoticeText] = useState("");
  const [showNotice, setShowNotice] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(false);

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

  const handleRegisterButton = async (
    email: string,
    password: string,
    confirmPassword: string,
    firstname: string,
    surname: string,
    city: string
  ) => {
    try {
      setIsDisabledButton(true);
      if (
        email.length !== 0 &&
        password.length !== 0 &&
        confirmPassword.length !== 0
      ) {
        if (validateEmail(email)) {
          if (password === confirmPassword) {
            const responseData = await registerUser(
              email,
              password,
              firstname,
              surname,
              city
            );

            if (!responseData.details) {
              const responseData = await loginUser(email, password);

              if (responseData) {
                localStorage.setItem(
                  "tokenData",
                  JSON.stringify({
                    access_token: responseData.access_token,
                    refresh_token: responseData.refresh_token,
                  })
                );
                localStorage.setItem("email", email);
                setIsAllowed?.(!isAllowed);
                navigate("/");
              }
            } else {
              if (responseData.message === "Database Error") {
                setNoticeText("Такой пользователь уже существует");
                setShowNotice(true);
              }
            }
          } else {
            setNoticeText("Введенные пароли не совпадают");
            setShowNotice(true);
          }
        } else {
          setNoticeText("Введите валидный email");
          setShowNotice(true);
        }
      } else {
        setNoticeText("Введите email / пароль");
        setShowNotice(true);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsDisabledButton(false);
    }
  };

  const handleLoginButton = async (email: string, password: string) => {
    try {
      setIsDisabledButton(true);
      if (email.length !== 0 && password.length !== 0) {
        if (validateEmail(email)) {
          const responseData = await loginUser(email, password);

          if (responseData) {
            localStorage.setItem(
              "tokenData",
              JSON.stringify({
                access_token: responseData.access_token,
                refresh_token: responseData.refresh_token,
              })
            );
            localStorage.setItem("email", email);
            setIsAllowed?.(!isAllowed);
            navigate("/");
          }
        } else {
          setNoticeText("Введите валидный email");
          setShowNotice(true);
        }
      } else {
        setNoticeText("Введите email / пароль");
        setShowNotice(true);
      }
    } catch (error: any) {
      if ((error.message = "Ошибка авторизации")) {
        setNoticeText("Не верный логин или пароль");
        setShowNotice(true);
      }
    } finally {
      setIsDisabledButton(false);
    }
  };

  return path === "/login" ? (
    <div className={styles.wrapper}>
      {showNotice ? (
        <PushNotice
          text={noticeText}
          onClick={() => {
            setShowNotice(false);
          }}
        />
      ) : (
        ""
      )}
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
              handleLoginButton(email, password);
            }}
            isDisabledButton={isDisabledButton}
          />
          <Button
            name="Зарегистрироваться"
            buttonColor="white"
            width="278px"
            onClick={() => {
              navigate("/register");
            }}
            isDisabledButton={isDisabledButton}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.wrapper}>
      {showNotice ? (
        <PushNotice
          text={noticeText}
          onClick={() => {
            setShowNotice(false);
          }}
        />
      ) : (
        ""
      )}
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
            isDisabledButton={isDisabledButton}
          />
        </div>
      </div>
    </div>
  );
}

export default AuthorizationPage;
