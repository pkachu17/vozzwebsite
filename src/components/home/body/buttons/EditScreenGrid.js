// Import required dependencies for react, react components, firebase, images and style sheet
import React, { Fragment, useState, useEffect } from "react";
import { updateDoc, doc, onSnapshot, collection, getDoc } from "firebase/firestore";
import { Grid, Paper } from "@material-ui/core";
import { db } from "../../../login/firebase";
import "./EditScreenGrid.css"

// EditScreenGrid as react component
const EditScreenGrid = ({ val }) => {
    // useState hooks/variables for storing Screen Grid data
    const [buttons, setButtons] = useState([]);
    var arr = [];
    var arr_img = [];
    var arr_color = [];

    // fetchButtons function fetches previously created buttons from firebase db
    const fetchButtons = async () => {
        onSnapshot(collection(db, "buttons"), (snapshot) => {
            setButtons(snapshot.docs.map(doc => doc.data()));
        });
    };

    // setarr function to store and upload screen grid with button data/ID 
    const setarr = async (e, id, value) => {
        e.preventDefault()
        const scref = doc(db, "screens", val.sname);
        const scSnap = await getDoc(scref);
        for (var i = 0; i < scSnap.data().buttonsSelected.length; i++) {
            if (scSnap.data().buttonsSelected[i] !== "") {
                arr[i] = scSnap.data().buttonsSelected[i];
                arr_img[i] = scSnap.data().buttonsImage[i];
                arr_color[i] = scSnap.data().buttonsColor[i];
            }
        }
        arr[id] = value
        console.log(arr)

        const docRef = doc(db, "buttons", value);
        const docSnap = await getDoc(docRef);
        arr_img[id] = docSnap.data().image_url;
        arr_color[id] = docSnap.data().color;
    }

    // Upload buttons wrt screen grid format
    const uploadArray = async () => {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                arr[i] = "";
            }
        }
        for (i = 0; i < arr_img.length; i++) {
            if (arr_img[i] === undefined) {
                arr_img[i] = "";
            }
        }
        for (i = 0; i < arr_color.length; i++) {
            if (arr_color[i] === undefined) {
                arr_color[i] = "";
            }
        }
        // while updating a screen with buttons
        await updateDoc(doc(db, "screens", val.sname), {
            buttonsSelected: arr,
            buttonsImage: arr_img,
            buttonsColor: arr_color
        })
    }

    //useEffect run fetchButtons() when EditScreenGrid is loaded in web browser
    useEffect(() => {
        fetchButtons();
    });

    return (
        <Fragment>
        {/* Edit Screen Modal */}
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#${val.sname}`}><i class="far fa-edit" style={{ color: 'white' }}></i></button>

            <div class="modal fade" id={`${val.sname}`}>
                <div class="modal-dialog modal-xl">
                {/* Modal Body */}
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Screen : {val.sname}</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <Grid container spacing={2}>
                                {val.buttons.map((button, id) => {
                                    return (
                                        <Grid item xs={`${12 / val.c}`}>
                                            <Paper>
                                                <select className="form-control mt-1" name={button[id]} value={arr[id]} onChange={e => setarr(e, id, e.target.value)}>
                                                    <option selected value={" "}>Select Button</option>
                                                    {buttons.map((pos, id) => {
                                                        return <option key={id} value={pos.name}>{pos.name}</option>;
                                                    })}
                                                </select>
                                            </Paper>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </div>
                        {/* Modal footer */}
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" data-dismiss="modal" onClick={e => uploadArray()}>Save</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
// export EditScreenGrid as react component
export default EditScreenGrid;