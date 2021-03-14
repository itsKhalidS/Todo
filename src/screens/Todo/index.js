import React from 'react';
import TodoCard from '../../components/TodoCard';
import fire from '../../config/fire';
import styles from './todo.module.css';

const Todo = () => {
  return (
    <div className={styles.todo}>
      <h2>Daily Planner</h2>
      <button
        onClick={() => {
          fire.auth().signOut();
        }}
      >
        Sign out
      </button>
      <TodoCard />
    </div>
  );
};
export default Todo;
