import styles from "./ad-modal.module.css";
import ModalInput from "../../inputs/modal-input/modal-input";
import { ReactComponent as Cross } from "../../../assets/img/cross.svg";
import { ReactComponent as AddPhoto } from "../../../assets/img/add-photo.svg";
import Button from "../../buttons/button/button";
import { useAddAdsMutation } from "../../../services/ads";
import { useState, ChangeEvent } from "react";

interface AdModalProps {
  setShowModal: (params: boolean) => void;
  targetButton: string;
}

function AdModal({ setShowModal, targetButton }: AdModalProps) {
  const [triggerAddAds, { data }] = useAddAdsMutation();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleSubmitButton = (
    targetButton: string,
    title: string,
    description: string,
    price: string
  ) => {
    if (targetButton !== "Редактировать") {
      triggerAddAds({ title, description, price: Number(price) });
      setShowModal(false);
    }
  };

  return (
    <div className={styles.modal}>
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
        type="text"
        onInput={handleTitle}
      />
      <label className={styles.label}>
        Описание
        <textarea
          className={styles.textarea}
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
          <AddPhoto />
          <AddPhoto />
          <AddPhoto />
          <AddPhoto />
          <AddPhoto />
        </div>
        <label className={styles.label}>
          Цена{" "}
          <input
            type="number"
            className={styles.price}
            onInput={(e: any) => {
              handlePrice(e);
            }}
          />
        </label>
        <Button
          name="Опубликовать"
          buttonColor="blue"
          width="180px"
          onClick={() => {
            handleSubmitButton(targetButton, title, description, price);
          }}
        />
      </div>
    </div>
  );
}

export default AdModal;
