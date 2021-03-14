import React from "react";
import { connect } from "react-redux";
import Todo from "../Todo";
import SignUp from "../SignUp";

const Home = ({ user }) => {
  return user ? <Todo /> : <SignUp />;
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStatetoProps, null)(Home);
