// Import required dependencies for react, react components, firebase, images and style sheet
import React from "react";
import { db } from "../../../login/firebase";
import { doc, deleteDoc, getDocs, query, collection } from "firebase/firestore";
import useSpeechSynthesis from "react-speech-kit/dist/useSpeechSynthesis";
import EditButton from "./EditButton";
import "./CardButton.css";

//CardButton react component
const CardButton = ({ val }) => {
    const { speak } = useSpeechSynthesis(); // react speech synthesizer for Button Label

    // deleteButton function provides functionality for deleting a button from firebase based on button label/name
    //Buttons can't be deleted if the y are in use in some screen ie. assigned button
    const deleteButton = async (val) => {
        try {
            const docRef = query(collection(db, 'screens'));
            const document = await getDocs(docRef);
            var flag = 0;
            for (var i = 0; i < document.docs.length; i++) {
                for (var j = 0; j < document.docs[i].data().buttonsSelected.length; j++) {
                    if (val.name === document.docs[i].data().buttonsSelected[j]) {
                        flag = 2;
                    }
                }
            }
            if (flag === 2) {
                alert("Button is currently being used in Screen!");
            } else {
                await deleteDoc(doc(db, "buttons", val.name)).then(alert("Button Deleted!"));
            }
        } catch (err) {
            console.error("Error deleting button: ", err);
        }
    }

    return (
        // buttons as a card
        <div className="cardbutton" style={{ backgroundColor: `${val.color}` }}>
        {/* Button Image */}
            <div id="container">
                <img class="button-image" src={val.image_url} onClick={() => speak({ text: val.name })} alt="" />
            </div>
            {/* Edit and Delete options present at bottom of a button card */}
            <div className="card-bottom">
                <h4 className="buttontext">{val.name}</h4>
                <EditButton val={val} />
                {/* Edit Button as a Modal */}
                <i class="fas fa-trash-alt" style={{ color: '#f54747', paddingRight: "10px" }} data-toggle="modal" data-target={`#id${val.name}`}></i>

                <div class="modal fade" id={`id${val.name}`}>
                    {/* Modal Body */}
                    <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header flex-column md-center">
                                <div class="icon-box">
                                    <i class="material-icons">&#xE5CD;</i>
                                </div>
                                <h4 class="modal-title w-100">Are you sure?</h4>
                            </div>
                            <div class="modal-body">
                                <p class="text-decoration-none">Do you really want to delete button: <b>{val.name}</b>? This process cannot be undone.</p>
                            </div>
                            {/* Modal Footer */}
                            <div class="modal-footer justify-content-center">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => deleteButton(val)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
// export CardButton as a react component
export default CardButton; 