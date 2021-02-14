import React from 'react';
import styles from './routes.module.css';

const Fallback = () => {
  return (
    <div className={styles.fallback}>
      Loading ...<p></p>
    </div>
  );
};
export default Fallback;
