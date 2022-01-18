import React, { useCallback, useState } from "react";
import Dustbin from "../../assets/dustbin.png";
import fire from "../../config/fire";
import styles from "./OtherCard.module.css";

const OtherCard = ({ user, cardStatus, cardDetails, changeErrorStatus }) => {
  const { id, task, ...rest } = cardDetails;
  const [isLoading, setLoading] = useState(false);

  const onDelete = useCallback(() => {
    if (!isLoading) {
      let refPath = "";
      if (cardStatus === "Completed")
        refPath = `${user.uid}/Today/Completed/${id}`;
      else refPath = `${user.uid}/Previous/${id}`;
      setLoading(true);
      fire
        .database()
        .ref(refPath)
        .remove()
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          changeErrorStatus("Failed to perform operation", true);
          setLoading(false);
        });
    }
  }, [isLoading, id, cardStatus, user, changeErrorStatus]);

  return (
    <div className={styles.otherCardCont}>
      {cardStatus === "Completed" ? (
        <div className={styles.completedTask} title={task}>
          {task}
        </div>
      ) : (
        <div className={styles.previousTaskCont}>
          <div className={styles.previousTask}>{task}</div>
          <div className={styles.dateCont}>
            <span className={styles.tag}>Date:&nbsp;</span>
            {rest?.date || "##-##-####"}
          </div>
        </div>
      )}

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
export default OtherCard;
