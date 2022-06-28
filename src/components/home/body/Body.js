import React from "react";
import {Link, Routes, Route} from "react-router-dom";

import AllButtons from "./buttons/AllButtons";
import CreateButtons from "./buttons/CreateButtons";
import AllUsers from "./buttons/AllUsers";
import CreateUsers from "./buttons/CreateUsers";
import AllScreens from "./buttons/AllScreens";
import CreateScreens from "./buttons/CreateScreens";
import Settings from "./buttons/Settings";
import Information from "./buttons/Information";

import "./Body.css"
import AboutUs from "./buttons/AboutUs";

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
                    <Route exact path="/Settings" element={<Settings/>} />
                    <Route exact path="/Information" element={<Information/>} />
                    <Route exact path="/AboutUs" element={<AboutUs/>} />

                </Routes>
        </div>
    );
}
export default Body;