import styles from "./ad-modal.module.css";
import ModalInput from "../../inputs/modal-input/modal-input";
import { ReactComponent as Cross } from "../../../assets/img/cross.svg";

function AdModal() {
  return (
    <div className={styles.modal}>
      <div className={styles.top}>
        <h2 className={styles.header}>Новое объявление</h2>
        <button className={styles.button}>
          <Cross />
        </button>
      </div>
      <ModalInput width="500px" placeholder="Введите название" type="text" />
      <ModalInput
        width="500px"
        placeholder="Введите описание"
        type="textarea"
      />
    </div>
  );
}

export default AdModal;
