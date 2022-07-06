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
    const [screenSearch, setScreenSearch] = useState("");

    const listScreens = async () => {
        onSnapshot(collection(db, "screens"), (snapshot) => {
            console.log(snapshot.docs.map(doc => doc.data()));
            setScreens(snapshot.docs.map(doc => doc.data()));
            //console.log(snapshot.docs.map(doc => doc.data()))
        });
    }
    const addScreens = async (sname = null, gridSize = null) => {
        try {
            if (sname == null) { alert("Please enter Screen name"); }
            if (gridSize == null) { alert("Please select Grid Size"); }
            const userRef = query(collection(db, "screens"), where("sname", "==", sname));
            const result = await getDocs(userRef);
            if (result.docs.length == 0) {
                await setDoc(doc(db, "screens", sname), {
                    sname: sname,
                    pname: "preview" + sname,
                    gridSize: gridSize,
                    r: gridSize.charAt(0),
                    c: gridSize.charAt(2),
                    buttons: Array(parseInt(gridSize.charAt(0), 10) * parseInt(gridSize.charAt(2))).fill(""),
                    buttonsSelected: Array(parseInt(gridSize.charAt(0), 10) * parseInt(gridSize.charAt(2))).fill(""),
                    buttonsImage: Array(parseInt(gridSize.charAt(0), 10) * parseInt(gridSize.charAt(2))).fill(""),
                    buttonsColor: Array(parseInt(gridSize.charAt(0), 10) * parseInt(gridSize.charAt(2))).fill(""),

                }).then(alert("Screen added successfully!"));;
            } else (alert("Screen name already exists!"));

            reset();
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
            alert("Screen deleted.");

        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    const reset = () => {
        setSname("");
        setGridSize("");
    };

    useEffect(() => {
        listScreens();
    }, []);

    return (
        <div className="CreateScreens">
            <Header text={headervalue} />
            <div className="screens__container">
                <div className="screenContainerLeft">
                    <input id="sUserInput" type="text" className="form-control rounded w-25" value={sname} maxLength={12} onChange={(e) => setSname(e.target.value)} placeholder="Screen Name" />
                    <select id="sUserInput" className="form-control rounded w-25" name="screen2" value={gridSize} onChange={e => setGridSize(e.target.value)}>
                        <option>Select Grid Size</option>
                        <option value="2*2">2*2</option>
                        <option value="2*3">2*3</option>
                        <option value="3*4">3*4</option>
                        <option value="3*5">3*5</option>
                        <option value="4*4">4*4</option>
                        <option value="4*5">4*5</option>
                        <option value="4*6">4*6</option>
                    </select>
                    <button id="sUserInput" className="btn btn-success w-15" onClick={() => addScreens(sname.replaceAll(/\s/g, ''), gridSize)}>
                        Add Screen
                    </button>
                </div>
                <div className="screenContainerRight">
                    <input type="search" className="form-control rounded" value={screenSearch} onChange={(e) => setScreenSearch(e.target.value)} placeholder="Search..." />
                </div>
            </div>
            <div className="list-screen">
                <table className="table mt-0 text-center">
                    <thead id="listScreen">
                        <tr>
                            <th>Screen's Name</th>
                            <th>Grid Size</th>
                            <th>Preview Screen</th>
                            <th>Edit Screen</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {screens.filter(button => button.sname.toLowerCase().includes(`${screenSearch}`.toLowerCase())).map((val, id) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{val.sname}</td>
                                    <td>{val.gridSize}</td>
                                    <td><PreviewScreen val={val} /></td>
                                    <td><EditScreenGrid val={val} /></td>
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
                                                    <p class="text-decoration-none">Do you really want to delete Screen: <b>{val.sname}</b>? <br /><i class="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>Screen might be assigned to User!</p>
                                                </div>
                                                <div class="modal-footer justify-content-center">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                    <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => deleteScreen(val.sname)}>Delete</button>
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
    );
}
export default CreateScreens;