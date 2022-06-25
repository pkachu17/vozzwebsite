import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Header from "../Header";
import { AddUsers, listUsers, app } from "../../../login/firebase";
import { onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getFirestore, getDocs, getDoc, collection, snapshotEqual } from "firebase/firestore";
import "./CreateUsers.css";
import { update } from "firebase/database";
import { async } from "@firebase/util";
import EditStudentScreens from "./EditStudentScreens";

const CreateUsers = () => {
    const db = getFirestore(app);
    const headervalue = 'Create Users';
    const [uname, setUname] = useState("");
    const [uid, setUid] = useState("");
    const [screenId, setScreenId] = useState("");
    const [screens, setScreens] = useState([])
    const [search, setSearch] = useState();

    const [students, setstudents] = useState([]);

    const listUsers = async () => {

        onSnapshot(collection(db, "students"), (snapshot) => {
            setstudents(snapshot.docs.map(doc => doc.data()));
            console.log(snapshot.docs.map(doc => doc.data()))
        });
    }

    const deleteUser = async (sid) => {
        try {
            console.log("from delete func", sid);
            const id = doc(db, "students", sid).id;
            console.log(id);
            await deleteDoc(doc(db, "students", id));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    const searchUser=()=>{};

    useEffect(() => {
        listUsers();
        listScreens();
    }, []);
    const listScreens = async () => {

        onSnapshot(collection(db, "screens"), (snapshot) => {
            setScreens(snapshot.docs.map(doc => doc.data()));
            console.log(snapshot.docs.map(doc => doc.data()))
        });
    }

    return (
        <Fragment>
        <div className="CreateUsers">
            <Header text={headervalue} />

            <div className="field-users">
                <div className="user__container">
                    <input type="text" className="login__textBox" value={uname} onChange={(e) => setUname(e.target.value)} placeholder="User Name" />
                    <input type="text" className="login__textBox" value={uid} onChange={(e) => setUid(e.target.value)} placeholder="User id" />
                    <button className="login__btn" onClick={() => AddUsers(uname, uid)}>
                        Add User
                    </button>
                </div>
            </div>
            <div className="list-user">
                <table className="table mt-0 text-center">
                    <thead>
                        <tr>
                            <th>Student's Name</th>
                            <th>Student's ID</th>
                            <th>Screen 1</th>
                            <th>Screen 2</th>
                            <th>Screen 3</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {students.map((val, id) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{val.sname}</td>
                                    <td>{val.sid}</td>
                                    <td>
                                        <div className="form-group dropdn">
                                            <h4>{val.screen1}</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-group dropdn">
                                                <h4>{val.screen2}</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-group dropdn">
                                            <h4>{val.screen3}</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <EditStudentScreens val={val}/>
                                    </td>

                                    <td><button className="btn btn-danger" onClick={() => deleteUser(val.sid)}>Delete User</button></td>
                                </tr>
                            </tbody>
                        );

                    })}
                </table>
            </div>
        </div>
        </Fragment>
    );
}
export default CreateUsers;