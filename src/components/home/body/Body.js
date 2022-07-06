import React from "react";
import {Link, Routes, Route} from "react-router-dom";

import AllButtons from "./buttons/AllButtons";
import CreateButtons from "./buttons/CreateButtons";
import AllUsers from "./buttons/AllUsers";
import CreateUsers from "./buttons/CreateUsers";
import AllScreens from "./buttons/AllScreens";
import CreateScreens from "./buttons/CreateScreens";
import ButtonHistory from "./buttons/ButtonHistory";
import Settings from "./buttons/Settings";
import Information from "./buttons/Information";
import GetApk from "./buttons/GetApk";
import AboutUs from "./buttons/AboutUs";
import "./Body.css"

const Body=()=>{
    return(
        <div className="bodyContainer">
                <Routes>
                    <Route exact path="/" element={<AllButtons/>} />
                    <Route exact path="/AllButtons" element={<AllButtons/>} />
                    <Route exact path="/CreateButtons" element={<CreateButtons/>} />
                    <Route exact path="/AllUsers" element={<AllUsers/>} />
                    <Route exact path="/CreateUsers" element={<CreateUsers/>} />
                    <Route exact path="/AllScreens" element={<AllScreens/>} />
                    <Route exact path="/CreateScreens" element={<CreateScreens/>} />
                    <Route exact path="/ButtonHistory" element={<ButtonHistory/>} />
                    <Route exact path="/Settings" element={<Settings/>} />
                    <Route exact path="/Information" element={<Information/>} />
                    <Route exact path="/GetApk" element={<GetApk/>} />
                    <Route exact path="/AboutUs" element={<AboutUs/>} />
                </Routes>
        </div>
    );
}
export default Body;