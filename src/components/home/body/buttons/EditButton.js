// Import required dependencies for react, react components, firebase, images and style sheet
import React, { Fragment, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { UpdateButton, auth, storage } from "../../../login/firebase";
import { useNavigate } from "react-router-dom"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useSpeechSynthesis from "react-speech-kit/dist/useSpeechSynthesis";
import "./EditButton.css"

// EditButton react component
const EditButton = ({ val }) => {
    // UseState hooks / variables for storing button data during edit
    const [user, loading] = useAuthState(auth);
    // const [name, setName] = useState("");
    const navigate = useNavigate();
    const [url, setUrl] = useState(val.image_url);
    const value = val.name;
    const [color, setColor] = useState(val.color);
    // react speech synthesizer
    const { speak } = useSpeechSynthesis();

    const [file, setFile] = useState("");

    //progress
    const [percent, setPercent] = useState(0);

    //handle file upload event and status update
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    //handle file upload event and status update
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }

        const storageRef = ref(storage, `/files/${file.name}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                if (percent) {
                    setPercent(percent);
                } else {
                    setPercent(0);
                }

            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    setUrl(url);

                });
            }
        );
    };

    // Check if user is logged in
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
    });

    return (
        <Fragment>
            <i class="far fa-edit" style={{ color: 'yellow' }} data-toggle="modal" data-target={`#id${val.name + "pre"}`}></i>
            <div class="modal fade" id={`id${val.name + "pre"}`}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Button</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div className="CreateButtons">
                                <div className="CreateButtons-area">
                                    <div className="CreateButtons-preview-area">
                                        <div className="preview-container">
                                            <div className="preview-container-top">
                                                <img id="preview-image" src={url} alt="" />
                                            </div>
                                            <div className="preview-container-bottom">
                                                <input type="file" class="form-control" id="customFile" onChange={handleChange} accept=".jpeg,.jpg,.png" />
                                                <button class="form-control" onClick={handleUpload}>&#128228; Upload  {percent}%</button>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="CreateButtons-selection-area">
                                        <div className="edit-selection-menu">
                                            <button className='menu-btn' onClick={() => speak({ text: value })}>play</button>
                                            <div className="color-picker">
                                                Select Button color
                                                <input type="color" onChange={(event) => setColor(event.target.value)}></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" onClick={() => UpdateButton(value, url, color)} data-dismiss="modal">Update</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}
// export EditButtons as react component
export default EditButton;