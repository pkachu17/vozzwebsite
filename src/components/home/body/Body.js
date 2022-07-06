// Import required dependencies for react, react components, firebase, images and style sheet
import React from "react";
import {Routes, Route} from "react-router-dom";
import AllButtons from "./buttons/AllButtons";
import CreateButtons from "./buttons/CreateButtons";
import CreateUsers from "./buttons/CreateUsers";
import CreateScreens from "./buttons/CreateScreens";
import Information from "./buttons/Information";
import AboutUs from "./buttons/AboutUs";
import ButtonHistory from "./buttons/ButtonHistory";
import GetApk from "./buttons/GetApk";
import "./Body.css"

// Body as react component
const Body=()=>{
    return(
        // Body
        <div className="bodyContainer">
        {/* All routes/pages*/}
                <Routes>
                    <Route exact path="/" element={<AllButtons/>} />
                    <Route exact path="/AllButtons" element={<AllButtons/>} />
                    <Route exact path="/CreateButtons" element={<CreateButtons/>} />
                    <Route exact path="/CreateUsers" element={<CreateUsers/>} />
                    <Route exact path="/CreateScreens" element={<CreateScreens/>} />
                    <Route exact path="/ButtonHistory" element={<ButtonHistory/>} />
                    <Route exact path="/Information" element={<Information/>} />
                    <Route exact path="/GetApk" element={<GetApk/>} />
                    <Route exact path="/AboutUs" element={<AboutUs/>} />
                </Routes>
        </div>
    );
}
//export Body as a react component
export default Body;