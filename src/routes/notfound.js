import React from 'react';
import MetaComponent from '../components/Meta';
import styles from './routes.module.css';

const NotFound = () => {
  return (
    <>
      <MetaComponent title='404 Not found: Daily Planner' />
      <div className={styles.not_found}>
        !404 NOT FOUND<p></p>
      </div>
    </>
  );
};
export default NotFound;
