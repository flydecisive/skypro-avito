import styles from "./mobile-nav.module.css";
import { ReactComponent as User } from "../../assets/img/mobile-user.svg";
import { ReactComponent as Home } from "../../assets/img/mobile-home.svg";
import { ReactComponent as AddAds } from "../../assets/img/add_ads.svg";
import { useNavigate } from "react-router";
import { useAllowedContext } from "../../contexts/allowed";

interface MobileNavProps {
  showAddAdv: (args: any) => void;
}

function MobileNav({ showAddAdv }: MobileNavProps) {
  const navigate = useNavigate();
  const { isAllowed } = useAllowedContext();

  return (
    <div className={styles.nav}>
      <Home
        onClick={() => {
          navigate("/");
        }}
      />
      <AddAds
        onClick={(e) => {
          if (isAllowed) {
            showAddAdv(e);
          } else {
            navigate("/login");
          }
        }}
      />
      <User
        onClick={() => {
          if (isAllowed) {
            navigate("/profile");
          } else {
            navigate("/login");
          }
        }}
      />
    </div>
  );
}

export default MobileNav;
