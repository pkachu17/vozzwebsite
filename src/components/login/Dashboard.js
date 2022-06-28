import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import AdminUserImg from "./admin-user-icon.jpg"
import Body from "../home/body/Body";
import "./Dashboard.css";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
      <header>
        <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
          <div class="position-sticky">
            <div class="list-group list-group-flush mx-3 mt-4">
              <Link to="AllButtons" class="list-group-item list-group-item-action py-2 ripple" aria-current="true"><i class="fas fa-grip-horizontal fa-fw me-3"></i><span>All Buttons</span></Link>
              <Link to="CreateButtons" class="list-group-item list-group-item-action py-2 ripple"><i class="fas fa-stop fa-fw me-3"></i><span>Create Buttons</span></Link>
              <Link to="CreateUsers" class="list-group-item list-group-item-action py-2 ripple"><i class="fas fa-user-alt fa-fw me-3"></i><span>Create User</span></Link>
              <Link to="CreateScreens" class="list-group-item list-group-item-action py-2 ripple"><i class="fas fa-th-large fa-fw me-3"></i><span>Create Screens</span></Link>
              <Link to="" class="list-group-item list-group-item-action py-2 ripple"><i class="fas fa-chart-line fa-fw me-3"></i><span>Analytics</span></Link>
              <Link to="Information" class="list-group-item list-group-item-action py-2 ripple"><i class="fas fa-info-circle fa-fw me-3"></i><span>Information</span></Link>
              <Link to="Information" class="list-group-item list-group-item-action py-2 ripple"><i class="fas fa-cloud-download-alt fa-fw me-3"></i><span>Get Apk</span></Link>
              <Link to="AboutUs" class="list-group-item list-group-item-action py-2 ripple"><i class="fas fa-users fa-fw me-3"></i><span>About Us</span></Link>
            </div>
          </div>
        </nav>

        <nav id="main-navbar" class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
          {/* Container wrapper */}
          <div class="container-fluid">
            {/* Toggle button */}
            <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation" >
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
                  <li><a class="dropdown-item">Home</a></li>
                  <li><a class="dropdown-item" onClick={logout}>Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
          {/* Container wrapper */}
        </nav>
        {/* Navbar */}
      </header>
        <body className="body">
          <Body/>
        </body>
    </div>
  );
}

export default Dashboard;
