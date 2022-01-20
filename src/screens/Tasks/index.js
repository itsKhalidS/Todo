import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import MetaComponent from "../../components/Meta";
import fire from "../../config/fire";
import Header from "../../components/Header";
import BoxHeader from "../../components/BoxHeader";
import { getDate, getName } from "../../helper/string";
import LoadingSpinner from "../../components/LoadingSpinner";
import AddTask from "../AddTask";
import IncompleteCard from "../../components/IncompleteCard";
import styles from "./Tasks.module.css";
import OtherCard from "../../components/OtherCard";
import ErrorModal from "../../components/ErrorModal";

const Tasks = ({ user }) => {
  const [isLoading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [previous, setPrevious] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [error, setError] = useState("");
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    if (user.displayName) {
      setUserName(getName(user.displayName, 4, 7));
    } else {
      const nameRef = fire.database().ref(`${user.uid}/Details/firstName`);
      nameRef
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserName(getName(snapshot.val(), 4, 7));
          } else {
            setUserName("");
          }
        })
        .catch((error) => {
          setUserName("");
        });
    }
  }, [user]);

  useEffect(() => {
    getData();
    return removeDataListener;
  }, []);

  const removeDataListener = useCallback(() => {
    fire.database().ref(user.uid).off("value");
  }, [user]);

  const changeErrorStatus = useCallback((err, modalVal) => {
    setError(err);
    setErrorModal(modalVal);
  }, []);

  const getData = useCallback(() => {
    setLoading(true);
    const todaysDate = getDate(new Date());
    const userRef = fire.database().ref(user.uid);
    userRef.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        let myTasks = [];
        let completedTasks = [];
        let previousTasks = [];
        if (data?.Today?.date && data?.Today?.date === todaysDate) {
          if (data?.Today?.Tasks) {
            const tasksObj = data?.Today?.Tasks;
            for (const id in tasksObj) {
              myTasks.push({
                id,
                task: tasksObj[id],
              });
            }
          }
          if (data?.Today?.Completed) {
            const completedObj = data?.Today?.Completed;
            for (const id in completedObj) {
              completedTasks.push({
                id,
                task: completedObj[id],
              });
            }
          }
          if (data?.Previous) {
            const previousObj = data?.Previous;
            for (const id in previousObj) {
              previousTasks.push({
                id,
                ...previousObj[id],
              });
            }
          }
          setLoading(false);
          setTasks(myTasks);
          setCompleted(completedTasks);
          setPrevious(previousTasks);
          changeErrorStatus("", false);
        } else {
          let prev = {};
          if (data?.Today?.Tasks) {
            const tasksObj = data?.Today?.Tasks;
            for (const id in tasksObj) {
              prev[id] = {
                date: data?.Today?.date,
                task: tasksObj[id],
              };
            }
          }
          if (data?.Previous) {
            prev = { ...prev, ...data?.Previous };
          }
          const finalData = {
            Details: data?.Details,
            Today: {
              date: todaysDate,
              Tasks: {},
              Completed: {},
            },
            Previous: prev,
          };
          userRef.set(finalData, (error) => {
            if (error) {
              removeDataListener();
              changeErrorStatus("Failed to retrieve data", true);
              setLoading(false);
            } else {
              setLoading(false);
              changeErrorStatus("", false);
            }
          });
        }
      },
      (error) => {
        changeErrorStatus("Failed to retrieve data", true);
        setLoading(false);
      }
    );
  }, [user, changeErrorStatus, removeDataListener]);

  const onAddBtnClick = useCallback(() => {
    setAddModal(true);
  }, []);

  const onAddModalClose = useCallback(() => {
    setAddModal(false);
  }, []);

  const onErrorModalClose = useCallback(() => {
    changeErrorStatus("", false);
  }, [changeErrorStatus]);

  return (
    <>
      <MetaComponent
        title="My Tasks: Daily Planner"
        description="Add and manage your todos and reach your goals"
        keywords="Tasks, Todos, Complete, Remaining, Previous"
      />
      <div className={styles.tasks_page}>
        <Header showButtons={true} name={userName} />
        <div className={styles.page}>
          <div className={styles.current_tasks}>
            <BoxHeader heading="Tasks" />
            <div className={styles.tasks_cont}>
              {isLoading ? (
                <div className={styles.centerDivFirst}>
                  <LoadingSpinner backgroundColor="white" color="#2272f1" />
                </div>
              ) : (
                <div className={styles.incompleteTasksCont}>
                  {tasks.map((task, index) => {
                    return (
                      <IncompleteCard
                        key={task.id + index}
                        user={user}
                        cardDetails={task}
                        changeErrorStatus={changeErrorStatus}
                      />
                    );
                  })}
                  {tasks.length === 0 && (
                    <div className={styles.emptyList}>
                      You don't have any tasks
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={styles.add_task_cont}>
              <button
                className={styles.add_task_btn}
                disabled={isLoading}
                onClick={onAddBtnClick}
              >
                &#10070; Add a Task
              </button>
            </div>
          </div>
          <div className={styles.other_tasks_cont}>
            <div className={styles.complete}>
              <BoxHeader heading="Completed" />
              <div className={styles.tasks_container}>
                {isLoading ? (
                  <>
                    <div className={styles.centerDiv}>
                      <LoadingSpinner backgroundColor="white" color="#2272f1" />
                    </div>
                  </>
                ) : (
                  <div className={styles.compPrevTasksCont}>
                    {completed.map((task, index) => {
                      return (
                        <OtherCard
                          key={task.id + index}
                          cardStatus="Completed"
                          user={user}
                          cardDetails={task}
                          changeErrorStatus={changeErrorStatus}
                        />
                      );
                    })}
                    {completed.length === 0 && (
                      <div className={styles.emptyList}>
                        You haven't completed any tasks
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.previous}>
              <BoxHeader heading="Previous Tasks" />
              <div className={styles.tasks_container}>
                {isLoading ? (
                  <>
                    <div className={styles.centerDiv}>
                      <LoadingSpinner backgroundColor="white" color="#2272f1" />
                    </div>
                  </>
                ) : (
                  <div className={styles.compPrevTasksCont}>
                    {previous.map((task, index) => {
                      return (
                        <OtherCard
                          key={task.id + index}
                          cardStatus="Previous"
                          user={user}
                          cardDetails={task}
                          changeErrorStatus={changeErrorStatus}
                        />
                      );
                    })}
                    {previous.length === 0 && (
                      <div className={styles.emptyList}>
                        You don't have any previous tasks
                      </div>
                    )}
                  </div>
                )}
              </div>
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
              rel="noreferrer"
              href="https://icons8.com/icon/JzX2t6Cvzq1l/user"
            >
              User
            </a>{" "}
            and{" "}
            <a
              className={styles.smallLink}
              target="_blank"
              rel="noreferrer"
              href="https://icons8.com/icon/85194/trash"
            >
              Trash
            </a>{" "}
            icons by{" "}
            <a
              className={styles.smallLink}
              target="_blank"
              rel="noreferrer"
              href="https://icons8.com"
            >
              Icons8
            </a>
          </div>
        </div>
      </div>
      {addModal && <AddTask user={user} onAddModalClose={onAddModalClose} />}
      {errorModal && (
        <ErrorModal onErrorModalClose={onErrorModalClose} error={error} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(Tasks);
