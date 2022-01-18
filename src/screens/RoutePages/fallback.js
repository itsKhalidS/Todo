import React from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "./routes.module.css";

const Fallback = () => {
  return (
    <div className={styles.fallback}>
      <div>
        <LoadingSpinner backgroundColor="white" color="#2272f1" big={true} />
      </div>
    </div>
  );
};
export default Fallback;
