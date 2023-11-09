/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./ad-modal.module.css";
import ModalInput from "../../inputs/modal-input/modal-input";
import { ReactComponent as Cross } from "../../../assets/img/cross.svg";
import { ReactComponent as AddPhoto } from "../../../assets/img/add-photo.svg";
import PushNotice from "../../push-notice/push-notice";
import Button from "../../buttons/button/button";
import {
  useAddAdsMutation,
  useUpdateUserAdsMutation,
} from "../../../services/ads";
import { useState, ChangeEvent, useEffect } from "react";

interface AdModalProps {
  setShowModal: (params: boolean) => void;
  targetButton: string;
  currentAds?: any;
}

function AdModal({ setShowModal, targetButton, currentAds }: AdModalProps) {
  const [triggerAddAds, { data, isLoading }] = useAddAdsMutation();
  const [triggerUpdateAds, { data: updateAdsData }] =
    useUpdateUserAdsMutation();
  const [title, setTitle] = useState<string>(
    targetButton === "Редактировать" ? currentAds?.title : ""
  );
  const [description, setDescription] = useState<string>(
    targetButton === "Редактировать" ? currentAds?.description : ""
  );
  const [price, setPrice] = useState<string>(
    targetButton === "Редактировать" ? currentAds?.price : ""
  );
  const [showPushNotice, setShowPushNotice] = useState<boolean>(false);
  const [noticeText, setNoticeText] = useState<string>("");
  const [images, setImages] = useState<any>(Array(5).fill({}));
  const [imageSrc, setImageSrc] = useState<any>([]);

  useEffect(() => {
    if (imageSrc.length !== 0) {
      console.log(imageSrc);
      const newImages = [];
      for (let i = 0; i < 5; i++) {
        if (imageSrc[i]) {
          newImages.push(imageSrc[i]);
        } else {
          newImages.push({});
        }
      }
      setImages(newImages);
    }
  }, [imageSrc]);

  useEffect(() => {
    if (data || updateAdsData) {
      setShowModal(false);
    }
  }, [data, updateAdsData]);

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleAddImg = () => {
    if (targetButton !== "Редактировать") {
      setShowPushNotice(true);
      setNoticeText("Изображение можно добавить на странице редактирования");
    }
  };

  const handleSubmitButton = (
    targetButton: string,
    title: string,
    description: string,
    price: string,
    id: string
  ) => {
    if (targetButton !== "Редактировать") {
      triggerAddAds({ title, description, price: Number(price) });
    } else {
      triggerUpdateAds({
        title,
        description,
        price: Number(price),
        id,
      });
    }
  };

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files?.[0];
    if (file) {
      const files: any = event.target.files;

      const newImageSrc: any = [];
      for (let i = 0; i < files.length; i++) {
        if (files[i].type && !files[i].type.startsWith("image/")) {
          console.log("File is not an image.", files[i].type, files[i]);
          return;
        }

        const reader = new FileReader();
        reader.addEventListener("load", () => {
          newImageSrc.push({ src: reader.result });
          setImageSrc([...newImageSrc, ...imageSrc]);
        });
        reader.readAsDataURL(files[i]);
      }
    }
  };

  return (
    <div className={styles.modal}>
      {showPushNotice ? (
        <PushNotice
          text={noticeText}
          onClick={() => {
            setShowPushNotice(false);
          }}
        />
      ) : (
        ""
      )}
      <div className={styles.top}>
        <h2 className={styles.header}>
          {targetButton === "Редактировать"
            ? "Редактировать объявление"
            : "Новое объявление"}
        </h2>
        <Cross className={styles.cross} onClick={() => setShowModal(false)} />
      </div>
      <ModalInput
        width="500px"
        placeholder="Введите название"
        defaultValue={title}
        type="text"
        onInput={handleTitle}
      />
      <label className={styles.label}>
        Описание
        <textarea
          className={styles.textarea}
          defaultValue={description}
          placeholder="Введите описание"
          onInput={(e: any) => {
            handleDescription(e);
          }}
        ></textarea>
      </label>
      <div className={styles.photos}>
        <h3 className={styles.photos_title}>
          Фотографии товара{" "}
          <span className={styles["text-grey"]}>не более 5 фотографий</span>
        </h3>
        <div className={styles.photos_wrapper}>
          {images.map((elem: any, index: number) => {
            if (elem.src) {
              return (
                <img
                  className={styles.photo}
                  src={elem.src}
                  alt=""
                  key={index}
                />
              );
            }

            return (
              <label className={styles.add_photo} key={index}>
                {targetButton !== "Редактировать" ? (
                  <AddPhoto onClick={handleAddImg} />
                ) : (
                  <>
                    <AddPhoto />
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        handleUploadImage(e);
                      }}
                    />
                  </>
                )}
              </label>
            );
          })}
          {/* <label className={styles.add_photo}>
            <AddPhoto />
            <input
              type="file"
              hidden
              onChange={(e) => {
                handleUploadImage(e);
              }}
            />
          </label>
          <label className={styles.add_photo}>
            <AddPhoto />
            <input
              type="file"
              hidden
              onChange={(e) => {
                handleUploadImage(e);
              }}
            />
          </label>
          <label className={styles.add_photo}>
            <AddPhoto />
            <input
              type="file"
              hidden
              onChange={(e) => {
                handleUploadImage(e);
              }}
            />
          </label>
          <label className={styles.add_photo}>
            <AddPhoto />
            <input
              type="file"
              hidden
              onChange={(e) => {
                handleUploadImage(e);
              }}
            />
          </label>
          <label className={styles.add_photo}>
            <AddPhoto />
            <input
              type="file"
              hidden
              onChange={(e) => {
                handleUploadImage(e);
              }}
            />
          </label> */}
        </div>
        <label className={styles.label}>
          Цена{" "}
          <input
            type="number"
            className={styles.price}
            defaultValue={price}
            onInput={(e: any) => {
              handlePrice(e);
            }}
          />
        </label>
        <Button
          name={isLoading ? "Загрузка" : "Опубликовать"}
          buttonColor="blue"
          width="180px"
          onClick={() => {
            handleSubmitButton(
              targetButton,
              title,
              description,
              price,
              currentAds?.id
            );
          }}
          isDisabledButton={isLoading}
        />
      </div>
    </div>
  );
}

export default AdModal;
