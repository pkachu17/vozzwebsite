//Import required dependencies like react, react components, images, header and CSS (Style Sheet)
import React from "react";
import Header from "../Header";
import "./Information.css";
import LoginPage from "../images/LoginPage.jpg";
import LoginWithGoogle from "../images/LoginWithGoogle.jpg";
import Register from "../images/Register.jpg";
import PwdReset from "../images/PwdReset.jpg";
import AllButtons from "../images/AllButtons.jpg";
import EditButton from "../images/EditButton.jpg";
import CreateButton from "../images/CreateButton.jpg";
import CreateUser from "../images/CreateUser.jpg";
import EditUserScreen from "../images/EditUserScreen.jpg";
import CreateScreen from "../images/CreateScreen.jpg";
import EditScreen from "../images/EditScreen.jpg";
import ButtonHistory from "../images/ButtonHistory.jpg";
import ButtonStatistics from "../images/ButtonStatistics.jpg";
import GetApk from "../images/GetApk.jpg";

//Function Information returns the contenct as html for react DOM
const Information = () =>{
    const headervalue = 'Information about the Site';
    return(
        <div className="Information">
            <Header text={headervalue}/>
            <div className="Info-area">
                <p className="paragraph">On the Information page, you can view the information regarding the Vozzz application. You can create Buttons, Users, Screens in this application. Manage the buttons, users, screens that are created for each child by adding, or by updating, or by deleting.</p><br/>
                <h4>Login Page</h4>
                <p className="paragraph">The first page of the application is Login page. Enter the email address and password to login. An option to login with Google is also provided.<br/></p>
                <img className ="imagecss" src ={LoginPage} alt="Login Page"/><br/>
                <p className="paragraph">If one clicks on "LoginWithGoogle" the below page appears.<br/></p>
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
                <h4>Edit Button Page</h4>
                <p className="paragraph"> You can edit the button in "All Buttons" page. Below is the "Edit Button" screen. </p><br/> 
                <img className ="imagecss" src ={EditButton} alt="All Buttons Page"/><br/>
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
                <h4>Create User Page</h4>
                <p className="paragraph">Create User page can be used to add users to the application.
                <ul>
                <li>Provide an "User Name" to the user.</li>
                <li>Provide an "User id" to the user.</li>
                <li>On click of the "Add User" button, the user is added to application. </li>
                <li>It will also display the users that are already added to application and provides an option to edit or delete the user from database. </li></ul> </p><br/>
                <img className ="imagecss" src ={CreateUser} alt="CreateUser" /> <br/>
                <h4>Edit User Screen Page</h4>
                <p className="paragraph">The Edit User Screen page will give you an access to customize the screens to particular user.</p><br/>
                <img className ="imagecss" src ={EditUserScreen} alt="Edit Users Page"/> <br/>
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
                <h4>Button History Page</h4>
                <p className="paragraph">Button History page allows you to see the statistics of buttons of user. </p><br/>
                <img className ="imagecss" src ={ButtonHistory} alt="Edit Screen Page"/> <br/><br/>
                <h4>Button Statistics Page</h4>
                <p className="paragraph">Button Statistics page allows you to see the statistics of buttons of user. </p><br/>
                <img className ="imagecss" src ={ButtonStatistics} alt="Edit Screen Page"/> <br/><br/>
                <h4>GetApk Page</h4>
                <p className="paragraph">GetApk page allows users to download the apk. </p><br/>
                <img className ="imagecss" src ={GetApk} alt="Edit Screen Page"/> <br/><br/>
            </div>
        </div>
    );
}
export default Information; 