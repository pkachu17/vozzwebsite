import React from "react";
import { useState, useEffect } from "react";
import Header from "../Header";
import { app } from "../../../login/firebase";
import { onSnapshot, query, where, getDocs, getDoc, doc, deleteDoc, updateDoc, writeBatch, runTransaction } from "firebase/firestore";
import { getFirestore, setDoc, collection, deleteField } from "firebase/firestore";
import "./CreateScreens.css";
import EditScreenGrid from "./EditScreenGrid";
import PreviewScreen from "./PreviewScreen";


const CreateScreens = () => {
    const headervalue = 'Create Screen';
    const db = getFirestore(app);
    const [sname, setSname] = useState("");
    const [screens, setScreens] = useState([]);
    const [gridSize, setGridSize] = useState("");

    const listScreens = async () => {
        onSnapshot(collection(db, "screens"), (snapshot) => {
            console.log(snapshot.docs.map(doc=>doc.data()));
            setScreens(snapshot.docs.map(doc => doc.data()));            
            //console.log(snapshot.docs.map(doc => doc.data()))
        });
    }
    const addScreens = async (sname, gridSize) => {
        try {
            await setDoc(doc(db, "screens", sname), {
                sname: sname,
                pname: "preview"+sname,
                gridSize: gridSize,
                r: gridSize.charAt(0),
                c: gridSize.charAt(2),
                buttons: Array(parseInt(gridSize.charAt(0), 10) * parseInt(gridSize.charAt(2))).fill(""),
                buttonsSelected:Array(parseInt(gridSize.charAt(0), 10) * parseInt(gridSize.charAt(2))).fill(""),
                buttonsImage:Array(parseInt(gridSize.charAt(0), 10) * parseInt(gridSize.charAt(2))).fill(""),
                buttonsColor:Array(parseInt(gridSize.charAt(0), 10) * parseInt(gridSize.charAt(2))).fill(""),

            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    console.log(screens);
    const deleteUserScreen1 = async (q) => {
        try {
            await updateDoc(doc(db, "students", q), {
                "screen1": ""
            });
        }
        catch (e) {
            console.error("Error deleting Fields: ", e);
        }
    }
    const deleteUserScreen2 = async (q) => {
        try {
            await updateDoc(doc(db, "students", q), {
                "screen2": ""
            });
        }
        catch (e) {
            console.error("Error deleting Fields: ", e);
        }
    }
    const deleteUserScreen3 = async (q) => {
        try {
            await updateDoc(doc(db, "students", q), {
                "screen3": ""
            });
        }
        catch (e) {
            console.error("Error deleting Fields: ", e);
        }
    }
    const deleteScreen = async (sname) => {
        try {
            console.log("from delete func", sname);
            const id = doc(db, "screens", sname).id;
            console.log(id);
            await deleteDoc(doc(db, "screens", id));
            const q = query(collection(db, "students"), where("screen1", "==", sname));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                deleteUserScreen1(doc.id);
            });
            const r = query(collection(db, "students"), where("screen2", "==", sname));
            const querySnapshot1 = await getDocs(r);
            querySnapshot1.forEach((doc) => {
                deleteUserScreen2(doc.id);
            });
            const s = query(collection(db, "students"), where("screen3", "==", sname));
            const querySnapshot2 = await getDocs(s);
            querySnapshot2.forEach((doc) => {
                deleteUserScreen3(doc.id);
            });


        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    useEffect(() => {
        listScreens();
    }, []);

    return (
        <div className="CreateScreens">
            <Header text={headervalue} />
            <div className="screens__container">
                <input type="text" className="login__textBox mt-1" value={sname} onChange={(e) => setSname(e.target.value)} placeholder="Screen Name" />
                <select className="login__textBox  mt-1" name="screen2" value={gridSize} onChange={e => setGridSize(e.target.value)}>
                    <option disabled selected value>Select Grid Size</option>
                    <option selected value="2*2">2*2</option>
                    <option selected value="2*3">2*3</option>
                    <option selected value="3*4">3*4</option>
                    <option selected value="3*5">3*5</option>
                    <option selected value="4*4">4*4</option>
                    <option selected value="4*5">4*5</option>
                    <option selected value="4*6">4*6</option>
                </select>
                <button className="login__btn" onClick={() => addScreens(sname, gridSize)}>
                    Add Screen
                </button>
            </div>
            <div id="list" className="list-screen">
                <table className="table mt-0 text-center">
                    <thead>
                        <tr>
                            <th>Screen's Name</th>
                            <th>Grid Size</th>
                            <th>Preview Screen</th>
                            <th>Edit Screen</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {screens.map((val, id) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{val.sname}</td>
                                    <td>{val.gridSize}</td>
                                    <td><PreviewScreen val={val} /></td>
                                    <td><EditScreenGrid val={val} /></td>
                                    <td><button className="btn btn-danger" onClick={() => deleteScreen(val.sname)}>Delete Screen</button></td>
                                </tr>
                            </tbody>
                        );

                    })}
                </table>
            </div>
        </div>
    );
}
export default CreateScreens;