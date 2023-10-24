import styles from "./title.module.css";

interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  return <h1 className={styles.title}>{title}</h1>;
}

export default Title;
