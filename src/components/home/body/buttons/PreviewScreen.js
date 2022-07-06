// Import required dependencies for react, react components, firebase, images and style sheet
import React, { Fragment } from "react";
import { Grid, Paper } from "@material-ui/core";
import useSpeechSynthesis from "react-speech-kit/dist/useSpeechSynthesis";
import "./PreviewScreen.css"

// PreviewScreen as react component
const PreviewScreen = ({ val }) => {
    // react speech synthesizer
    const { speak } = useSpeechSynthesis();

    return (
        <Fragment>
        {/* Modal Button */}
            <button type="button" class="btn btn-success" data-toggle="modal" data-target={`#${val.pname}`}>
                <i class="far fa-eye" style={{ color: 'white' }}></i>
            </button>

            <div class="modal fade" id={`${val.pname}`}>
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        {/* Modal Header */}
                        <div class="modal-header">
                            <h4 class="modal-title">Preview : {val.sname}</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        {/* Modal Body */}
                        <div class="modal-body">
                            <Grid container spacing={2}>
                                {val.buttonsSelected.map((elem, id) => {
                                    return (
                                        <Grid item xs={`${12 / val.c}`}>
                                            <Paper>
                                                <div className="cardbutton" style={{ backgroundColor: `${val.buttonsColor[id]}` }} onClick={() => speak({ text: elem })} >
                                                    <div id="container">
                                                        <img class="button-image" src={val.buttonsImage[id]} alt="" />
                                                    </div>
                                                    <h4 className="buttontext">{elem}</h4>
                                                </div>
                                            </Paper>
                                        </Grid>
                                    )
                                })}
                            </Grid>
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

export default PreviewScreen;