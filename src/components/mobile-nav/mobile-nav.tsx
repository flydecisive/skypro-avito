/* eslint-disable no-lone-blocks */
import styles from "./mobile-nav.module.css";
import { ReactComponent as User } from "../../assets/img/mobile-user.svg";
import { ReactComponent as Home } from "../../assets/img/mobile-home.svg";
import { ReactComponent as AddAds } from "../../assets/img/add_ads.svg";
import { useNavigate, useLocation } from "react-router";
import { useAllowedContext } from "../../contexts/allowed";
import { ReactComponent as Exit } from "../../assets/img/exit-mobile.svg";

interface MobileNavProps {
  showAddAdv?: (args: any) => void;
}

function MobileNav({ showAddAdv }: MobileNavProps) {
  const navigate = useNavigate();
  const { isAllowed, setIsAllowed } = useAllowedContext();
  const locationPath = useLocation().pathname;

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
            if (showAddAdv) {
              showAddAdv(e);
            }
          } else {
            navigate("/login");
          }
        }}
      />
      {locationPath !== "/profile" ? (
        <User
          onClick={() => {
            if (isAllowed) {
              navigate("/profile");
            } else {
              navigate("/login");
            }
          }}
        />
      ) : (
        <Exit
          onClick={() => {
            localStorage.clear();
            setIsAllowed?.(false);
          }}
        />
      )}
    </div>
  );
}

export default MobileNav;
