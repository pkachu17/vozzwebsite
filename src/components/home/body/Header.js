// Import required dependencies for react, react components, firebase, images and style sheet
import React from "react";
import "./Header.css";

// Header as a react component
const Header = (header_name) =>{
    return(
        // Header
        <div className="Header">
         {/* Header Text */}
            <h3>{header_name.text}</h3>
        </div>
    );
}
// Export Header as a react component
export default Header;