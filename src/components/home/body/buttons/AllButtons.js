import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Header from "../Header";
import { onSnapshot } from "firebase/firestore";
import { app } from "../../../login/firebase";
import { getFirestore, collection } from "firebase/firestore";
import "./AllButtons.css";
import { makeStyles, Grid, Paper } from "@material-ui/core";
// import KebabMenu from "./kebab-menu";
import useSpeechSynthesis from "react-speech-kit/dist/useSpeechSynthesis";
import { blue } from "@material-ui/core/colors";
import CardButton from "./CardButton";

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

const AllButtons = () => {
    const { speak } = useSpeechSynthesis();
    const [filter, setFilter] = useState("");

    const headervalue = 'All Buttons';
    const db = getFirestore(app);
    const [buttons, setButtons] = useState([]);

    const listButtons = async () => {

        onSnapshot(collection(db, "buttons"), (snapshot) => {
            setButtons(snapshot.docs.map(doc => doc.data()));
            console.log(snapshot.docs.map(doc => doc.data()))
        });
    }

    useEffect(() => {
        listButtons();
    }, []);
    const classes = useStyles()
    return (
        <Fragment>
            <div className="AllButtons">
                <Header text={headervalue} />
                <div className="AllButtons-area">
                    <input type="search" className="form-control rounded w-25" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search..." />
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
export default AllButtons;