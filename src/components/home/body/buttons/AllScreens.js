import React from "react";

import Header from "../Header";
import "./AllScreens.css";

const AllScreens = () =>{
    const headervalue = 'All Screens';
    return(
        <div className="AllScreens">
            <Header text={headervalue}/>
        </div>
    );
}
export default AllScreens;