import React from "react";
import styles from "./BoxHeader.module.css";

const BoxHeader = ({ heading, className }) => {
  return (
    <div className={`${styles.header_div} ${className ? className : ""}`}>
      {heading}
    </div>
  );
};
export default BoxHeader;
