import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { unauthorizedRoutes } from "./routes";

const OnlyWhenAuthenticated = ({ user, children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!user) {
      if (unauthorizedRoutes[pathname]) {
        navigate("/tasks");
      }
    }
  }, [user, pathname, navigate]);
  return !!user ? children : null;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(OnlyWhenAuthenticated);
