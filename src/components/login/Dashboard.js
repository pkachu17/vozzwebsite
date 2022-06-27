import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Masterwindow from "../home/Masterwindow";

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
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <div className="navbar-brand" to={'/sign-in'}>Vozzz</div>
            <div className="dashboard__container">
              <div className="userid"><h6>{user?.email}</h6></div>
              <button className="logout-button" type="text" onClick={logout}>Logout</button>
            </div>
          </div>
        </nav>
      </div>
      <div className="body-container">
        <Masterwindow />
      </div>
      <div className="footer-dashboard">
        <div className="foot"> <h6>Copyrighted by Team Alpha (CSE 611)</h6></div>
      </div>
    </div>
  );
}

export default Dashboard;
