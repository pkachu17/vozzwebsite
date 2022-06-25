import React from 'react';
import { Link } from 'react-router-dom';
import "./Sidemenu.css";

const Sidemenu=()=>{

    return (
        <div className="sidemenu">
            <div className="sidemenumid">
                <ul>
                    <Link to="AllButtons"><button id='sidebuttons' type='text'>All Buttons</button></Link>
                    <Link to="CreateButtons"><button id='sidebuttons' type='text'>Create Buttons</button></Link>
                    {/* <Link to="AllUsers"><button id='sidebuttons' type='text'>All Users</button></Link> */}
                    <Link to="CreateUsers"><button id='sidebuttons' type='text'>Create User</button></Link>
                    {/* <Link to="AllScreens"><button id='sidebuttons' type='text'>All Screens</button></Link> */}
                    <Link to="CreateScreens"><button id='sidebuttons' type='text'>Create Screen</button></Link>
                    {/* <Link to="Settings"><button id='sidebuttons' type='text'>Settings</button></Link> */}
                    <Link to="Information"><button id='sidebuttons' type='text'>Information</button></Link>
                    <Link to="AboutUs"><button id='sidebuttons' type='text'>About Us</button></Link>

                </ul>
            </div>
        </div>
    );
}

export default Sidemenu;