import { connect } from "react-redux";

const NotAuthenticated = ({ user, children }) => {
  return !user ? children : null;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(NotAuthenticated);
