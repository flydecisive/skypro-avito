/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./password.module.css";
import ModalInput from "../../inputs/modal-input/modal-input";
import Button from "../../buttons/button/button";
import { ReactComponent as Cross } from "../../../assets/img/cross.svg";
import { useState, ChangeEvent } from "react";
import { changePassword, loginUser } from "../../../api";
import { useIsMobileContext } from "../../../contexts/isMobile";
import { ReactComponent as Back } from "../../../assets/img/back.svg";

interface PasswordModalProps {
  setShowPasswordModal: any;
  setShowNotice: any;
  setNoticeText: any;
  showPasswordModal: boolean;
}

function PasswordModal({
  setShowPasswordModal,
  setShowNotice,
  setNoticeText,
  showPasswordModal,
}: PasswordModalProps) {
  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false);
  const email = localStorage.getItem("email");
  const { isMobile } = useIsMobileContext();

  const changeUserPassword = async () => {
    if (oldPassword && newPassword) {
      try {
        setIsDisabledButton(true);
        const data = await changePassword(oldPassword, newPassword);
        if (data === null) {
          try {
            if (email) {
              const loginData = await loginUser(email, newPassword);
              if (loginData) {
                localStorage.setItem(
                  "tokenData",
                  JSON.stringify({
                    access_token: loginData.access_token,
                    refresh_token: loginData.refresh_token,
                  })
                );
                setShowPasswordModal(false);
                setShowNotice(true);
                setNoticeText("Пароль успешно изменен");
                setIsDisabledButton(false);
              }
            }
          } catch (error: any) {
            if ((error.message = "Ошибка авторизации")) {
              setNoticeText("Не верный логин или пароль");
              setShowNotice(true);
              setIsDisabledButton(false);
            }
          }
        }
      } catch (error: any) {
        setNoticeText("Старый пароль введен не верно");
        setShowNotice(true);
        setIsDisabledButton(false);
      }
    }
  };

  const handleOldPssword = (event: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
  };

  const handleNewPssword = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleChangePasswordButton = () => {
    if (oldPassword && newPassword) {
      changeUserPassword();
    } else {
      setShowNotice(true);
      setNoticeText("Введите старый/новый пароль");
    }
  };

  return (
    <div
      className={
        showPasswordModal
          ? `${styles.modal}`
          : `${styles.modal} ${styles.modal_out}`
      }
    >
      <div className={styles.top}>
        <h2 className={styles.header}>Изменить пароль</h2>
        {!isMobile ? (
          <Cross
            className={styles.cross}
            onClick={() => {
              setShowPasswordModal(false);
            }}
          />
        ) : (
          <Back
            className={styles.back}
            onClick={() => {
              setShowPasswordModal(false);
            }}
          />
        )}
      </div>
      <ModalInput
        width="100%"
        placeholder="Введите старый пароль"
        type="password"
        onInput={handleOldPssword}
      />
      <ModalInput
        width="100%"
        placeholder="Введите новый пароль"
        type="password"
        onInput={handleNewPssword}
      />
      <Button
        name="Сохранить"
        buttonColor="blue"
        width={isMobile ? "100%" : "154px"}
        isDisabledButton={isDisabledButton}
        onClick={() => {
          handleChangePasswordButton();
        }}
      />
    </div>
  );
}

export default PasswordModal;
