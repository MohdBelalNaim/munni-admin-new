import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/toggleSlice";
import EditDeleteUser from "../components/Edit&DeleteUser";
import AddUser from "../components/AddUser";

const AccountsPage = () => {
  const [editUser, setEditUser] = useState(null); 
  const [addUser, setAddUser] = useState(false); 
  const [editUserPosition, setEditUserPosition] = useState({}); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    async function getAdmins() {
      try {
        const adminsRef = collection(database, "admin-access");
        const adminsSnapshot = await getDocs(adminsRef);
        const adminsData = adminsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setAdmins(adminsData);
      } catch (error) {
        console.error("An error occurred!");
      }
    }
    if (localStorage.getItem("user")) {
      dispatch(login());
      getAdmins();
    } else {
      navigate("/auth");
    }
  }, [dispatch, navigate]);

  const handleEditClick = (admin, event) => {
    const rect = event.target.getBoundingClientRect();
    if (editUser === admin) {
      setEditUser(null);
    } else {
      setEditUser(admin);
      setEditUserPosition({ top: rect.top - 50, left: rect.left - 220 });
    }
  };

  const handleDelete = async (docId) => {
    try {
      await deleteDoc(doc(database, "admin-access", docId));
      // Handle any necessary updates after deletion
      console.log("User deleted");
      // Optionally, you can fetch the updated list of admins after deletion
      const updatedAdmins = admins.filter(admin => admin.id !== docId);
      setAdmins(updatedAdmins);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="px-5 relative">
      <div className="flex flex-row justify-between">
        <div className="text-xl font-bold mb-5">All Users</div>
        <div>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-lg" onClick={() => setAddUser(!addUser)}>Add User</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table bg-white">
          <thead>
            <tr className="text-base text-black">
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index} className="hover:bg-blue-200">
                <td>{admin.fullName}</td>
                <td>{admin.username}</td>
                <td>{admin.password}</td>
                <td className="font-bold text-xl cursor-pointer" onClick={(event) => handleEditClick(admin, event)}>...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {addUser && <AddUser />}
      {editUser && (
        <div className="absolute" style={{ top: editUserPosition.top, left: editUserPosition.left }}>
          <EditDeleteUser docId={editUser.id} onDelete={() => handleDelete(editUser.id)} />
        </div>
      )}
    </div>
  );
};

export default AccountsPage;
