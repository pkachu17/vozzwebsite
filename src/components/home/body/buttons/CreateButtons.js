import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { AddButtons, auth, db, logout } from "../../../login/firebase";
import { query, collection, getDocs, where, Firestore } from "firebase/firestore";
import { storage } from "../../../login/firebase";
import useSpeechSynthesis from "react-speech-kit/dist/useSpeechSynthesis";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


import Header from "../Header";
import "./CreateButtons.css";

const CreateButtons = () => {
    const headervalue = 'Create Buttons';
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [value, setValue] = useState('');
    const [color, setColor] = useState("");
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

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");

        fetchUserName();
    }, [user, loading]);

    return (
        <div className="CreateButtons">
            <Header text={headervalue} />
            <div className="CreateButtons-area">
                <div className="CreateButtons-preview-area">
                    <div className="preview-container">
                        <div className="preview-container-top">
                            <img id="preview-image" src={url} onClick={() => speak({ text: value })} />
                        </div>
                        <div className="preview-container-bottom">
                            <input type="file" class="form-control" id="customFile" onChange={handleChange} accept=".jpeg,.jpg,.png" />
                            <button class="form-control" onClick={handleUpload}>&#128228; Upload  {percent}%</button>
                        </div>
                    </div>

                </div>
                <div className="CreateButtons-selection-area">
                    <div className="selection-menu">
                        <textarea placeholder="Enter Text" value={value} onChange={(event) => setValue(event.target.value)} />
                        <button className='menu-btn' onClick={() => speak({ text: value })}>play</button>
                        <div className="color-picker">
                            Select Button color
                            <input type="color" id="colorPicker" onClick={(event) => setColor(event.target.value)}></input>
                        </div>
                        <div className="submission">
                            <button id="reset" className='menu-btn' type="button" onClick={() => reset()}>Reset</button>
                            <button className='menu-btn' type="button" onClick={() => AddButtons(value.replaceAll(/\s/g,''), url, color)}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CreateButtons;