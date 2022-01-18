import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { authorizedRoutes } from "./routes";

const NotAuthenticated = ({ user, children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      if (authorizedRoutes[pathname]) {
        navigate("/login");
      }
    }
  }, [user, pathname, navigate]);
  return !user ? children : null;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(NotAuthenticated);
