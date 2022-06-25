import React, { Fragment, useState, useEffect } from "react";
import { updateDoc, doc, onSnapshot, collection, getDoc, query, where } from "firebase/firestore";
import { db } from "../../../login/firebase";
import { Grid, Paper } from "@material-ui/core";
import useSpeechSynthesis from "react-speech-kit/dist/useSpeechSynthesis";
import "./PreviewScreen.css"

const PreviewScreen = ({ val }) => {
    const preview = val.sname;

    const [details, setDetails] = useState(val);
    const [buttons, setButtons] = useState([]);
    const [screens, setScreens] = useState([]);
    const { speak } = useSpeechSynthesis();

    const fetchButtons = () => {
        onSnapshot(collection(db, "buttons"), (snapshot) => {
            setButtons(snapshot.docs.map(doc => doc.data()));
        });
    };

    const fetchScreens = () => {
        onSnapshot(collection(db, "screens"), (snapshot) => {
            setScreens(snapshot.docs.map(doc => doc.data()));
        });
    };

    const updateScreen = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, "screens", val.sname), {
            screen1: details.screen1,
            screen2: details.screen2,
            screen3: details.screen3
        })
    }

    const url = async (button) => {
        console.log(button);
        const q = query(collection(db, "buttons"), where("name", "==", button));
        const doc = await getDoc(q);
        console.log(doc.image_url);
        // return doc.image_url;
    }

    const func = (button) => {
        console.log("there");
        // console.log(buttons[0].image_url);
        // for(var i=0; i<buttons.lenght; i++){
        //     console.log("here");
        //     if(buttons[i].name==button){
        //         console(buttons[i].image_url);
        //         return buttons[i].image_url;
        //     }
        // }
    }

    useEffect(() => {
        fetchButtons();
        fetchScreens();
    }, []);

    return (
        <Fragment>
            <button type="button" class="btn btn-success" data-toggle="modal" data-target={`#${val.pname}`}>
                View
            </button>

            <div class="modal fade" id={`${val.pname}`}>
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Preview</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                            <Grid container spacing={2}>
                                {val.buttonsSelected.map((elem, id) => {
                                    return (
                                        <Grid item xs={`${12/val.c}`}>
                                            <Paper>
                                                <div className="cardbutton" style={{ backgroundColor: `${val.buttonsColor[id]}` }} onClick={() => speak({ text: elem })} >
                                                    <div id="container">
                                                        <img class="button-image" src={val.buttonsImage[id]} />
                                                    </div>
                                                    <h4 className="buttontext">{elem}</h4>
                                                </div>
                                            </Paper>
                                        </Grid>
                                    )
                                })}
                            </Grid>
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

export default PreviewScreen;