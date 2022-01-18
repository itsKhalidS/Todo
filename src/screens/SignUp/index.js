import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import fire from "../../config/fire";
import MetaComponent from "../../components/Meta";
import LoadingSpinner from "../../components/LoadingSpinner";
import Logo from "../../assets/Logo-Blue.PNG";
import styles from "./signUp.module.css";

const SignUp = () => {
  const [isLoading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnteredPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = useCallback(() => {
    const mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (firstName.trim() === "") {
      setError("Please enter your First Name");
      return false;
    }
    if (lastName.trim() === "") {
      setError("Please enter your Last Name");
      return false;
    }
    if (!mailformat.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password === "") {
      setError("Please enter a valid password");
      return false;
    }
    if (password !== reEnterPassword) {
      setPassword("");
      setReEnteredPassword("");
      setError("The Passwords don't match");
      return false;
    }
    if (password.length < 6) {
      setError("Password should have at least 6 characters");
      return false;
    }
    return true;
  }, [firstName, lastName, email, password, reEnterPassword]);

  const updateDBAndProfileWithName = useCallback(
    (currentUser) => {
      try {
        const userDataBaseRef = fire
          .database()
          .ref(`${currentUser?.uid}/Details`);
        userDataBaseRef.set({
          firstName: firstName.trim().replace(/\s+/g, " "),
          lastName: lastName.trim().replace(/\s+/g, " "),
        });
      } catch (error) {}
      currentUser
        .updateProfile({
          displayName:
            firstName.trim().replace(/\s+/g, " ") +
            " " +
            lastName.trim().replace(/\s+/g, " "),
        })
        .catch((error) => {});
    },
    [firstName, lastName]
  );

  const onSignUpClick = useCallback(
    (event) => {
      if (!isLoading) {
        event.preventDefault();
        if (validate()) {
          setLoading(true);
          fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              updateDBAndProfileWithName(userCredential.user);
              if (error) setError("");
              setLoading(false);
              navigate("/tasks");
            })
            .catch((err) => {
              let msg = "";
              switch (err.code) {
                case "auth/email-already-in-use":
                  msg = "This Email Address is already in use";
                  break;
                case "auth/invalid-email":
                  msg = "Invalid Email Address";
                  break;
                case "auth/weak-password":
                  msg =
                    "The Password which you have entered is too weak. Passwods should have at least 6 characters and may also contain numbers and symbols";
                  break;
                default:
                  msg = "An Unexpected Error occcurred during Sign Up";
                  break;
              }
              setLoading(false);
              setPassword("");
              setReEnteredPassword("");
              setError(msg);
            });
        }
      }
    },
    [
      isLoading,
      validate,
      email,
      password,
      updateDBAndProfileWithName,
      error,
      navigate,
    ]
  );

  const navigateToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter" && !isLoading) onSignUpClick(event);
    },
    [onSignUpClick, isLoading]
  );

  return (
    <>
      <MetaComponent
        title="Sign Up: Daily Planner"
        description="SignUp to create and manage your daily tasks and increase your productivity"
        keywords="SignUp, sign, up, Planner, Task, Tasks, Todo, Notes"
      />
      <div className={styles.sign_up_page}>
        <div className={styles.left}>
          <img className={styles.logo} src={Logo} alt="Brand Logo" />
        </div>
        <div className={styles.right}>
          <div className={styles.container}>
            <div className={styles.header_div}>
              <h2>Create an account</h2>
              {error && <span className={styles.error}>*{error}</span>}
            </div>
            <div className={styles.input_container}>
              <label htmlFor="firstName">First name: </label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                onKeyPress={handleKeyPress}
                autoFocus
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="lastName">Last Name: </label>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="SignUpEmail">Email: </label>
              <input
                id="SignUpEmail"
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="SignUpPassword">Password: </label>
              <div className={styles.password_div}>
                <input
                  id="SignUpPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className={styles.toggle_password}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className={styles.input_container}>
              <label htmlFor="SignUpReEnter">Re-enter Password: </label>
              <input
                id="SignUpReEnter"
                type="password"
                placeholder="Re Enter Password"
                value={reEnterPassword}
                onChange={(e) => {
                  setReEnteredPassword(e.target.value);
                }}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button
              className={styles.sign_up_btn}
              onClick={onSignUpClick}
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Sign Up"}
            </button>
            <div className={styles.redirect_link}>
              Already have an account?&nbsp;
              <span className={styles.login_btn} onClick={navigateToLogin}>
                Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
