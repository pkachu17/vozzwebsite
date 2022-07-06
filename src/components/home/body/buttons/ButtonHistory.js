import React, { Fragment, useState, useEffect } from "react";
import Header from "../Header";
import { app } from "../../../login/firebase";
import { onSnapshot, getFirestore, collection } from "firebase/firestore";
import "./ButtonHistory.css";
import UserButtonHistory from "./UserButtonHistory";

const ButtonHistory = () =>{
    const db = getFirestore(app);
    const headervalue = 'Button History';
    const [students, setstudents] = useState([]);
    const listUsers = async () => {
        onSnapshot(collection(db, "students"), (snapshot) => {
            setstudents(snapshot.docs.map(doc => doc.data()));
            console.log(snapshot.docs.map(doc => doc.data()))
        });
    }
    useEffect(() => {
        listUsers();
    }, []);
    return (
        <Fragment>
        <div className="ButtonHistory">
            <Header text={headervalue} />

            <div className="list-userss">
                <table className="table mt-0 text-center">
                    <thead id="listScreen">
                        <tr>
                            <th>Student's Name</th>
                            <th>Student's ID</th>
                            <th>Display History</th>
                        </tr>
                    </thead>
                    {students.map((val, id) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{val.sname}</td>
                                    <td>{val.sid}</td>
                                    <td>
                                        <UserButtonHistory val={val}/>
                                    </td>
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

export default ButtonHistory;