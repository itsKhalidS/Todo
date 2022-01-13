import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fire from "../../config/fire";
import MetaComponent from "../../components/Meta";
import Logo from "../../assets/Logo-Blue.PNG";
import styles from "./login.module.css";
import LoadingSpinner from "../../components/LoadingSpinner";

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onInputChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    } else {
      setError(event.target.value);
    }
  };
  const togglePassword = () => {
    setShowPassword((prevPasswordStatus) => {
      return !prevPasswordStatus;
    });
  };

  const loginClick = (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setLoading(false);
          if (error) setError("");
          navigate("/tasks");
        })
        .catch((error) => {
          let msg = "";
          switch (error.code) {
            case "auth/invalid-email":
              msg = "Invalid email address";
              break;
            case "auth/wrong-password":
              msg = "Incorrect Password";
              break;
            case "auth/user-disabled":
            case "auth/user-not-found":
              msg = "User Not Found";
              break;
            default:
              msg = "An Unexpected Error occurred during Login";
              break;
          }
          setLoading(false);
          setPassword("");
          setError(msg);
        });
    }
  };
  const validate = () => {
    const mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!mailformat.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password === "") {
      setError("Please enter your password");
      return false;
    }
    return true;
  };
  const navigateToSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      <MetaComponent
        title="Login: Daily Planner"
        description="Login and create and manage your daily tasks"
        keywords="Login, Planner, Task, Tasks, Todo, Notes"
      />

      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.welcome}>
            <img className={styles.logo} src={Logo} alt="Brand Logo" />
            <h2>Welcome,</h2>
            <div className={styles.welcome_content}>
              <p>
                Plan your day effectively.
                <br /> Manage your tasks and todos and get the most out of your
                day.
              </p>
            </div>
          </div>
          <div className={styles.login}>
            <h2>Login</h2>
            {error && <div className={styles.error}>*{error}</div>}
            <div className={styles.input_container}>
              <label>Email:</label>
              <div className={styles.input_div}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={onInputChange}
                  className={styles.password}
                />
                <button
                  className={styles.toggle_password}
                  onClick={togglePassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              className={styles.login_btn}
              onClick={loginClick}
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Login"}
            </button>
            <div className={styles.redirect_cont}>
              <div
                className={`${styles.redirect_link} ${styles.redirect_margin}`}
              >
                <span className={styles.redirect_btn}>Forgot Password?</span>
              </div>
              <div className={styles.redirect_link}>
                New User?&nbsp;
                <span
                  className={styles.redirect_btn}
                  onClick={navigateToSignUp}
                >
                  SignUp
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
