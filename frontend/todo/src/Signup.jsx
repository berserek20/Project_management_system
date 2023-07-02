import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Signup.css';

function Signup() {
  const [mailId, setMailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate();
  const Register = async(e) => {
    e.preventDefault();
    const res=await axios.post("http://localhost:3001/auth/signup", {
      mail_id: mailId,
      password: password,
    });
    if (res.data === "Auth Successful") {
      console.log(res.data);
      alert(`welcome ${mailId}`)
      navigate("/todo");
    } 
    else {
      console.log(res)
      // navigate("/login");
    }
    console.log(`email: ${mailId} password: ${password}`)
  };
  return (
    <div>
      <div className="container">
      <h1>Registration</h1>

        <form onSubmit={Register}>
          
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setMailId(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Register</button>
        </form>
        <br />
        <Link to="login">login</Link>
      </div>

    </div>
  );
}

export default Signup;
