import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ headerText, className, children, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={`${styles.modal_content} ${className ? className : ""}`}>
        <div className={styles.modal_header}>
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
          <h2 className={styles.header_text}>{headerText}</h2>
        </div>
        {children && (
          <div className={styles.modal_body} onClick={() => {}}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
export default Modal;
