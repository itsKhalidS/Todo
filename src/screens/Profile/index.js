import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import firebase from "firebase/app";
import fire from "../../config/fire";
import MetaComponent from "../../components/Meta";
import Header from "../../components/Header";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import ErrorModal from "../../components/ErrorModal";
import UserPic from "../../assets/User-Pic.png";
import { getName } from "../../helper/string";
import styles from "./Profile.module.css";

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [isLoading1, setLoading1] = useState(false);

  const [userName, setUserName] = useState("");

  const [err1, setErr1] = useState("");
  const [oldPassword1, setOldPassword1] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [err2, setErr2] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword3, setShowPassword3] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);

  const [error, setError] = useState("");
  const [errorModal, setErrorModal] = useState(false);

  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    if (user.displayName) {
      setUserName(getName(user.displayName, 4, 7));
    } else {
      const nameRef = fire.database().ref(`${user.uid}/Details/firstName`);
      nameRef
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserName(getName(snapshot.val(), 4, 7));
          } else {
            setUserName("");
          }
        })
        .catch((error) => {
          setUserName("");
        });
    }
  }, [user]);

  const validatePasswords = useCallback(() => {
    if (oldPassword1 === "") {
      setErr1("Please enter your current password");
      return false;
    }
    if (newPassword === "") {
      setErr1("Please enter your new password");
      return false;
    }
    setErr1("");
    return true;
  }, [oldPassword1, newPassword]);

  const updateUsersPassword = useCallback(
    (event) => {
      if (!isLoading1) {
        event.preventDefault();
        if (validatePasswords()) {
          setLoading1(true);
          const currentUser = fire.auth().currentUser;
          const credential = firebase.auth.EmailAuthProvider.credential(
            currentUser.email,
            oldPassword1
          );
          currentUser
            .reauthenticateWithCredential(credential)
            .then(() => {
              currentUser
                .updatePassword(newPassword)
                .then(() => {
                  setLoading1(false);
                  setOldPassword1("");
                  setNewPassword("");
                  setShowPassword1(false);
                  setShowPassword2(false);
                  setSuccessModal(true);
                })
                .catch((err) => {
                  let msg = "";
                  switch (err.code) {
                    case "auth/weak-password":
                      msg =
                        "The new password which you have entered is too weak. Please enter a strong password";
                      break;

                    default:
                      msg = "An error occurred while changing the password";
                      break;
                  }
                  setLoading1(false);
                  setError(msg);
                  setErrorModal(true);
                });
            })
            .catch((err) => {
              let msg = "";
              switch (err.code) {
                case "auth/wrong-password":
                  msg = "The password which you have entered is incorrect";
                  break;

                default:
                  msg = "Invalid user credentials";
                  break;
              }
              setLoading1(false);
              setError(msg);
              setErrorModal(true);
            });
        }
      }
    },
    [isLoading1, validatePasswords, oldPassword1, newPassword]
  );

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter" && !isLoading1) updateUsersPassword(event);
    },
    [updateUsersPassword, isLoading1]
  );

  const onDeleteBtnClick = useCallback(() => {
    if (!isLoading1) {
      if (password === "") setErr2("Please enter your password");
      else {
        setErr2("");
        setDeleteModal(true);
      }
    }
  }, [isLoading1, password]);

  const deleteUser = useCallback(
    (event) => {
      if (!isDeleteLoading) {
        event.preventDefault();
        setDeleteLoading(true);
        const currentUser = fire.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
          currentUser.email,
          password
        );
        currentUser
          .reauthenticateWithCredential(credential)
          .then(() => {
            const userRef = fire.database().ref(currentUser.uid);
            userRef
              .remove()
              .then(() => {
                currentUser
                  .delete()
                  .then(() => {
                    setDeleteLoading(false);
                    setDeleteModal(false);
                    setPassword("");
                    navigate("/login");
                  })
                  .catch(() => {
                    setDeleteLoading(false);
                    setDeleteModal(false);
                    setPassword("");
                    setError("An error occured while deleting your account");
                    setErrorModal(true);
                  });
              })
              .catch(() => {
                setDeleteLoading(false);
                setDeleteModal(false);
                setPassword("");
                setError("An error occured while deleting your account");
                setErrorModal(true);
              });
          })
          .catch((err) => {
            let msg = "";
            switch (err.code) {
              case "auth/wrong-password":
                msg = "Your password which you have entered is incorrect";
                break;

              default:
                msg = "Invalid user credentials";
                break;
            }
            setDeleteLoading(false);
            setDeleteModal(false);
            setPassword("");
            setError(msg);
            setErrorModal(true);
          });
      }
    },
    [isDeleteLoading, password, navigate]
  );

  const onErrorModalClose = () => {
    setOldPassword1("");
    setNewPassword("");
    setShowPassword1(false);
    setShowPassword2(false);
    setErr1("");
    setPassword("");
    setShowPassword3(false);
    setErr2("");
    setError("");
    setErrorModal(false);
  };

  const closeDeleteModal = () => {
    setPassword("");
    setDeleteModal(false);
  };

  const closeSuccessModal = () => {
    setSuccessModal(false);
  };

  return (
    <>
      <MetaComponent
        title="My Profile: Daily Planner"
        description="Manage Your Profile"
        keywords="Profile, Account, Data,Tasks, Todos, Complete, Remaining, Previous"
      />
      <div className={styles.profile_page}>
        <Header showButtons={true} name={userName} />

        <div className={styles.page}>
          <div className={styles.profileInfoCont}>
            <img src={UserPic} alt="User" className={styles.userPic} />
            {user.displayName && (
              <div className={styles.userName}>{user.displayName}</div>
            )}
            <div className={styles.userEmail}>{user?.email}</div>
          </div>
          <div className={styles.updatePasswordBlock}>
            <div className={styles.updatePasswordTitle}>Update Password</div>
            <div className={styles.passwordFormCont}>
              {err1 && <span className={styles.error}>*{err1}</span>}
              <div className={styles.input_container}>
                <label htmlFor="UpdateOldPassword">Password: </label>
                <div className={styles.password_div}>
                  <input
                    id="UpdateOldPassword"
                    type={showPassword1 ? "text" : "password"}
                    placeholder="Enter your Password"
                    value={oldPassword1}
                    onChange={(e) => {
                      setOldPassword1(e.target.value);
                    }}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    className={styles.toggle_password}
                    onClick={() => {
                      setShowPassword1(!showPassword1);
                    }}
                  >
                    {showPassword1 ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className={styles.input_container}>
                <label htmlFor="UpdateNewPassword">New Password: </label>
                <div className={styles.password_div}>
                  <input
                    id="UpdateNewPassword"
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    className={styles.toggle_password}
                    onClick={() => {
                      setShowPassword2(!showPassword2);
                    }}
                  >
                    {showPassword2 ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button
                className={styles.update_pass_btn}
                onClick={updateUsersPassword}
                disabled={isLoading1}
              >
                {isLoading1 ? <LoadingSpinner /> : "Update Password"}
              </button>
            </div>
          </div>
          <div className={styles.updatePasswordBlock}>
            <div className={styles.updatePasswordTitle}>Delete Account</div>
            <div className={styles.passwordFormCont}>
              {err2 && <span className={styles.error}>*{err2}</span>}
              <div className={styles.input_container}>
                <label htmlFor="DeleteOldPassword">Password: </label>
                <div className={styles.password_div}>
                  <input
                    id="DeleteOldPassword"
                    type={showPassword3 ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <button
                    className={styles.toggle_password}
                    onClick={() => {
                      setShowPassword3(!showPassword3);
                    }}
                  >
                    {showPassword3 ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button
                className={`${styles.update_pass_btn} ${styles.delete_acc_btn}`}
                onClick={onDeleteBtnClick}
                disabled={isLoading1}
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div>
            This web app is designed and implemented by{" "}
            <a
              className={styles.linkedin}
              href="https://www.linkedin.com/in/md-khalid-shahzad-7b63611b1"
              target="_blank"
              rel="noreferrer"
            >
              Md&nbsp;Khalid&nbsp;Shahzad.
            </a>
          </div>
          <div className={styles.small}>
            <a
              className={styles.smallLink}
              target="_blank"
              rel="noreferrer"
              href="https://icons8.com/icon/JzX2t6Cvzq1l/user"
            >
              User
            </a>{" "}
            icon by{" "}
            <a
              className={styles.smallLink}
              target="_blank"
              rel="noreferrer"
              href="https://icons8.com"
            >
              Icons8
            </a>
          </div>
        </div>
      </div>
      {deleteModal && (
        <Modal
          headerText="Confirm!"
          headerClass={styles.deleteModalHeader}
          onClose={closeDeleteModal}
          isCloseDisabled={isDeleteLoading}
        >
          <div className={styles.deleteModalBody}>
            <p>
              Are you sure you want to delete you account?
              <br />
              All your account data including your tasks will be erased.
            </p>
            <button
              className={styles.delete}
              onClick={deleteUser}
              disabled={isDeleteLoading}
            >
              {isDeleteLoading ? (
                <LoadingSpinner
                  color="white"
                  backgroundColor="rgb(102, 44, 44)"
                />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </Modal>
      )}
      {errorModal && (
        <ErrorModal onErrorModalClose={onErrorModalClose} error={error} />
      )}
      {successModal && (
        <Modal headerText="Success!" onClose={closeSuccessModal}>
          <div className={styles.deleteModalBody}>
            <p>Your password has been successfully updated.</p>
          </div>
        </Modal>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(Profile);
