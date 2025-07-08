import axios from 'axios';
import '../styles/form.css';

import React, { useState } from "react";

import { Link } from "react-router-dom";


const SignUpPage = () => {

    const [email, Setemail] = useState('')
    const [password, Setpassword] = useState('')
    const [error, Seterror] = useState('')
    const [username, Setusername] = useState('')

    async function HandleSignUp(e) {
        e.preventDefault();

        Seterror("");

        try {

            const res = await axios.post("http://localhost:5000/user/signup", {
                email,
                password,
                username

            })
            console.log("user bana liya gaya hai", res.data)

        } catch (error) {

            Seterror(error.response?.data?.message || "Sign Up failed");
            console.error("Login error:", error);
        }

    }



    return (
        <div className='page-center'>
            <div className="container">
                <form onSubmit={HandleSignUp}>
                    <h1>Sign Up</h1>

                    <label>Username:</label>
                    <input
                        type="text"


                        value={username}
                        onChange={(e) => { Setusername(e.target.value) }}

                        required
                    />

                    <label>Email:</label>
                    <input
                        type="email"


                        value={email}
                        onChange={(e) => { Setemail(e.target.value) }}

                        required
                    />

                    <label>Password:</label>
                    <input
                        type="password"


                        value={password}
                        onChange={(e) => { Setpassword(e.target.value) }}

                        required
                    />

                    <button type="submit">Sign Up</button>

                    {error && <p className='error'>{error}</p>}
                    <p>Already have an account?
                        <Link to="/signin"> Sign in</Link></p>


                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
