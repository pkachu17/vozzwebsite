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
    const [search, setSearch] = useState("");
    const [students, setstudents] = useState([]);

    const listUsers = async () => {

        onSnapshot(collection(db, "students"), (snapshot) => {
            setstudents(snapshot.docs.map(doc => doc.data()));
            console.log(snapshot.docs.map(doc => doc.data()))
            console.log(students);
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

    useEffect(() => {
        listUsers();
    }, []);

    return (
        <Fragment>
            <div className="CreateUsers">
                <Header text={headervalue} />

                <div className="field-users">
                    <div className="user__container">
                        <div className="userContainerLeft">
                            <input id="cUserInput" type="text" className="form-control rounded w-25" value={uname} onChange={(e) => setUname(e.target.value)} placeholder="User Name" />
                            <input id="cUserInput" type="text" className="form-control rounded w-25" value={uid} onChange={(e) => setUid(e.target.value)} placeholder="User id" />
                            <button id="cUserInput" className="btn btn-success w-15" onClick={() => AddUsers(uname, uid)}>
                                Add User
                            </button>
                        </div>
                        <div className="userContainerRight">
                            <input type="search" className="form-control rounded" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
                        </div>
                    </div>
                </div>
                <div className="list-user">
                    <table className="table mt-0 text-center">
                        <thead id="listUsers">
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
                        {students.filter(button => button.sname.toLowerCase().includes(`${search}`.toLowerCase())).map((val, id) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td>{val.sname}</td>
                                        <td>{val.sid}</td>
                                        <td>{val.screen1}</td>
                                        <td>{val.screen2}</td>
                                        <td>{val.screen3}</td>
                                        <td><EditStudentScreens val={val} /></td>
                                        <td><button className="btn btn-danger" data-toggle="modal" data-target={`#id${val.sname}`}><i class="fas fa-trash-alt" style={{ color: 'white' }}></i></button></td>
                                        <div class="modal fade" id={`id${val.sname}`}>
                                            <div class="modal-dialog modal-confirm">
                                                <div class="modal-content">
                                                    <div class="modal-header flex-column md-center">
                                                        <div class="icon-box">
                                                            <i class="material-icons">&#xE5CD;</i>
                                                        </div>
                                                        <h4 class="modal-title w-100">Are you sure?</h4>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p class="text-decoration-none">Do you really want to delete User: <b>{val.sname}</b>? This process cannot be undone.</p>
                                                    </div>
                                                    <div class="modal-footer justify-content-center">
                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                        <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => deleteUser(val.sid)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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