import React from "react";

import Header from "../Header";
import "./Settings.css";

const Settings = () =>{
    const headervalue = 'Settings';
    return(
        <div className="Settings">
            <Header text={headervalue}/>
        </div>
    );
}
export default Settings;