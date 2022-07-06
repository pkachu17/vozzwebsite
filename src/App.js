//****************************************************************************
//*************8*******CSE 611 - Master's Project*****************************
//  Author          - Team Alpha
//  Web App Ver.    - Vozzz v1.0
//  Date            - July 6th 2022
//  Mentor          - Prof Ramalingam Sridhar
//  Client & Mentor - Prof Michael Buckley
//  TA and support  - Pushkaraj Joshi
//*****************University at Buffalo, New York ***************************
//****************************************************************************

// Import required dependencies for react, react components, firebase, images and style sheet
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Reset from "./components/login/Reset";
import Dashboard from "./components/login/Dashboard";
import AllButtons from "./components/home/body/buttons/AllButtons";
import CreateButtons from "./components/home/body/buttons/CreateButtons";
import CreateUsers from "./components/home/body/buttons/CreateUsers";
import CreateScreens from "./components/home/body/buttons/CreateScreens";
import Information from "./components/home/body/buttons/Information";
import AboutUs from "./components/home/body/buttons/AboutUs";
import ButtonHistory from "./components/home/body/buttons/ButtonHistory";
import GetApk from "./components/home/body/buttons/GetApk";


function App() {
  return (
    // app
    <div className="app">
      <Router>
      {/* All routes */}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="dashboard" element={<Dashboard />}>
            <Route exact path="AllButtons" element={<AllButtons/>} />
            <Route exact path="CreateButtons" element={<CreateButtons/>} />
            <Route exact path="CreateUsers" element={<CreateUsers/>} />
            <Route exact path="CreateScreens" element={<CreateScreens/>} />
            <Route exact path="ButtonHistory" element={<ButtonHistory/>} />
            <Route exact path="Information" element={<Information/>} />
            <Route exact path="GetApk" element={<GetApk/>} />
            <Route exact path="AboutUs" element={<AboutUs/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
// exporting App as react component
export default App;
