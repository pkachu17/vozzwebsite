// Import required dependencies for react, react components, firebase, images and style sheet
import React, { Fragment, useState, useEffect } from "react";
import { app } from "../../../login/firebase";
import { onSnapshot, getFirestore, collection } from "firebase/firestore";
import UserButtonHistory from "./UserButtonHistory";
import Header from "../Header";
import "./ButtonHistory.css";

//ButtonHistory react component
const ButtonHistory = () => {
    const db = getFirestore(app); //initializing firebase db
    const headervalue = 'Button History'; // header value for the page
    const [students, setstudents] = useState([]);

    //List User function fetches all the previously created users from the firebase
    const listUsers = async () => {
        onSnapshot(collection(db, "students"), (snapshot) => {
            setstudents(snapshot.docs.map(doc => doc.data()));
            console.log(snapshot.docs.map(doc => doc.data()))
        });
    }

    //useEffect react hook runs listUsers function when the ButtonHistory component/page is loaded in Web Broser
    useEffect(() => {
        listUsers();
    });
    return (
        <Fragment>
            <div className="ButtonHistory">
                {/* Header */}
                <Header text={headervalue} />

                <div className="list-userss">
                {/* Table for user details */}
                    <table className="table mt-0 text-center">
                    {/* Table Head */}
                        <thead id="listScreen">
                            <tr>
                                <th>Student's Name</th>
                                <th>Student's ID</th>
                                <th>Display History</th>
                            </tr>
                        </thead>
                        {/* Table body or results which also uses UserButtonHistory Modal*/}
                        {students.map((val, id) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td>{val.sname}</td>
                                        <td>{val.sid}</td>
                                        <td><UserButtonHistory val={val} /></td>
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