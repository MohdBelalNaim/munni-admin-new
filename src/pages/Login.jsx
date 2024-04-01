import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/toggleSlice";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function loginuser(e) {
    if (e.username == "Admin" && e.password == "Adminpass") {
      dispatch(login());
      navigate("/");
      localStorage.setItem("user", "admin");
    } else {
      alert("Bad credentials");
    }
  }
  return (
    <div className="h-[calc(100dvh-120px)] w-full grid place-items-center">
      <div className="w-[min(400px,96%)] bg-white rounded-md px-5 py-8 grid gap-y-4">
        <form onSubmit={handleSubmit(loginuser)}>
          <div className="text-center text-lg font-bold">
            {" "}
            Login to Admin Panel
          </div>
          <input
            type="text"
            className="w-full rounded border p-2 mt-4"
            placeholder="Username"
            {...register("username")}
            required
          />
          <input
            type="password"
            className="w-full rounded border p-2 mt-4"
            placeholder="Password"
            {...register("password")}
            required
          />
          <button className="primary p-2 rounded w-full mt-4">Login</button>
          <div className="text-sm text-gray-500 text-center mt-4">
            Munni welfare foundation
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
