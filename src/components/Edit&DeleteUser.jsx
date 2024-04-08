import React from "react";
import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../utils/firebase";
import EditUser from "./EditUser";

function EditDeleteUser({ docId }) {
    const [editUser, setEditUser] = useState(false); 

    const confirmAction = async () => {
        const response = window.confirm(`Are you sure you want to delete this user?`);
        if (response) {
            try {
                await deleteDoc(doc(database, "admin-access", docId));
                window.location.reload();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        } else {
            console.log("Delete action canceled");
        }
    };

    return (
        <>
            <div className="bg-white w-[100px] text-center rounded-lg border border-gray-400">
                <div className="border-b border-gray-400 py-1 cursor-pointer" onClick={()=>setEditUser(!editUser)}>Edit</div>
                <div className="text-red-500 py-1 cursor-pointer" onClick={confirmAction}>Delete</div>
            </div>
            {editUser === true ? <EditUser docId={docId} /> : null}
        </>
    );
}

export default EditDeleteUser;
