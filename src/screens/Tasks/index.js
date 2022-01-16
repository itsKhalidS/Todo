import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import MetaComponent from "../../components/Meta";
import fire from "../../config/fire";
import Header from "../../components/Header";
import styles from "./tasks.module.css";
import BoxHeader from "../../components/BoxHeader";

const Tasks = ({ user }) => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signOut = () => {
    fire.auth().signOut();
    navigate("/login");
  };
  return (
    <>
      <MetaComponent
        title="My Tasks: Daily Planner"
        description="Add and manage your todos and reach your goals"
        keywords="Tasks, Todos, Complete, Remaining, Previous"
      />
      <div className={styles.tasks_page}>
        <Header />
        <div className={styles.page}>
          <div className={styles.current_tasks}>
            <BoxHeader heading="Tasks" />
            <div className={styles.tasks_cont}></div>
            <div className={styles.add_task_cont}>
              <button className={styles.add_task_btn}>
                &#10070; Add a Task
              </button>
            </div>
          </div>
          <div className={styles.other_tasks_cont}>
            <div className={styles.complete}>
              <BoxHeader heading="Completed" />
              <div className={styles.tasks_container}></div>
            </div>
            <div className={styles.previous}>
              <BoxHeader heading="Previous Tasks" />
              <div className={styles.tasks_container}></div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div>
            This web app is designed and implemented by{" "}
            <a
              className={styles.linkedin}
              href="https://www.linkedin.com/in/md-khalid-shahzad-7b63611b1"
              target="_blank"
              rel="noreferrer"
            >
              Md&nbsp;Khalid&nbsp;Shahzad.
            </a>
          </div>
          <div className={styles.small}>
            <a
              className={styles.smallLink}
              target="_blank"
              href="https://icons8.com/icon/JzX2t6Cvzq1l/user"
            >
              User
            </a>{" "}
            icon by{" "}
            <a
              className={styles.smallLink}
              target="_blank"
              href="https://icons8.com"
            >
              Icons8
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(Tasks);
