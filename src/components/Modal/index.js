import React from "react";
import styles from "./Modal.module.css";

const Modal = ({
  headerText,
  headerClass,
  className,
  children,
  onClose,
  isCloseDisabled = false,
}) => {
  return (
    <div className={styles.modal}>
      <div className={`${styles.modal_content} ${className ? className : ""}`}>
        <div
          className={`${styles.modal_header} ${headerClass ? headerClass : ""}`}
        >
          <button
            className={styles.close}
            onClick={onClose}
            disabled={isCloseDisabled}
          >
            &times;
          </button>
          <h2 className={styles.header_text}>{headerText}</h2>
        </div>
        {children && <div className={styles.modal_body}>{children}</div>}
      </div>
    </div>
  );
};
export default Modal;
