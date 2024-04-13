import React, { useState } from "react";
import style from "../assets/users.module.css";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../utils/firebase";
import { toast } from "react-hot-toast";
import { SpinnerCircular } from "spinners-react";

function AddUser() {
  const [isVisible, setIsVisible] = useState(true);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(database, "admin-access"), data);
      console.log("Document written with ID: ", docRef.id);
      toast.success("User added successfully!");
      setIsVisible(false); 
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("An error occurred");
      setLoading(false);
    }
  };

  return (
    <>
    {isVisible && (<div
      className={`fixed bg-black inset-0 z-10 ${style.overlay} grid place-items-center`}
    >
      <div className="w-[32%] bg-white rounded p-4 animate__animated animate__bounceIn">
        <div className="text-xl font-bold mb-3">Add a user</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full name"
              className="border border-gray-200 w-full p-3 rounded-lg"
              {...register("fullName")}
            />
            <input
              type="text"
              placeholder="Username"
              className="border border-gray-200 w-full p-3 rounded-lg"
              {...register("username")}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-200 w-full p-3 rounded-lg"
              {...register("password")}
            />
            {loading ? (
            <button disabled  type="submit"
            className="bg-gray-700 w-full text-white p-2 rounded-lg flex justify-center">
              Adding
              <SpinnerCircular color="white" secondaryColor="gray" size={20} />
            </button>
          ) : (
          <button type="submit"
          className="bg-black w-full text-white p-2 rounded-lg flex justify-center">
            Add User
          </button>)}
            <div>
              <button
                type="button"
                className="text-center cursor-pointer w-full p-2 "
                onClick={() => setIsVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>)}</>
  );
}

export default AddUser;
