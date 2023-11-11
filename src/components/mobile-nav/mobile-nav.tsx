import styles from "./mobile-nav.module.css";
import { ReactComponent as User } from "../../assets/img/mobile-user.svg";
import { ReactComponent as Home } from "../../assets/img/mobile-home.svg";
import { ReactComponent as AddAds } from "../../assets/img/add_ads.svg";

interface MobileNavProps {}

function MobileNav() {
  return (
    <div className={styles.nav}>
      <Home />
      <AddAds />
      <User />
    </div>
  );
}

export default MobileNav;
