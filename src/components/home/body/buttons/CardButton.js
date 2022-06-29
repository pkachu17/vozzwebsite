import React from "react";
import { doc, deleteDoc, getDocs, query, collection } from "firebase/firestore";
import { db } from "../../../login/firebase";
import useSpeechSynthesis from "react-speech-kit/dist/useSpeechSynthesis";
import "./CardButton.css";
import CustomAlert from "./CustomAlert";


const CardButton = ({ val }) => {
    const { speak } = useSpeechSynthesis();

    const deleteButton = async (val) => {
        try {
            const docRef = query(collection(db, 'screens'));
            const document = await getDocs(docRef);
            var flag = 0;
            for (var i = 0; i < document.docs.length; i++) {
                for (var j = 0; j < document.docs[i].data().buttonsSelected.length; j++) {
                    if (val.name == document.docs[i].data().buttonsSelected[j]) {
                        flag = 2;
                    }
                }
            }
            if (flag == 2) {
                alert("Button is currently being used in Screen!");
            } else {
                await deleteDoc(doc(db, "buttons", val.name)).then(alert("Button Deleted!"));
            }
        } catch (err) {
            console.error("Error deleting button: ", err);
        }
    }

    return (
        <div className="cardbutton" style={{ backgroundColor: `${val.color}` }}>
            <div id="container">
                <img class="button-image" src={val.image_url} onClick={() => speak({ text: val.name })} />
            </div>
            <div className="card-bottom">
                <h4 className="buttontext">{val.name}</h4>

                <i class="fas fa-trash-alt" style={{ color: '#f54747', paddingRight: "10px" }} data-toggle="modal" data-target={`#id${val.name}`}></i>

                <div class="modal fade" id={`id${val.name}`}>
                    <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header flex-column md-center">
                                <div class="icon-box">
                                    <i class="material-icons">&#xE5CD;</i>
                                </div>
                                <h4 class="modal-title w-100">Are you sure?</h4>
                                {/* <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> */}
                            </div>
                            <div class="modal-body">
                                <p class="text-decoration-none">Do you really want to delete button: <b>{val.name}</b>? This process cannot be undone.</p>
                            </div>
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
export default CardButton;