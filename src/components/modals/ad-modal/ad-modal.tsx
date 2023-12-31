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
  useAddAdsImageMutation,
  useDeleteAdsImageMutation,
} from "../../../services/ads";
import { useState, ChangeEvent, useEffect } from "react";
import { ReactComponent as Delete } from "../../../assets/img/delete.svg";
import { setNewImages } from "../../../helpers";
import { useIsMobileContext } from "../../../contexts/isMobile";
import { ReactComponent as Back } from "../../../assets/img/back.svg";

interface AdModalProps {
  setShowModal: (params: boolean) => void;
  targetButton: string;
  currentAds?: any;
  showModal?: boolean;
}

function AdModal({
  setShowModal,
  targetButton,
  currentAds,
  showModal,
}: AdModalProps) {
  const [triggerAddAds, { data, isLoading }] = useAddAdsMutation();
  const [triggerUpdateAds, { data: updateAdsData }] =
    useUpdateUserAdsMutation();
  const [triggerAdsImage] = useAddAdsImageMutation();
  const [triggerDeleteAdsImage] = useDeleteAdsImageMutation();
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
  const [images, setImages] = useState<any>();
  const id = currentAds?.id;
  const [showDelete, setShowDelete] = useState<any>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const { isMobile } = useIsMobileContext();
  const [active, setActive] = useState({
    textarea: false,
    price: false,
  });

  useEffect(() => {
    if (currentAds?.images && targetButton === "Редактировать") {
      setImages(setNewImages(currentAds?.images));
    } else {
      setImages(Array(5).fill({}));
    }
  }, []);

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

  const handleDelete = (e: any) => {
    const eventId = e.target.parentElement.id;
    const imageUrl = images[eventId].src;
    const shortUrl = imageUrl.slice(imageUrl.indexOf("/ad") + 1);
    const currentImages = [...images];
    currentImages[eventId] = {};
    setImages(currentImages);
    triggerDeleteAdsImage({ id, url: shortUrl });
  };

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files?.[0];
    if (file) {
      let imagesData: any = await triggerAdsImage({ file, id });
      imagesData = imagesData?.data?.images;

      setImages(setNewImages(imagesData));
    }
  };

  let header: string;
  if (targetButton === "Редактировать") {
    header = isMobile ? "Редактировать" : "Редактировать объявление";
  } else {
    header = "Новое объявление";
  }

  return (
    <div
      className={
        showModal ? `${styles.modal}` : `${styles.modal} ${styles.modal_out}`
      }
    >
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
        <h2 className={styles.header}>{header}</h2>
        {isMobile ? (
          <Back className={styles.back} onClick={() => setShowModal(false)} />
        ) : (
          <Cross className={styles.cross} onClick={() => setShowModal(false)} />
        )}
      </div>
      <ModalInput
        width={isMobile ? "100%" : "500px"}
        placeholder="Введите название"
        defaultValue={title}
        type="text"
        onInput={handleTitle}
      />
      <label
        className={`${styles.label} ${
          active.textarea ? styles.label_active : ""
        }`}
      >
        Описание
        <textarea
          className={styles.textarea}
          defaultValue={description}
          placeholder="Введите описание"
          onInput={(e: any) => {
            handleDescription(e);
          }}
          onFocus={() => {
            setActive({ ...active, textarea: true });
          }}
          onBlur={() => {
            setActive({ ...active, textarea: false });
          }}
        ></textarea>
      </label>
      <div className={styles.photos}>
        <h3 className={styles.photos_title}>
          Фотографии товара {isMobile ? <br /> : ""}
          <span className={styles["text-grey"]}>не более 5 фотографий</span>
        </h3>
        <div className={styles.photos_wrapper}>
          {images?.map((elem: any, index: number) => {
            if (elem.src) {
              return (
                <div
                  className={styles.photo}
                  key={index}
                  onMouseEnter={() => {
                    setShowDelete({ ...showDelete, [index]: true });
                  }}
                  onMouseLeave={() => {
                    setShowDelete({ ...showDelete, [index]: false });
                  }}
                >
                  {showDelete[index] ? (
                    <div
                      className={styles.delete}
                      id={String(index)}
                      onClick={(e) => {
                        handleDelete(e);
                      }}
                    >
                      <Delete className={styles.delete} id={String(index)} />
                    </div>
                  ) : (
                    ""
                  )}
                  <img className={styles.photo} src={elem.src} alt="" />
                </div>
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
        </div>
        <label
          className={`${styles.label} ${
            active.price ? styles.label_active : ""
          }`}
        >
          Цена{" "}
          <input
            type="number"
            className={styles.price}
            defaultValue={price}
            onInput={(e: any) => {
              handlePrice(e);
            }}
            onFocus={() => {
              setActive({ ...active, price: true });
            }}
            onBlur={() => {
              setActive({ ...active, price: false });
            }}
          />
        </label>
        <Button
          name={isLoading ? "Загрузка" : "Опубликовать"}
          buttonColor="blue"
          width={isMobile ? "100%" : "180px"}
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
