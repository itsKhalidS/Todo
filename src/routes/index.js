import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import fire from "../config/fire";
import { signInUser, signOutUser } from "../redux/actionCreators";
import Home from "../screens/Home";
import Fallback from "./fallback";
import NotFound from "./notfound";
import Login from "../screens/Login";

const MainRoute = ({ user, signIn, signOut }) => {
  useEffect(() => {
    fire.auth().onAuthStateChanged((client) => {
      if (client) {
        if (!user) {
          signIn(client);
        }
      } else {
        if (!!user) {
          signOut();
        }
      }
    });
  });

  return (
    <Router>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" component={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
const mapStatetoProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(signInUser(user)),
    signOut: () => dispatch(signOutUser()),
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(MainRoute);
