import React, {Fragment, useState, useEffect} from "react";
import { updateDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../../../login/firebase";

const ViewScreens=({val})=>{

    const [details, setDetails] = useState(val);
    const [screens, setScreens] = useState([]);

    const fetchScreen=()=>{
        onSnapshot(collection(db, "screens"), (snapshot) => {
            setScreens(snapshot.docs.map(doc => doc.data()));
        });
    };

    const updateScreen=async(e)=>{
        e.preventDefault();
        await updateDoc(doc(db, "students", details.sid),{
            screen1:details.screen1,
            screen2:details.screen2,
            screen3:details.screen3
        })
    }
    useEffect(() => {
        fetchScreen();
    }, []);

    return(
        <Fragment>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${val.sid}`}>
            Edit
            </button>

            <div class="modal" id={`id${val.sid}`}>
            <div class="modal-dialog">
                <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Edit Screen</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">

                        <select className="form-control mt-1" name="screen1" value={details.screen1} onChange={e=>setDetails({...details, screen1:e.target.value})}>
                            <option selected value={null}>Select Screen-1</option>
                            {screens.map((val, id) => {
                                return <option key={id} value={val.sname}>{val.sname}</option>;
                            })}
                        </select>
                        <select className="form-control mt-1" name="screen2" value={details.screen2} onChange={e=>setDetails({...details, screen2:e.target.value})}>
                            <option selected value={null}>Select Screen-2</option>
                            {screens.map((val, id) => {
                                return <option key={id} value={val.sname}>{val.sname}</option>;
                            })}
                        </select>
                        <select className="form-control mt-1" name="screen3" value={details.screen3} onChange={e=>setDetails({...details, screen3:e.target.value})}>
                            <option selected value={null}>Select Screen-3</option>
                            {screens.map((val, id) => {
                                return <option key={id} value={val.sname}>{val.sname}</option>;
                            })}
                        </select>
                    {/* <input type="text" className="form-control mt-1" placeholder="Screen 1" value={details.screen1} onChange={e=>setDetails({...details, screen1:e.target.value})}/>
                    <input type="text" className="form-control mt-1" placeholder="Screen 2" value={details.screen2} onChange={e=>setDetails({...details, screen2:e.target.value})}/>
                    <input type="text" className="form-control mt-1" placeholder="Screen 3" value={details.screen3} onChange={e=>setDetails({...details, screen3:e.target.value})}/> */}
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-dismiss="modal" onClick={e=>updateScreen(e)}>Save</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default EditStudentScreens;