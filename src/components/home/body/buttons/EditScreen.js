import React from "react";
import { useState, useEffect } from "react";
import Header from "../Header";
import { onValue, getDatabase, ref } from "firebase/database";
import { AddUsers, listUsers, app } from "../../../login/firebase";
import { onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { getFirestore, getDocs, getDoc, collection, snapshotEqual } from "firebase/firestore";
import "./EditScreen.css";

const EditScreen = () => {
    const db = getFirestore(app);
    const headervalue = 'Create Screens';
    const [name, screenName] = useState("");
    const [id,screenID] = useState('');
    const [size,gridSize] = useState('');
    
    const [screens, setscreens] = useState([]);
    const listScreens = async () => {
        onSnapshot(collection(db, "screen"), (snapshot)=>{
            setscreens(snapshot.docs.map(doc => doc.data()));
        });
    }
    console.log(screens);

    const deleteUser = async (sid) => {
        try {
            // alert("Sure want to delete ", sid);
            const id = doc(db, "screen", sid).id;
            await deleteDoc(doc(db, "screen", id));      
        } catch (e) {
          console.error("Error deleting document: ", e);}
        };

    useEffect(() => {
        listScreens();
      }, []);

    return (
        <div className="CreateUsers">
            <Header text={headervalue} />

            <div className="user__container">
                <input type="text" className="login__textBox" placeholder = "Screen Name" />
                <input type="text" className="login__textBox" placeholder= "Screen id" />
                <input type="text" className="login__textBox" placeholder= "Grid Size" />
                <input type="text" className="login__textBox" placeholder= "Button ID" />
                <button className="login__btn">
                    Add Screen
                </button>
            </div>
            <div className="list-user">
                    <table className="table mt-0 text-center">
                        <thead>
                            <tr>
                                <th>Screen Name</th>
                            </tr>
                        </thead>
                            {screens.map((val, id)=>{ return (
                                <tbody>
                                    <tr>
                                    <td>{val.screen_name}</td>
                                    <td><button className="btn btn-danger">Delete Screen</button></td>
                                    </tr>
                                </tbody>
                            );
                            })}
                    </table>
            </div>
        </div>
    );
}
export default EditScreen;