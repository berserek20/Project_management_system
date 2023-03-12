import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [mailId, setMailId] = useState("");
  const [password, setPassword] = useState("");
  const Register = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;


    axios.post("http://localhost:3001/auth/signup", {
      mail_id: mailId,
      password: password,
    });
    console.log(`email: ${mailId} password: ${password}`)
  };
  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={Register}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setMailId(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>

      <Link to="login">login</Link>
    </div>
  );
}

export default Signup;
