import React, { Fragment, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../login/firebase";
import "./UserButtonHistory.css"

const UserButtonHistory = ({ val }) => {
    const [buttonName, setbuttonName] = useState([]);
    const [buttonCount, setbuttonCount] = useState([]);
    var arr = [];
    var arr_count = [];
    const setarr = async () => {
        const scref = await doc(db,"analytics",val.sid);
        const scSnap = await getDoc(scref);
        if (scSnap.data() !== undefined){
            for (var i = 0; i < scSnap.data().Buttons.length; i++) {
                if (scSnap.data().Count[i] != "") {
                    arr[i]=scSnap.data().Buttons[i];
                    arr_count[i] = scSnap.data().Count[i];
                }
            }
            setbuttonName(arr);
            setbuttonCount(arr_count);
        }
        console.log(scSnap.data());
        console.log({scSnap});
    }
    useEffect(() => {
        setarr();
    }, []);
    return (
        <Fragment>
            <button type="button" class="btn btn-success" data-toggle="modal" data-target={`#id${val.sid}`}>
                <i class="far fa-eye" style={{color: 'white'}}></i>
            </button>
            <div class="modal fade" id={`id${val.sid}`}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Button Statistics</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div id="statModalBody" class="modal-body">
                        <table class="table mt-0 text-center">
                        <thead id="statModalTable">
                            <tr>
                                <th>Button Name</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        {buttonName.map((pos, id) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{pos}</td>
                                    <td>{buttonCount[id]}</td>
                                </tr>
                            </tbody>
                        );
                        })}
                        </table>
                        </div>
                        <div class="modal-footer">
                            {/* <button type="button" class="btn btn-success" data-dismiss="modal" onClick={e => updateScreen(e)}>Save</button> */}
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default UserButtonHistory;