// Import required dependencies for react, react components, firebase, images and style sheet

import React, { Fragment, useState, useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { onSnapshot, getFirestore, collection } from "firebase/firestore";
import { app } from "../../../login/firebase";
import CardButton from "./CardButton";
import Header from "../Header";
import "./AllButtons.css";

//Custom style for the buttons in the All Buttons page
//Contains width, height, alignments and background
const useStyles = makeStyles((theme) => ({
    grid: {
        width: '100%',
        margin: '0px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background: theme.palette.text.secondary,
        backgroundSize: 'contain',
    },
    Media: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    }
}));

//AllButtons is a react component
const AllButtons = () => {
    const [filter, setFilter] = useState("");
    const headervalue = 'All Buttons'; //Header
    const db = getFirestore(app);       //firebase db initialization
    const [buttons, setButtons] = useState([]);

    //Below function fetchs all buttons previously created from firebase
    const listButtons = async () => {
        onSnapshot(collection(db, "buttons"), (snapshot) => {
            setButtons(snapshot.docs.map(doc => doc.data()));
            console.log(snapshot.docs.map(doc => doc.data()))
        });
    }

    //useEffect runs the mentioned functions when page is loaded in a web browser 
    useEffect(() => {
        listButtons();
    });
    const classes = useStyles()
    return (
        <Fragment>
            <div className="AllButtons">
                {/* Header */}
                <Header text={headervalue} />
                {/* All Buttons search field */}
                <div className="allButtonSearch"><input type="search" className="form-control rounded w-25" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search..." /></div>
                {/* List of all previoulsy created Buttons */}
                <div className="AllButtons-area">
                    {/* Buttons listed in react grid layout format */}
                    <Grid container spacing={1} className={classes.grid}>
                        {buttons.filter(button => button.name.toLowerCase().includes(`${filter}`.toLowerCase())).map((val, id) => {
                            return (<Grid item xs={6} md={3}>
                                <CardButton val={val} />
                            </Grid>
                            );
                        })}
                    </Grid>
                </div>
            </div>
        </Fragment>
    );
}
export default AllButtons; //exporting the react component