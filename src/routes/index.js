import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import fire from "../config/fire";
import { signInUser, signOutUser } from "../redux/actionCreators";
import LandingPage from "../screens/Landing";
import SignUp from "../screens/SignUp";
import Tasks from "../screens/Tasks";
import Login from "../screens/Login";
import Fallback from "../screens/RoutePages/fallback";
import NotFound from "../screens/RoutePages/notfound";
import NotAuthenticated from "./NotAuthenticated";
import OnlyWhenAuthenticated from "./OnlyWhenAuthenticated";
import ForgotPassword from "../screens/ForgotPassword";

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
      <NotAuthenticated>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset_password" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </NotAuthenticated>
      <OnlyWhenAuthenticated>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </OnlyWhenAuthenticated>
    </Router>
  );
};
const mapStateToProps = (state) => {
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
export default connect(mapStateToProps, mapDispatchToProps)(MainRoute);
