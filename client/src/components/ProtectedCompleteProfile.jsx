import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedCompleteProfile = ({ children }) => {
  const navigate = useNavigate();
  const verified = sessionStorage.getItem("verified");

  useEffect(() => {
    if (!verified) {
      navigate("/sign-up");
    }
  }, [verified, navigate]); 

  if (!verified) {
    return null; 
  }

  return children;
};

export default ProtectedCompleteProfile;
