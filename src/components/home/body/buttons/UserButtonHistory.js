// Import required dependencies for react, react components, firebase, images and style sheet
import React, { Fragment, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../login/firebase";
import "./UserButtonHistory.css"

// UserButtonHistory as react component
const UserButtonHistory = ({ val }) => {
    // UseState hook variables for storing Button History data
    const [buttonName, setbuttonName] = useState([]);
    const [buttonCount, setbuttonCount] = useState([]);
    var arr = [];
    var arr_count = [];

    // setarr function fetches data from analytics in firebace db
    const setarr = async () => {
        const scref = await doc(db, "analytics", val.sid);
        const scSnap = await getDoc(scref);
        if (scSnap.data() !== undefined) {
            for (var i = 0; i < scSnap.data().Buttons.length; i++) {
                if (scSnap.data().Count[i] !== "") {
                    arr[i] = scSnap.data().Buttons[i];
                    arr_count[i] = scSnap.data().Count[i];
                }
            }
            // store in variable
            setbuttonName(arr);
            setbuttonCount(arr_count);
        }
    }

    // useEffect hook runs setarr function when UserButtonHistory is loaded in web browser
    useEffect(() => {
        setarr();
    });
    return (
        <Fragment>
            {/* Modal Button */}
            <button type="button" class="btn btn-success" data-toggle="modal" data-target={`#id${val.sid}`}>
                <i class="far fa-eye" style={{ color: 'white' }}></i>
            </button>
            {/* Modal */}
            <div class="modal fade" id={`id${val.sid}`}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Button Statistics</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        {/* Modal Body */}
                        <div id="statModalBody" class="modal-body">
                            <table class="table mt-0 text-center">
                            {/* Header */}
                                <thead id="statModalTable">
                                    <tr>
                                        <th>Button Name</th>
                                        <th>Count</th>
                                    </tr>
                                </thead>
                                {/* Data rows */}
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
                        {/* Modal Footer */}
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
// export UserButtonHistory as react component
export default UserButtonHistory;