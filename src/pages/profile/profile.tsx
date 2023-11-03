/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./profile.module.css";
import Header from "../../components/header/header";
import PageNav from "../../components/page-nav/page-nav";
import Title from "../../components/title/title";
import ProductCard from "../../components/product-card/product-card";
import SettingInput from "../../components/inputs/setting-input/setting-input";
import Button from "../../components/buttons/button/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import AdModal from "../../components/modals/ad-modal/ad-modal";
import { UseAuthUserContext } from "../../contexts/authUser";
import {
  useLazyGetAuthUserAdsQuery,
  useAddUserAvatarMutation,
  useUpdateUserMutation,
} from "../../services/ads";

function ProfilePage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [targetButton, setTargetButton] = useState<string>("");
  const navigate = useNavigate();
  const { authUser } = UseAuthUserContext();
  const [name, setName] = useState<string>(authUser?.name);
  const [surname, setSurname] = useState<string>(authUser?.surname);
  const [city, setCity] = useState<string>(authUser?.city);
  const [phone, setPhone] = useState<string>(authUser?.phone);
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true);
  const [fetchAuthUserAds, { data }] = useLazyGetAuthUserAdsQuery();
  const [userAds, setUserAds] = useState<any>();
  const [userAvatarTrigger] = useAddUserAvatarMutation();
  const [triggerUpdateUser] = useUpdateUserMutation();

  const addUserAvatar = async (file: any) => {
    const data = await userAvatarTrigger({ file: file });

    console.log(data);
  };

  useEffect(() => {
    if (data) {
      setUserAds(data);
    }
  }, [data]);

  useEffect(() => {
    if (authUser) {
      setName(authUser?.name);
      setSurname(authUser?.surname);
      setCity(authUser?.city);
      setPhone(authUser?.phone);
      fetchAuthUserAds();
    }
  }, [authUser]);

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files;
    // console.log(file);
    // console.log(event.target.files?.[0]);
    let file = event.target.files?.[0];
    if (file) {
      // console.log(URL.createObjectURL(event.target.files?.[0]));
      // const fileUrl = URL.createObjectURL(event.target.files?.[0]);
      // const file = fileUrl.slice(fileUrl.indexOf(":") + 1);
      addUserAvatar(file);
    }
  };

  const toggleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setIsDisabledButton(false);
  };

  const toggleSurname = (event: ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
    setIsDisabledButton(false);
  };

  const toggleCity = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    setIsDisabledButton(false);
  };

  const togglePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
    setIsDisabledButton(false);
  };

  const handleUpdateUser = (
    name: string,
    surname: string,
    city: string,
    phone: string
  ) => {
    triggerUpdateUser({
      name: name,
      surname: surname,
      city: city,
      phone: phone,
    });
  };

  return (
    <>
      {showModal ? (
        <AdModal
          setShowModal={() => setShowModal(false)}
          targetButton={targetButton}
        />
      ) : (
        ""
      )}
      <div
        className={`${styles.profile} ${
          showModal ? styles.profile_filter : ""
        }`}
      >
        <Header
          showAddAdv={(e) => {
            setTargetButton(e.target.textContent);
            setShowModal(true);
          }}
        />
        <div className={`${styles.wrapper} center`}>
          <PageNav
            isSearch={false}
            buttonName="Вернуться на главную"
            buttonWidth="241px"
            onClick={() => {
              navigate("/");
            }}
          />
          <div className={styles.content}>
            <Title
              title={`Здравствуйте, ${
                authUser?.name ? authUser?.name : "user"
              }!`}
            />
            <div className={styles.settings}>
              <h2 className={styles.header}>Настройки профиля</h2>
              <div className={styles.settings_wrapper}>
                <div className={styles.left}>
                  {authUser?.avatar ? (
                    <img
                      className={styles.avatar}
                      alt=""
                      src={`http://127.0.0.1:8090/${authUser.avatar}`}
                    ></img>
                  ) : (
                    <div className={styles.avatar}></div>
                  )}

                  <form>
                    <label className={styles.upload_file}>
                      Заменить
                      <input
                        type="file"
                        hidden
                        onChange={(e) => {
                          handleUploadImage(e);
                        }}
                      />
                    </label>
                  </form>
                </div>
                <div className={styles.right}>
                  <div className={styles.inputs}>
                    <div className={styles.right_container}>
                      <SettingInput
                        width="300px"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => {
                          toggleName(e);
                        }}
                      />
                      <SettingInput
                        width="300px"
                        placeholder="Фамилия"
                        value={surname}
                        onChange={(e) => {
                          toggleSurname(e);
                        }}
                      />
                    </div>
                    <SettingInput
                      width="300px"
                      placeholder="Город"
                      value={city}
                      onChange={(e) => {
                        toggleCity(e);
                      }}
                    />
                    <SettingInput
                      width="614px"
                      placeholder="Телефон"
                      value={phone}
                      onChange={(e) => {
                        togglePhone(e);
                      }}
                    />
                  </div>
                  <Button
                    name="Сохранить"
                    buttonColor="blue"
                    width="154px"
                    isDisabledButton={isDisabledButton}
                    onClick={() => {
                      handleUpdateUser(name, surname, city, phone);
                    }}
                  />
                </div>
              </div>
            </div>
            <h2 className={styles.header}>Мои товары</h2>
            <div className={styles.cards}>
              {userAds?.length !== 0
                ? userAds?.map((el: any, index: number) => {
                    return (
                      <ProductCard
                        key={index}
                        header={el.title}
                        price={el.price}
                        city={el.user.city}
                        time={el.created_on}
                        images={el.images}
                        onClick={() => navigate(`/adv/${el.id}`)}
                      />
                    );
                  })
                : "Объявления отсутствуют"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
