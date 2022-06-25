import React from "react";
import "./Header.css";

const Header = (header_name) =>{
    return(
        <div className="Header">
            <h3>{header_name.text}</h3>
        </div>
    );
}
export default Header;