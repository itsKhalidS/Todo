import React from "react";
import Header from "../../components/Header";
import MetaComponent from "../../components/Meta";
import styles from "./routes.module.css";

const NotFound = () => {
  return (
    <>
      <MetaComponent title="404 Not found: Daily Planner" />
      <Header showButtons={false} />
      <div className={styles.not_found}>
        !404 NOT FOUND<p></p>
      </div>
    </>
  );
};
export default NotFound;
