import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import { useNavigate } from "react-router-dom";

const BackProtected = ({ children }) => {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [navigate]);

  if (currentUser) {
    return null;
  }

  return children;
};

export default BackProtected;
