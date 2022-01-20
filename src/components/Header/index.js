import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router";
import fire from "../../config/fire";
import LogoSmall from "../../assets/Logo-Blue-Small.PNG";
import UserPic from "../../assets/User-Pic.png";
import styles from "./header.module.css";
import ErrorModal from "../ErrorModal";

const Header = ({ showButtons = false, name = "" }) => {
  const [isLoading, setLoading] = useState(false);
  const ref = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { pathname } = useLocation();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleWindowClick = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target))
        setShowDropdown(false);
    },
    [ref]
  );

  useEffect(() => {
    if (showDropdown) {
      window.addEventListener("click", handleWindowClick);
    } else {
      window.removeEventListener("click", handleWindowClick);
    }
  }, [showDropdown, handleWindowClick]);

  const buttonDetails = useMemo(() => {
    if (pathname === "/tasks") {
      return {
        name: "profile",
        buttonText: "Profile",
      };
    }
    if (pathname === "/profile") {
      return {
        name: "tasks",
        buttonText: "Tasks",
      };
    }
    return {};
  }, [pathname]);

  const onDropdownBtnClick = useCallback(() => {
    setShowDropdown(!showDropdown);
  }, [showDropdown]);

  const onDropdownLinkClick = useCallback(
    (event) => {
      if (event.target.name === "profile") navigate("/profile");
      if (event.target.name === "tasks") navigate("/tasks");
    },
    [navigate]
  );

  const onLogoClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSignOutClick = useCallback(() => {
    if (!isLoading) {
      setLoading(true);
      fire
        .auth()
        .signOut()
        .then(() => {
          setLoading(false);
          navigate("/login");
        })
        .catch(() => {
          setLoading(false);
          setError("An Unexpected error occured on sign out");
        });
    }
  }, [isLoading, navigate]);

  const onErrorModalClose = useCallback(() => {
    setError("");
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_content}>
          <div className={styles.logo_container}>
            <img
              src={LogoSmall}
              alt="Brand Logo"
              className={styles.logo}
              onClick={onLogoClick}
            />
          </div>
          {showButtons && (
            <>
              <div ref={ref} className={styles.dropdown}>
                <div
                  className={styles.nav_buttons_cont}
                  onClick={onDropdownBtnClick}
                >
                  <img src={UserPic} alt="User" className={styles.userPic} />
                  <div className={styles.name_cont}>
                    <span className={styles.name}>{name}&nbsp;</span>&#9660;
                  </div>
                </div>
                {showDropdown && (
                  <div className={styles.dropdownContent}>
                    <button
                      name={buttonDetails.name}
                      className={`${styles.dropdownLink} ${styles.borderBottomGrey}`}
                      onClick={onDropdownLinkClick}
                    >
                      {buttonDetails.buttonText}
                    </button>
                    <button
                      className={styles.dropdownLink}
                      onClick={onSignOutClick}
                      disabled={isLoading}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {error && (
        <ErrorModal error={error} onErrorModalClose={onErrorModalClose} />
      )}
    </>
  );
};
export default Header;
