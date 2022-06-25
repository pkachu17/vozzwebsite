import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../login/firebase";
import useSpeechSynthesis from "react-speech-kit/dist/useSpeechSynthesis";
import "./CardButton.css";
import CustomAlert from "./CustomAlert";

const CardButton = ({ val }) => {
    const { speak } = useSpeechSynthesis();

    const deleteButton = async(e) => {
        try {

            await deleteDoc(doc(db, "buttons", val.name)).then(alert("Button Deleted!"));
        } catch (e) {
            console.error("Error deleting button: ", e);
        }
    }
    return (
        <div className="cardbutton" style={{ backgroundColor: `${val.color}` }}>
            <div id="container">
                <img class="button-image" src={val.image_url} onClick={() => speak({ text: val.name })} />
            </div>
            <div className="card-bottom">
                <h4 className="buttontext">{val.name}</h4>
                <button type="button" id="button" class="btn btn-default btn-sm " onClick={(e) => deleteButton(e)}>
                Delete
                    {/* <span class="glyphicon glyphicon-trash"></span> <CustomAlert val={val}/> */}
                </button>
            </div>
        </div>
    );
}
export default CardButton;