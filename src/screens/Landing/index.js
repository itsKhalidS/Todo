import React from "react";
import { useNavigate } from "react-router";
import LogoSmallBlue from "../../assets/Logo-Blue-Small.PNG";
import CheckList from "../../assets/Checklist.gif";
import styles from "./landing.module.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const redirectTo = (page) => {
    if (page === "signup") navigate("/signup");
    if (page === "login") navigate("/login");
  };

  //Simply writing your tasks down makes you more effective
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img className={styles.logo} src={LogoSmallBlue} alt="Brand Logo" />
      </div>
      <div className={styles.middle}>
        <div className={styles.main_middle}>
          <div className={styles.middle_left}>
            <div className={styles.textArea}>
              <div className={styles.highlighted}>
                You can manage your tasks
              </div>
              <div className={styles.normal}>
                Are you procrastinating a lot these days ?
              </div>
              <div className={styles.second}>
                You are 42 percent more likely to achieve your goals if you
                write them down
              </div>
              <div className={styles.normal}>
                Plan your day effectively. Manage your tasks and get the most
                out of your day
              </div>
            </div>
            <div className={styles.buttons}>
              <button
                className={styles.button}
                onClick={() => redirectTo("signup")}
              >
                SignUp
              </button>
              <button
                className={styles.button}
                onClick={() => redirectTo("login")}
              >
                LogIn
              </button>
            </div>
          </div>
          <div className={styles.middle_right}>
            <img className={styles.checklist} src={CheckList} alt="Checklist" />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          This web app is designed and implemented by&nbsp;
          <a
            className={styles.linkedin}
            href="https://www.linkedin.com/in/md-khalid-shahzad-7b63611b1"
            target="_blank"
            rel="noreferrer"
          >
            Md Khalid Shahzad.
          </a>
        </div>
        <div className={styles.small}>
          <a
            className={styles.smallLink}
            target="_blank"
            href="https://icons8.com/icon/RFI53ZLVF5Ga/checklist"
          >
            Checklist
          </a>{" "}
          icon by{" "}
          <a
            className={styles.smallLink}
            target="_blank"
            href="https://icons8.com"
          >
            Icons8
          </a>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
