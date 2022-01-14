import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import fire from "../../config/fire";
import MetaComponent from "../../components/Meta";
import LoadingSpinner from "../../components/LoadingSpinner";
import Logo from "../../assets/Logo-Blue.PNG";
import styles from "./forgotPassword.module.css";
import Modal from "../../components/Modal";

const ForgotPassword = () => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      fire
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          if (!!error) setError("");
          setEmail("");
          setLoading(false);
          setShowModal(true);
        })
        .catch((error) => {
          let msg = "";
          switch (error.code) {
            case "auth/invalid-email":
              msg = "Invalid Email Address";
              break;
            case "auth/user-not-found":
              msg = "User not found";
              break;
            default:
              msg = "An unexpected error occurred";
              break;
          }
          setError(msg);
          setLoading(false);
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
    return true;
  };

  const navigateToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  return (
    <>
      <MetaComponent
        title="Forgot Password: Daily Planner"
        description="Reset your password"
        keywords="Forgot, password, Reset, Tasks, Todo, Notes"
      />

      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.welcome}>
            <img className={styles.logo} src={Logo} alt="Brand Logo" />
          </div>
          <div className={styles.content}>
            <h2>Forgot Password?</h2>
            {error && <div className={styles.error}>*{error}</div>}
            <div className={styles.input_container}>
              <label>Email:</label>
              <div className={styles.input_div}>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={onEmailChange}
                  className={styles.email}
                />
              </div>
            </div>
            <button
              className={styles.reset_btn}
              onClick={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Reset Password"}
            </button>
            <div className={styles.redirect_cont}>
              <div
                className={`${styles.redirect_link} ${styles.redirect_margin}`}
              >
                <span className={styles.redirect_btn} onClick={navigateToLogin}>
                  Login?
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal headerText="Success!" onClose={closeModal}>
          <div className={styles.modal}>
            <p className={styles.modalPara}>
              A password reset link has been sent to your email address.
              <br /> Reset your password and proceed to login
            </p>
            <button className={styles.modalButton} onClick={navigateToLogin}>
              Login
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
export default ForgotPassword;
