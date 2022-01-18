import React from "react";
import Modal from "../Modal";
import styles from "./ErrorModal.module.css";

const ErrorModal = ({ onErrorModalClose, error }) => {
  return (
    <Modal
      headerText="Error!"
      headerClass={styles.errorHeader}
      onClose={onErrorModalClose}
    >
      <div className={styles.modal_body}>
        <p className={styles.errorCont}>{error}</p>
      </div>
    </Modal>
  );
};
export default ErrorModal;
