import React, { useCallback, useState } from "react";
import Dustbin from "../../assets/dustbin.png";
import fire from "../../config/fire";
import styles from "./IncompleteCard.module.css";

const IncompleteCard = ({ user, cardDetails, changeErrorStatus }) => {
  const { id, task } = cardDetails;
  const [isLoading, setLoading] = useState(false);
  const onCheckBoxClick = useCallback(
    (event) => {
      if (!isLoading) {
        setLoading(true);
        fire
          .database()
          .ref(`${user.uid}/Today/Tasks/${id}`)
          .remove()
          .then(() => {
            fire.database().ref(`${user.uid}/Today/Completed`).push(task);
            setLoading(false);
          })
          .catch((err) => {
            changeErrorStatus("Failed to perform operation", true);
            setLoading(false);
          });
      }
    },
    [id, task, user, changeErrorStatus]
  );

  const onDelete = useCallback(() => {
    if (!isLoading) {
      setLoading(true);
      fire
        .database()
        .ref(`${user.uid}/Today/Tasks/${id}`)
        .remove()
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          changeErrorStatus("Failed to perform operation", true);
          setLoading(false);
        });
    }
  }, [id, user, changeErrorStatus]);

  return (
    <div className={styles.imcompleteCardCont}>
      <div className={styles.checkTaskCont}>
        <div className={styles.checkboxCont}>
          <input
            type="checkbox"
            className={styles.checkbox}
            title="Mark as Completed"
            onChange={onCheckBoxClick}
            disabled={isLoading}
          />
        </div>

        <div className={styles.task} title={task}>
          {task}
        </div>
      </div>
      <div className={styles.deleteBtn}>
        <img
          src={Dustbin}
          alt="D"
          className={`${styles.dustbin} ${
            isLoading ? styles.disabledDustbin : ""
          }`}
          title="Delete"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};
export default IncompleteCard;
