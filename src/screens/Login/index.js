import React, { useState } from 'react';
import MetaComponent from '../../components/Meta';
import styles from './login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);

  const onInputChange = (event) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    } else {
      setMessage(event.target.value);
    }
  };
  const togglePassword = () => {
    setShowPassword((prevPasswordStatus) => {
      return !prevPasswordStatus;
    });
  };
  return (
    <>
      <MetaComponent
        title='Login: Daily Planner'
        description='Login and create and manage your daily tasks'
        keywords='Login, Planner, Task, Tasks, Todo, Notes'
      />

      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.welcome}>
            <h2>Welcome to Daily Planner</h2>
            <div className={styles.welcome_content}>
              <p>
                Plan your day effectively.
                <br /> Manage your tasks, todos and notes and get the most out
                of your day.
              </p>
            </div>
          </div>
          <div className={styles.login}>
            <h2>Login</h2>
            {message && <div className={styles.message}>*{message}</div>}
            <div className={styles.input_container}>
              <label>Email:</label>
              <div className={styles.input_div}>
                <input
                  type='email'
                  name='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={onInputChange}
                  className={styles.email}
                />
              </div>
            </div>
            <div className={styles.input_container}>
              <label>Password:</label>
              <div className={styles.input_div}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={onInputChange}
                  className={styles.password}
                />
                <button
                  className={styles.toggle_password}
                  onClick={togglePassword}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button className={styles.login_btn}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
