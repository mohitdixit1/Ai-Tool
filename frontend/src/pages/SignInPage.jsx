import '../styles/form.css';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

const SignInPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post("http://localhost:5000/user/signin", {
        email,
        password,
      });

      const user = res.data.user;
      Cookies.set('token', JSON.stringify(user), { expires: 7 });
      setUser(user); // Update global user state
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.error("Login error:", error);
    }
  }

  return (
    <div className='page-center'>
      <div className="container">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In</button>

          {error && <p className='error'>{error}</p>}

          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
