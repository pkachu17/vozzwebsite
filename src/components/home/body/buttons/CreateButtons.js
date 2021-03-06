// Import required dependencies for react, react components, firebase, images and style sheet
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { AddButtons, auth, db, logout } from "../../../login/firebase";
import { query, collection, getDocs, where, Firestore } from "firebase/firestore";
import { storage } from "../../../login/firebase";
import useSpeechSynthesis from "react-speech-kit/dist/useSpeechSynthesis";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// CreateButtons react components
import Header from "../Header";
import "./CreateButtons.css";

const CreateButtons = () => {
    //header value
    const headervalue = 'Create Buttons';
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    //UseState hooks for dynamically storing button values
    const [url, setUrl] = useState("");
    const [value, setValue] = useState('');
    const [color, setColor] = useState("");
    //React speech synthesizer
    const { speak } = useSpeechSynthesis();

    const [buttonValues, setButtonValues] = useState([]);

    const [file, setFile] = useState("");

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();

            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    //progress
    const [percent, setPercent] = useState(0);

    //handle file upload event and status update
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please select an image first!");
            return;
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
    //reset function resets/brings all the useState hooks to initial empty value
    const reset = () => {
        setName("");
        setValue('');
        setColor("");
        setFile("");
        setUrl("");
        setPercent(0);
        document.getElementById("customFile").value = "";
        document.getElementById("colorPicker").value = "";
    };

    //useEffect Hook checks if the user is logged in
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");

        fetchUserName();
    }, [user, loading]);

    return (
        <div className="CreateButtons">
        {/* Header */}
            <Header text={headervalue} />
            <div className="CreateButtons-area">
                <div className="CreateButtons-preview-area">
                    {/* Button priew area */}
                    <div className="preview-container">
                        <div className="preview-container-top">
                            <img id="preview-image" src={url} onClick={() => speak({ text: value })} />
                        </div>
                        {/* file selector */}
                        <div className="preview-container-bottom">
                            <input type="file" class="form-control" id="customFile" onChange={handleChange} accept=".jpeg,.jpg,.png" />
                            <button class="form-control" onClick={handleUpload}>&#128228; Upload  {percent}%</button>
                        </div>
                    </div>

                </div>
                <div className="CreateButtons-selection-area">
                    {/* Buttons properties */}
                    <div className="selection-menu">
                        <textarea class="form-control" placeholder="Enter Button Name (required)" value={value} maxLength={12} onChange={(event) => setValue(event.target.value)} required="required" />
                        <button type="button" class="btn btn-light" data-mdb-ripple-color="dark" onClick={() => speak({ text: value })}>Play</button>
                        <div className="color-picker">
                            Select Button color
                            <input type="color" id="colorPicker" onClick={(event) => setColor(event.target.value)}></input>
                        </div>
                        {/* Button reset and upload options */}
                        <div className="submission">
                            <button type="button" class="btn btn-light" data-mdb-ripple-color="dark" onClick={() => reset()}>Reset</button>
                            <button type="button" class="btn btn-light" data-mdb-ripple-color="dark" onClick={() => AddButtons(value.replaceAll(/\s/g, ''), url, color).then(reset())}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
//export the CreateButtons react component
export default CreateButtons;