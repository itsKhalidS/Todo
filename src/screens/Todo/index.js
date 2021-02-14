import React from 'react';
import TodoCard from '../../components/TodoCard';
import styles from './todo.module.css';

const Todo = () => {
  return (
    <div className={styles.todo}>
      <h2>Daily Planner</h2>
      <TodoCard />
    </div>
  );
};
export default Todo;
