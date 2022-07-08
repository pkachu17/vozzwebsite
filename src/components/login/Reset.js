// Import required dependencies for react, react components, firebase, images and style sheet
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";
import "./Reset.css";

// Reset as react component
function Reset() {
    // useState hook variable to store user data
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  // useEffect user navigate
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="reset">
    {/* reset form */}
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button className="reset__btn" onClick={() => sendPasswordReset(email)}>
          Send password reset email
        </button>
        {/* navigation to register  screen */}
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
//export Reset as react component
export default Reset;
