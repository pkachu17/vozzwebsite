import React from "react";

import Header from "../Header";
import "./AllUsers.css";

const AllUsers = () =>{
    const headervalue = 'All Users';
    return(
        <div className="AllUsers">
            <Header text={headervalue}/>
        </div>
    );
}
export default AllUsers;