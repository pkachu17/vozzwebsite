import React, { Fragment, useState, useEffect } from "react";
import { updateDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../../../login/firebase";
import Select from 'react-select';
import "./EditStudentScreens.css"

const EditStudentScreens = ({ val }) => {

    const [details, setDetails] = useState(val);
    const [screens, setScreens] = useState([]);
    const [screenFilter1, setScreenFilter1] = useState("");
    const [screenFilter2, setScreenFilter2] = useState("");
    const [screenFilter3, setScreenFilter3] = useState("");



    const fetchScreens = () => {
        onSnapshot(collection(db, "screens"), (snapshot) => {
            setScreens(snapshot.docs.map(doc => doc.data()));
        });
    };

    const updateScreen = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, "students", details.sid), {
            screen1: details.screen1,
            screen2: details.screen2,
            screen3: details.screen3
        })
    }
    useEffect(() => {
        fetchScreens();
    }, []);

    return (
        <Fragment>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${val.sid}`}>
                <i class="far fa-edit" style={{color: 'white'}}></i>
            </button>

            <div class="modal" id={`id${val.sid}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Edit Screen for : {val.sname}</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                            <div id="screenOptions">
                                <input type="search" className="form-control rounded w-25" value={screenFilter1} onChange={(e) => setScreenFilter1(e.target.value)} placeholder="Search..." />
                                <select className="form-control mt-1" name="screen1" value={details.screen1} onChange={e => setDetails({ ...details, screen1: e.target.value })}>
                                    <option selected value={null}>Select Screen-1</option>
                                    {screens.filter(screen1 => screen1.sname.includes(`${screenFilter1}`)).map((val, id) => {
                                        return <option key={id} value={val.sname}>{val.sname}</option>;
                                    })}
                                </select>
                            </div>
                            <div id="screenOptions">
                                <input type="search" className="form-control rounded w-25" value={screenFilter2} onChange={(e) => setScreenFilter2(e.target.value)} placeholder="Search..." />
                                <select className="form-control mt-1" name="screen2" value={details.screen2} onChange={e => setDetails({ ...details, screen2: e.target.value })}>
                                    <option selected value={null}>Select Screen-2</option>
                                    {screens.filter(screen2 => screen2.sname.includes(`${screenFilter2}`)).map((val, id) => {
                                        return <option key={id} value={val.sname}>{val.sname}</option>;
                                    })}
                                </select>
                            </div>
                            <div id="screenOptions">
                                <input type="text" className="form-control rounded w-25" value={screenFilter3} onChange={(e) => setScreenFilter3(e.target.value)} placeholder="Search..." />
                                <select className="form-control mt-1" name="screen3" value={details.screen3} onChange={e => setDetails({ ...details, screen3: e.target.value })}>
                                    <option selected value={null}>Select Screen-3</option>
                                    {screens.filter(screen3 => screen3.sname.includes(`${screenFilter3}`)).map((val, id) => {
                                        return <option key={id} value={val.sname}>{val.sname}</option>;
                                    })}
                                </select>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" data-dismiss="modal" onClick={e => updateScreen(e)}>Save</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditStudentScreens;