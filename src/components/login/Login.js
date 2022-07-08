// Import required dependencies for react, react components, firebase, images and style sheet
import React, { useEffect, useState } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Brandgif from "./Vozzz.gif";
import "./Login.css";

// Login as react component
function Login() {
  // UseState hook for storing login data into variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  // UseEffect hook to navigate to dashboard when user/therapist/doctor successfully logs in
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="App">
    {/* Floating cubes */}
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
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <div className="login">
        {/* Vozzz brand gif */}
        <div className="login__art">
          <img className="login__art" src={Brandgif}></img>
        </div>
        {/* Login Form */}
        <div className="login__container">
          <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="login__btn"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
          <button className="login__btn login__google" onClick={signInWithGoogle}>
            Login with Google
          </button>
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.<br/>
            <p className="copyrights">Copyrighted by Team Alpha <br/>(CSE 611)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
// export Login as react component
export default Login;
