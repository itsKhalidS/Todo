import React from "react";
import { useNavigate } from "react-router";
import fire from "../../config/fire";

const Tasks = () => {
  const navigate = useNavigate();
  const signOut = () => {
    fire.auth().signOut();
    navigate("/login");
  };
  return <button onClick={signOut}>Sign Out</button>;
};
export default Tasks;
