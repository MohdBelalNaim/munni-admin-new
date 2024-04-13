import React, { useState, useEffect } from "react";
import style from "../assets/users.module.css";
import { useForm } from "react-hook-form";
import { getDoc, doc, setDoc } from "firebase/firestore"; // Import setDoc
import { database } from "../utils/firebase";
import { toast } from "react-hot-toast";
import { SpinnerCircular } from "spinners-react";

function EditUser({ docId }) {
  const [isVisible, setIsVisible] = useState(true);
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(database, "admin-access", docId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setValue("fullName", data.fullName);
          setValue("username", data.username);
          setValue("password", data.password);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, [docId, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const docRef = doc(database, "admin-access", docId);
      await setDoc(docRef, data); 
      toast.success("User updated successfully!");
      setIsVisible(false);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  };
  

  return (
    <>
    {isVisible && (<div
      className={`fixed bg-black inset-0 z-10 ${style.overlay} grid place-items-center`}
    >
      <div className="w-[32%] bg-white rounded p-4 animate__animated animate__bounceIn">
        <div className="text-xl font-bold mb-3">Edit user</div>
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
            {/* <div>
              <button
                type="submit"
                className="bg-blue-500 w-full text-white p-2 rounded-lg flex justify-center"
              >
                Save
              </button>
            </div> */}
            {loading ? (
            <button disabled  type="submit"
            className="bg-blue-400 w-full text-white p-2 rounded-lg flex justify-center">
              Saving
              <SpinnerCircular color="white" secondaryColor="gray" size={20} />
            </button>
          ) : (
          <button type="submit"
          className="bg-blue-500 w-full text-white p-2 rounded-lg flex justify-center">
            Save
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

export default EditUser;
