import React from "react";
import LogoSmall from "../../assets/Logo-Blue-Small.PNG";
import UserPic from "../../assets/User-Pic.png";
import styles from "./header.module.css";

const Header = ({ name = "" }) => {
  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <div className={styles.logo_container}>
          <img src={LogoSmall} alt="Brand Logo" className={styles.logo} />
        </div>
        <div className={styles.nav_buttons_cont}>
          <img src={UserPic} alt="User" className={styles.userPic} />
          <div className={styles.name_cont}>
            <span className={styles.name}>{name}&nbsp;</span>&#9660;
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
