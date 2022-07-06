//Import required dependencies from react, CSS styling, Images and react components
import React from "react";
import "./AboutUs.css";
import Header from "../Header";
import App from "../images/App.jpg";

//Function returns the contents of AboutUs
//Below is page about applications and people involved
function AboutUs() {

  return (
    <div className="about">
      <Header text="About Us" />
      <div className="aboutSection">
        <h2><p><u><b>About App</b></u></p></h2>
        <p>VOZZZ is a mobile application which is android supported.The therapist uses a website and will have access to add or edit buttons and folders. The user/child who uses the app will be able to register themselves to the application and avail the buttons included by their speech therapist. On button click, the text is converted to a voice note, thus facilitating the app users with better communication.</p>
        <h2><p><u><b>Description</b></u></p></h2>
        <p>Children and adults with speech impairments have hard time communicating properly.These disorders can cause frustration and embarrassment to the person suffering from them. This mobile application intends to support such people. Speech therapists add customizable buttons unique to every child using the “VOZZZ” website.They can add/edit  buttons to multiple folders. Once the user opens the mobile application on their tablet and clicks the buttons the voice notes are generated to help them with fluent and easy conversation. </p>
        <h2><b><u>User App </u></b></h2>
        <p className="paragraph">Below is the screen of app containing buttons. <br /></p>
        <img className="imagecss" src={App} alt="App" /><br />
        <h2><p><u><b>About Us</b></u></p></h2>
        <p>We are a team of 6 members from State University of New York at Buffalo. We are building an android-based application and a website called “VOZZZ” which helps the speech impaired as a communication device and their therapists to build button pages that are customizable based on each user/child requirement. </p>
        <p><h3>Under The Guidance of Prof. Ramalingam Sridhar  &  Prof. Michael Buckley</h3></p>
        <p style={{ whiteSpace: "nowrap" }}><h4>Support of (TA) Pushkaraj Joshi</h4></p>
        <div className="just-center-img">
          <img src="https://www.buffalo.edu/content/www/brand/TrademarksLicensing/creating-promotional-products/design-ordering/_jcr_content/par/image.img.original.jpg/1633447810407.jpg" width="300" height="150" alt="UBLogo"></img>
        </div><br/>
        <h2><b><u>Team Alpha (CSE 611-MS Project Development)</u></b></h2>
        <p>
          Rahul Ramesh<br></br>
          Shri Vignesh Senthil Kumar<br></br>
          Prashant Kumar Jha<br></br>
          Raksha Vishwanath<br></br>
          Viditha Wudaru<br></br>
          Spoorthy Nagadhi<br></br>
          <br/>
          <br/>
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
