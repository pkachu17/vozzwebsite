// Import required dependencies for react, react components, firebase, images and style sheet
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import AdminUserImg from "./admin-user-icon.jpg"
import Body from "../home/body/Body";
import "./Dashboard.css";

// Defined sidebar navigation list data
const NAVS = {
  ALL_BUTTONS: {
    title: "AllButtons",
    display: "All Buttons",
    icon: "fas fa-grip-horizontal fa-fw me-3"
  },
  CREATE_BUTTONS: {
    title: "CreateButtons",
    display: "Create Buttons",
    icon: "fas fa-stop fa-fw me-3"
  },
  CREATE_USERS: {
    title: "CreateUsers",
    display: "Create Users",
    icon: "fas fa-user-alt fa-fw me-3"
  },
  CREATE_SCREENS: {
    title: "CreateScreens",
    display: "Create Screens",
    icon: "fas fa-th-large fa-fw me-3"
  },
  ANALYTICS: {
    title: "ButtonHistory",
    display: "ButtonHistory",
    icon: "fas fa-chart-line fa-fw me-3"
  },
  INFORMATION: {
    title: "Information",
    display: "Information",
    icon: "fas fa-info-circle fa-fw me-3"
  },
  GET_APK: {
    title: "GetApk",
    display: "GetApk",
    icon: "fas fa-cloud-download-alt fa-fw me-3"
  },
  ABOUT_US: {
    title: "AboutUs",
    display: "About Us",
    icon: "fas fa-users fa-fw me-3"
  }
}

// Dashboard as a react component
function Dashboard() {
  // React Hooks for storing dashboard data
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const sidebarRef = useRef();
  const currentPage = window.location.pathname?.split("/")?.pop();

  // fetchUserName function fetches logged in User info from firebase db
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  // useEffect hook checks if user is logged in also runs fetchUserName func
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

    // for active sidebar Highlight
  const removeShowClass = () => sidebarRef?.current?.classList?.remove('show');

  return (
    <div className="dashboard">
      <header>
      {/* sidebar */}
        <nav id="sidebarMenu" ref={sidebarRef} class={`collapse d-lg-block sidebar collapse bg-white`}>
          <div class="position-sticky">
          {/* sidebar menus */}
            <div class="list-group list-group-flush mx-3 mt-4">
              {
                Object.values(NAVS)?.map(({ title, display, icon }) => (
                  <Link to={title} key={title} class={`list-group-item list-group-item-action py-2 ${currentPage === title ? "active" : ""}`} aria-current="true" onClick={removeShowClass}><i class={icon}></i><span>{display}</span></Link>
                ))
              }
            </div>
          </div>
        </nav>

        <nav id="main-navbar" class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
          {/* Container wrapper */}
          <div class="container-fluid">
            {/* Toggle button */}
            <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <i class="fas fa-bars"></i>
            </button>

            {/* Brand */}
            <a class="navbar-brand"><h4>Vozzz</h4></a>


            {/* Right links */}
            <ul class="navbar-nav ms-auto d-flex flex-row">
              {/*user name*/}
              <li class="nav-item">
                <a class="nav-link me-3 me-lg-0 text-light">
                  <h6>{user?.email}</h6>
                </a>
              </li>

              {/* Avatar */}
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                  <img src={AdminUserImg} class="rounded-circle" height="25" alt="" />
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link class="dropdown-item ripple" to={"AllButtons"} >Home</Link></li>
                  <li><Link class="dropdown-item ripple" to={""} onClick={logout}>Logout</Link></li>
                </ul>
              </li>
            </ul>
          </div>
          {/* Container wrapper */}
        </nav>
        {/* Navbar */}
      </header>
      <body className="body">
        <Body />
      </body>
    </div>
  );
}
// export Dashboard as react component
export default Dashboard;
