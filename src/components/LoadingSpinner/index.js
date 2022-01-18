import React from "react";
import styles from "./spinner.module.css";

const LoadingSpinner = ({
  backgroundColor = "#2272f1",
  color = "white",
  className,
  big = false,
}) => {
  return (
    <div className={`${styles.loader_cont} ${className ? className : ""}`}>
      <div
        className={`${styles.loader} ${big ? styles.bigLoader : ""}`}
        style={{
          borderColor: color,
          borderTopColor: backgroundColor,
          borderBottomColor: backgroundColor,
        }}
      ></div>
    </div>
  );
};
export default LoadingSpinner;
