import React from "react";
import Body from "./body/Body";
import Sidemenu from "./sidemenu/Sidemenu";

import "./Masterwindow.css";

const Masterwindow=()=>{
    return(
        <div className="masterwindow">
            <div className="masterleft">
                <Sidemenu/>
            </div>
            <div className="masterright">
                <Body/>
            </div>
        </div>
    );
}

export default Masterwindow;