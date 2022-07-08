// Import required dependencies for react, react components, firebase, images and style sheet
import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Header from "../Header";
import { onSnapshot } from "firebase/firestore";
import { app } from "../../../login/firebase";
import { getFirestore, collection } from "firebase/firestore";
import "./AllButtons.css";
import { makeStyles, Grid} from "@material-ui/core";
import useSpeechSynthesis from "react-speech-kit/dist/useSpeechSynthesis";
import CardButton from "./CardButton";

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
    const { speak } = useSpeechSynthesis();
    const [filter, setFilter] = useState("");

    const headervalue = 'All Buttons';
    const db = getFirestore(app);
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
    }, []);
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
//exporting the react component
export default AllButtons;