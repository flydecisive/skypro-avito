import styles from "./push-notice.module.css";

interface PushNoticeProps {
  text: string;
  onClick: () => void;
}

function PushNotice({ text, onClick }: PushNoticeProps) {
  return (
    <div className={styles.alert}>
      <div className={styles.alertText}>{text}</div>
      <button onClick={onClick} className={styles.alertClose}>
        ОК
      </button>
    </div>
  );
}

export default PushNotice;
