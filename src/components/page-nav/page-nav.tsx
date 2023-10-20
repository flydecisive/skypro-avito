import styles from "./page-nav.module.css";
import Search from "../search/search";
import Button from "../buttons/button/button";
import { ReactComponent as Logo } from "../../assets/img/Logo.svg";

interface PageNavProps {
  isSearch: boolean;
  buttonName: string;
  buttonWidth: string;
  onClick: () => void;
}

function PageNav({ isSearch, buttonName, buttonWidth, onClick }: PageNavProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Logo />
      </div>
      <div className={styles.right}>
        {isSearch ? <Search /> : ""}
        <Button
          name={buttonName}
          buttonColor="blue"
          width={buttonWidth}
          onClick={() => {
            onClick();
          }}
        />
      </div>
    </div>
  );
}

export default PageNav;
