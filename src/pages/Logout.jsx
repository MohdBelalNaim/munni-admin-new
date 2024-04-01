import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/toggleSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    dispatch(logout());
    navigate("/auth");
  });
  return <div>Logging out...</div>;
};

export default Logout;
