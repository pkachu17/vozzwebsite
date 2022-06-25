import React from "react";
import Header from "../Header";
import "./Information.css";
import LoginPage from "../images/LoginPage.jpg";
import LoginWithGoogle from "../images/LoginWithGoogle.jpg";
import Register from "../images/Register.jpg";
import PwdReset from "../images/PwdReset.jpg";
import AllButtons from "../images/AllButtons.jpg";
import CreateButton from "../images/CreateButton.jpg";
import AllUsers from "../images/AllUsers.jpg";
import CreateUser from "../images/CreateUser.jpg";
import EditUser from "../images/EditUser.jpg";
import AllScreens from "../images/AllScreens.jpg";
import CreateScreen from "../images/CreateScreen.jpg";
import EditScreen from "../images/EditScreen.jpg";


const Information = () =>{
    const headervalue = 'Information about the Site';
    return(
        <div className="Information">
            <Header text={headervalue}/>
            <div className="Info-area">
                <p className="paragraph">On the Information page, you can view the information regarding the Vozz application. You can create Buttons, Users, Screens in this application. Manage the buttons, users, screens that are created for each child by adding, or by updating, or by deleting.</p><br/>
                <h4>Login Page</h4>
                <p className="paragraph">The first page of the application is Login page. Enter the email address and password to login. An option to login with Google is also provided.<br/></p>
                <img className ="imagecss" src ={LoginPage} alt="Login Page"/><br/>
                <img className ="imagecss" src ={LoginWithGoogle} alt="Login With Google"/> <br/>
                <h4>Registration Page</h4>
                <p className="paragraph">If you are registering for the first time, then click on "Register now", it will take you to registration page. Fill details like Full name, email address, and password to register to the site. There is an option to register through google as well.</p><br/>
                <img className ="imagecss" src ={Register} alt="Registration Page"/> <br/>
                <h4>Password Reset Page</h4>
                <p className="paragraph">If you forget the password then click on "Forgot Password", it will take you to a page that requests your mail address to send the password reset link. It will help you to reset your password </p><br/>
                <img className ="imagecss" src ={PwdReset} alt="Password Reset Page"/><br/>
                <h4>All Buttons Page</h4>
                <p className="paragraph"> The first page of the application is the All Buttons page. It displays the buttons that are already created and available for use. It will display all the buttons that are created by the therapist.</p><br/> 
                <img className ="imagecss" src ={AllButtons} alt="All Buttons Page"/><br/>
                <h4>Create Buttons Page</h4>
                <p className="paragraph"> The Create Buttons page gives you an access to create the new button. 
                <ul><li>Choose the image that you will use for the button.</li>
                <li>Upload the image.</li>
                <li>Enter the text for the button. On click of button, text will be converted to speech.</li>
                <li>Same can be done by clicking the "Play" button.</li>
                <li>You can choose the background color for the button.</li>
                <li>Click on "Submit" to create the button.</li>
                </ul></p><br/>
                <img className ="imagecss" src ={CreateButton} alt="Create Button Page"/> <br/>
                <h4>All Users Page</h4>
                <p className="paragraph"> The All Users page of the application contains all the users/children. It displays the users who already have access to the application.</p><br/>
                <img className ="imagecss" src ={AllUsers} alt="All Users Page"/> <br/>
                <h4>Create User Page</h4>
                <p className="paragraph">Create User page can be used to add users to the application.
                <ul>
                <li>Provide an "User Name" to the user.</li>
                <li>Provide an "User id" to the user.</li>
                <li>On click of the "Add User" button, the user is added to application. </li>
                <li>It will also display the users that are already added to application and provides an option to edit or delete the user from database. </li></ul> </p><br/>
                <img className ="imagecss" src ={CreateUser}/> <br/>
                <h4>Edit User Page</h4>
                <p className="paragraph">The Edit User page will give you an access to customize the screens to particular user.</p><br/>
                <img className ="imagecss" src ={EditUser} alt="Edit Users Page"/> <br/>
                <h4>All Screens Page</h4>
                <p className="paragraph">All screens page will display all the pages that are created by the therapist.</p><br/>
                <img className ="imagecss" src ={AllScreens} alt="All Screens Page"/> <br/>
                <h4>Create Screens Page</h4>
                <p className="paragraph">Create Screen page will allow you to create screens and customize according to the needs of the user.
                <ul>
                <li>Provide "Screen Name" to screen. This will be the name of the screen.</li>
                <li>Select the grid size for the screen to display the buttons created.</li>
                <li>On click of the "Add Screen" button, the screen is created.</li>
                <li>It will also display the scrrens that are already created and provide an access to customize the screen and delete it.</li></ul></p><br/>
                <img className ="imagecss" src ={CreateScreen} alt="Create Screen Page"/> <br/>
                <h4>Edit Screen Page</h4>
                <p className="paragraph">Edit Screen allows you to edit the screen that is already created. </p><br/>
                <img className ="imagecss" src ={EditScreen} alt="Edit Screen Page"/> <br/><br/>
            </div>
        </div>
    );
}
export default Information;  