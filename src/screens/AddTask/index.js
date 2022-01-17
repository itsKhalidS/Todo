import React, { useCallback, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import fire from "../../config/fire";
import styles from "./AddTask.module.css";

const AddTask = ({ user, onAddModalClose }) => {
  const [task, setTask] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addNewTask = useCallback(() => {
    setLoading(true);
    const tasksRef = fire.database().ref(`${user?.uid}/Today/Tasks`);
    tasksRef.push(task.trim().replace(/\s+/g, " "), (err) => {
      if (err) {
        setError("Failed to add task");
        setLoading(false);
      } else {
        setTask("");
        setError("");
        setLoading(false);
        onAddModalClose();
      }
    });
  }, [task, user, onAddModalClose]);

  const onTaskChange = useCallback((event) => {
    setTask(event.target.value.slice(0, 50));
  }, []);

  return (
    <Modal
      headerText="Add Task"
      onClose={onAddModalClose}
      isCloseDisabled={isLoading}
    >
      <div className={styles.task_modal_body}>
        {error && <div className={styles.error}>*{error}</div>}
        <div className={styles.input_container}>
          <label>Task:</label>
          <div className={styles.input_div}>
            <input
              type="text"
              placeholder="Enter task"
              value={task}
              onChange={onTaskChange}
              className={styles.task}
            />
          </div>
        </div>
        <button
          className={styles.add_btn}
          onClick={addNewTask}
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : "Add"}
        </button>
      </div>
    </Modal>
  );
};
export default AddTask;
