// Import required dependencies for react, react components, firebase, images and style sheet
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import Brandgif from "./Vozzz.gif";
import "./Register.css";

// Register as react component
function Register() {
  // useState Hook variables for stroing users details and Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  // register function provides with registering Therapist/Doctor with Web Application
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  // useEffect hook to check if user is registered
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="register">
    {/* Floating Cubes */}
    <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="registertab">
      {/* Brand gif/logo */}
        <div className="reg__art">
          <img className="reg__art" src={Brandgif}></img>
        </div>
        <div className="register__container">
          {/* Registration form */}
          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="register__btn" onClick={register}>
            Register
          </button>
          <button
            className="register__btn register__google"
            onClick={signInWithGoogle}
          >
            Register with Google
          </button>

          <div>
            Already have an account? <Link to="/">Login</Link> now.<br/>
            <p className="copyrights">Copyrighted by Team Alpha <br/>(CSE 611)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
// export Register as react component
export default Register;
