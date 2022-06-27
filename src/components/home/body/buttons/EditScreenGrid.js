import React, { Fragment, useState, useEffect } from "react";
import { updateDoc, doc, onSnapshot, collection, FieldValue, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../../login/firebase";
import { Grid, Paper } from "@material-ui/core";
import useSpeechSynthesis from "react-speech-kit/dist/useSpeechSynthesis";
import "./EditScreenGrid.css"

const EditScreenGrid = ({ val }) => {

    const [details, setDetails] = useState(val);
    const [buttons, setButtons] = useState([]);
    var arr = [];
    var arr_img = [];
    var arr_color = [];
    const [screens, setScreens] = useState([]);
    const { speak } = useSpeechSynthesis();

    const fetchButtons = async () => {
        onSnapshot(collection(db, "buttons"), (snapshot) => {
            setButtons(snapshot.docs.map(doc => doc.data()));
        });
        

    };

    const fetchScreens = async () => {
        onSnapshot(collection(db, "screens"), (snapshot) => {
            setScreens(snapshot.docs.map(doc => doc.data()));
        });
    };
    const setarr = async (e, id, value) => {
        e.preventDefault()
        const scref = doc(db,"screens",val.sname);
        const scSnap = await getDoc(scref);
        for (var i = 0; i < scSnap.data().buttonsSelected.length; i++) {
            if (scSnap.data().buttonsSelected[i] != "") {
                arr[i]=scSnap.data().buttonsSelected[i];
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

    const updateScreen = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, "screens", val.sname), {
            screen1: details.screen1,
            screen2: details.screen2,
            screen3: details.screen3
        })
    }
    const uploadArray = async () => {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == undefined) {
                arr[i] = "";
            }
        }
        for (var i = 0; i < arr_img.length; i++) {
            if (arr_img[i] == undefined) {
                arr_img[i] = "";
            }
        }
        for (var i = 0; i < arr_color.length; i++) {
            if (arr_color[i] == undefined) {
                arr_color[i] = "";
            }
        }
        await updateDoc(doc(db, "screens", val.sname), {
            buttonsSelected: arr,
            buttonsImage: arr_img,
            buttonsColor :arr_color
        })
    }
    useEffect(() => {
        fetchButtons();
    }, []);

    return (
        <Fragment>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#${val.sname}`}>Edit</button>

            <div class="modal fade" id={`${val.sname}`}>
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Screen : {val.sname}</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <Grid container spacing={2}>
                                {val.buttons.map((button, id) => {
                                    return (
                                        <Grid item xs={`${12/val.c}`}>
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
export default EditScreenGrid;