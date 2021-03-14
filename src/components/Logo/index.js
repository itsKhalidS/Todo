import React from "react";
import styles from "./Logo.module.css";

const Logo = ({
  inverse = false,
  containerStyle = {},
  brandStyle = {},
  iconStyle = {},
  logoStyle = {},
  taglineStyle = {},
}) => {
  return (
    <div
      className={`${styles.logo} ${inverse ? styles.inverse : ""}`}
      style={containerStyle}
    >
      <div className={styles.brand_container} style={brandStyle}>
        <span className={styles.icon} style={iconStyle}>
          &#10070;
        </span>
        <span className={styles.daily_planner} style={logoStyle}>
          Daily Planner
        </span>
        <span className={styles.time} style={taglineStyle}>
          Your time starts now
        </span>
      </div>
    </div>
  );
};
export default Logo;
