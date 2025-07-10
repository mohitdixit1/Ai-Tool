import axios from "../axiosInstance.js";
import "../styles/form.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [error, Seterror] = useState("");
  const [username, Setusername] = useState("");

  async function HandleSignUp(e) {
    e.preventDefault();

    Seterror("");

    try {
      const res = await axios.post("/user/signup", {
        email,
        password,
        username,
      });
      navigate("/signin");
    } catch (error) {
      const backendMessage =
        error.response?.data?.error || error.response?.data?.message;

      Seterror(backendMessage || "Sign Up failed");
    }
  }

  return (
    <div className="page-center">
      <div className="container">
        <form onSubmit={HandleSignUp}>
          <h1>Sign Up</h1>

          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              Setusername(e.target.value);
            }}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              Setemail(e.target.value);
            }}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              Setpassword(e.target.value);
            }}
            required
          />

          <button type="submit">Sign Up</button>

          {error && <p className="error">{error}</p>}
          <p>
            Already have an account?
            <Link to="/signin"> Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
